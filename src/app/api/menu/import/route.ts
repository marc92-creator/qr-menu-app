import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { ExtractedMenuCategory } from '@/types/database';

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - very strict for AI API (10 req/min)
    const identifier = getIdentifier(req);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.AI_API);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
    }

    // Check if API key is configured
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI-Feature nicht konfiguriert. Bitte GOOGLE_GEMINI_API_KEY hinzufuegen.' },
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
        { error: 'Ungueltiger Dateityp. Erlaubt: JPG, PNG, WebP' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
- confidence: Wie sicher du bei der Erkennung bist (0-1)
- Wenn keine Kategorie erkennbar, nutze "Speisen" als Standard
- Extrahiere alle sichtbaren Gerichte mit Preisen

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
- confidence: How certain you are about the extraction (0-1)
- If no category is visible, use "Dishes" as default
- Extract all visible dishes with prices

Reply ONLY with the JSON, no explanations.`;

    // Call Gemini with image
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let extractedData: {
      categories: ExtractedMenuCategory[];
      totalItems: number;
      confidence: number;
    };

    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      extractedData = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse AI response:', text);
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

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';

    if (errorMessage.includes('API_KEY') || errorMessage.includes('authentication') || errorMessage.includes('401')) {
      return NextResponse.json(
        { error: 'API-Key ungueltig. Bitte GOOGLE_GEMINI_API_KEY pruefen.' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('quota') || errorMessage.includes('rate')) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `Fehler beim Importieren: ${errorMessage}` },
      { status: 500 }
    );
  }
}
