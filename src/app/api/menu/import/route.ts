import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { ExtractedMenuCategory } from '@/types/database';

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = getIdentifier(req);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.AI_API);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
    }

    // Check for API keys - try Gemini first, then Anthropic
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!geminiKey && !anthropicKey) {
      return NextResponse.json(
        { error: 'AI-Feature nicht konfiguriert.' },
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

    const prompt = language === 'de'
      ? `Analysiere dieses Speisekartenbild und extrahiere alle Gerichte in folgendem JSON-Format:

{
  "categories": [
    {
      "name": "Kategoriename",
      "items": [
        {
          "name": "Gerichtname",
          "price": 12.50,
          "description": "Kurze Beschreibung",
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

Preise als Zahlen ohne Euro-Zeichen. Antworte NUR mit JSON.`
      : `Analyze this menu image and extract all dishes as JSON:

{
  "categories": [
    {
      "name": "Category Name",
      "items": [
        {
          "name": "Dish Name",
          "price": 12.50,
          "description": "Short description",
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

Prices as numbers. Reply ONLY with JSON.`;

    let responseText: string;

    // Try Gemini first
    if (geminiKey) {
      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  {
                    inline_data: {
                      mime_type: file.type,
                      data: base64
                    }
                  }
                ]
              }]
            })
          }
        );

        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } else {
          const errorData = await geminiResponse.json();
          console.error('Gemini error:', errorData);
          throw new Error(errorData.error?.message || 'Gemini API error');
        }
      } catch (geminiError) {
        console.error('Gemini failed:', geminiError);

        // Fallback to Anthropic if available
        if (anthropicKey) {
          const Anthropic = (await import('@anthropic-ai/sdk')).default;
          const anthropic = new Anthropic({ apiKey: anthropicKey });

          const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: [{
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
                    data: base64,
                  },
                },
                { type: 'text', text: prompt }
              ]
            }],
          });

          responseText = message.content[0].type === 'text' ? message.content[0].text : '';
        } else {
          throw geminiError;
        }
      }
    } else if (anthropicKey) {
      // Only Anthropic available
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const anthropic = new Anthropic({ apiKey: anthropicKey });

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
                data: base64,
              },
            },
            { type: 'text', text: prompt }
          ]
        }],
      });

      responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    } else {
      return NextResponse.json(
        { error: 'Kein AI-Provider verfuegbar' },
        { status: 503 }
      );
    }

    // Parse JSON response
    let extractedData: {
      categories: ExtractedMenuCategory[];
      totalItems: number;
      confidence: number;
    };

    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found');
      }
      extractedData = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse response:', responseText);
      return NextResponse.json(
        { error: 'Konnte Speisekarte nicht analysieren. Bitte klareres Foto versuchen.' },
        { status: 422 }
      );
    }

    if (!extractedData.categories || !Array.isArray(extractedData.categories)) {
      return NextResponse.json(
        { error: 'Keine Gerichte erkannt.' },
        { status: 422 }
      );
    }

    // Clean up data
    const cleanedCategories: ExtractedMenuCategory[] = extractedData.categories.map(category => ({
      name: String(category.name || 'Speisen').trim(),
      items: (category.items || []).map(item => ({
        name: String(item.name || '').trim(),
        price: typeof item.price === 'number' ? Math.round(item.price * 100) / 100 : 0,
        description: item.description ? String(item.description).trim() : undefined,
        isVegetarian: Boolean(item.isVegetarian),
        isVegan: Boolean(item.isVegan),
        allergens: [],
        tags: [],
        confidence: typeof item.confidence === 'number' ? item.confidence : 0.8,
      })).filter(item => item.name.length > 0 && item.price > 0),
    })).filter(category => category.items.length > 0);

    const totalItems = cleanedCategories.reduce((sum, cat) => sum + cat.items.length, 0);

    if (totalItems === 0) {
      return NextResponse.json(
        { error: 'Keine Gerichte erkannt.' },
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
    const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';

    return NextResponse.json(
      { error: `Fehler: ${errorMessage}` },
      { status: 500 }
    );
  }
}
