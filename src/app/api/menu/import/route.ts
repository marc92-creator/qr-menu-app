import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { ExtractedMenuCategory } from '@/types/database';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - very strict for AI API (10 req/min)
    const identifier = getIdentifier(req);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.AI_API);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI-Feature nicht konfiguriert. Bitte ANTHROPIC_API_KEY in .env.local hinzufuegen.' },
        { status: 503 }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const language = (formData.get('language') as string) || 'de';

    if (!file) {
      return NextResponse.json(
        { error: 'Keine Datei hochgeladen' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Datei ist zu gross. Maximum: 10MB' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Ungueltiger Dateityp. Erlaubt: JPG, PNG, WebP, PDF' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Determine media type for Claude
    let mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/jpeg';
    if (file.type === 'image/png') mediaType = 'image/png';
    else if (file.type === 'image/webp') mediaType = 'image/webp';
    else if (file.type === 'application/pdf') {
      // PDF files need to be processed differently
      // For now, return an error suggesting image upload
      return NextResponse.json(
        { error: 'PDF-Support kommt bald. Bitte laden Sie ein Foto der Speisekarte hoch.' },
        { status: 400 }
      );
    }

    const prompt = language === 'de'
      ? `Analysiere dieses Speisekartenbild und extrahiere alle Gerichte in folgendem JSON-Format:

{
  "categories": [
    {
      "name": "Kategoriename (z.B. Vorspeisen, Hauptgerichte, Desserts)",
      "items": [
        {
          "name": "Gerichtname",
          "price": 12.50,
          "description": "Kurze Beschreibung wenn vorhanden",
          "isVegetarian": false,
          "isVegan": false,
          "allergens": ["gluten", "milk"],
          "confidence": 0.95
        }
      ]
    }
  ],
  "totalItems": 10,
  "confidence": 0.85
}

Wichtige Hinweise:
- Preise als Zahlen (ohne Euro-Zeichen), z.B. 12.50 statt "12,50 EUR"
- isVegetarian/isVegan basierend auf Gerichtname/Beschreibung erkennen
- Allergene aus der Liste: gluten, crustaceans, eggs, fish, peanuts, soy, milk, nuts, celery, mustard, sesame, sulfites, lupin, molluscs
- confidence: Wie sicher du bei der Erkennung bist (0-1)
- Wenn keine Kategorie erkennbar, nutze "Speisen" als Standard
- Nur Gerichte extrahieren, keine Getraenke oder Extras (ausser sie sind klar als Kategorie)

Antworte NUR mit dem JSON, keine Erklaerungen.`
      : `Analyze this menu image and extract all dishes in the following JSON format:

{
  "categories": [
    {
      "name": "Category Name (e.g. Starters, Main Courses, Desserts)",
      "items": [
        {
          "name": "Dish Name",
          "price": 12.50,
          "description": "Short description if available",
          "isVegetarian": false,
          "isVegan": false,
          "allergens": ["gluten", "milk"],
          "confidence": 0.95
        }
      ]
    }
  ],
  "totalItems": 10,
  "confidence": 0.85
}

Important notes:
- Prices as numbers (without currency symbol), e.g. 12.50
- Detect isVegetarian/isVegan based on dish name/description
- Allergens from list: gluten, crustaceans, eggs, fish, peanuts, soy, milk, nuts, celery, mustard, sesame, sulfites, lupin, molluscs
- confidence: How certain you are about the extraction (0-1)
- If no category is visible, use "Dishes" as default
- Only extract food items, no drinks or extras (unless clearly categorized)

Reply ONLY with the JSON, no explanations.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64,
            },
          },
          {
            type: 'text',
            text: prompt,
          }
        ]
      }],
    });

    // Extract text content
    const content = message.content[0];
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'Unerwartete KI-Antwort' },
        { status: 500 }
      );
    }

    // Parse JSON response
    let extractedData: {
      categories: ExtractedMenuCategory[];
      totalItems: number;
      confidence: number;
    };

    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      extractedData = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse AI response:', content.text);
      return NextResponse.json(
        { error: 'Konnte Speisekarte nicht analysieren. Bitte versuchen Sie es mit einem klareren Foto.' },
        { status: 422 }
      );
    }

    // Validate and clean the data
    if (!extractedData.categories || !Array.isArray(extractedData.categories)) {
      return NextResponse.json(
        { error: 'Keine Gerichte erkannt. Bitte versuchen Sie es mit einem klareren Foto.' },
        { status: 422 }
      );
    }

    // Clean up categories and items
    const cleanedCategories: ExtractedMenuCategory[] = extractedData.categories.map(category => ({
      name: String(category.name || 'Speisen').trim(),
      nameEn: category.nameEn ? String(category.nameEn).trim() : undefined,
      items: (category.items || []).map(item => ({
        name: String(item.name || '').trim(),
        nameEn: item.nameEn ? String(item.nameEn).trim() : undefined,
        price: typeof item.price === 'number' ? Math.round(item.price * 100) / 100 : 0,
        description: item.description ? String(item.description).trim() : undefined,
        descriptionEn: item.descriptionEn ? String(item.descriptionEn).trim() : undefined,
        isVegetarian: Boolean(item.isVegetarian),
        isVegan: Boolean(item.isVegan),
        allergens: Array.isArray(item.allergens) ? item.allergens.filter(a => typeof a === 'string') : [],
        tags: Array.isArray(item.tags) ? item.tags.filter(t => typeof t === 'string') : [],
        confidence: typeof item.confidence === 'number' ? item.confidence : 0.8,
      })).filter(item => item.name.length > 0 && item.price > 0),
    })).filter(category => category.items.length > 0);

    const totalItems = cleanedCategories.reduce((sum, cat) => sum + cat.items.length, 0);

    if (totalItems === 0) {
      return NextResponse.json(
        { error: 'Keine Gerichte erkannt. Bitte versuchen Sie es mit einem klareren Foto.' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      categories: cleanedCategories,
      totalItems,
      language,
      confidence: extractedData.confidence || 0.8,
    });
  } catch (error) {
    console.error('Menu import error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Importieren. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    );
  }
}
