import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { ExtractedMenuCategory, ExtractedMenuItem } from '@/types/database';
import Tesseract from 'tesseract.js';

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// German prompt for Gemini
const GEMINI_PROMPT = `Analysiere dieses Speisekartenbild und extrahiere alle Gerichte.

Antworte NUR mit einem JSON-Objekt in diesem Format:
{
  "categories": [
    {
      "name": "Kategoriename (z.B. Vorspeisen, Hauptgerichte, Desserts)",
      "items": [
        {
          "name": "Name des Gerichts",
          "description": "Kurze Beschreibung oder Zutaten (falls vorhanden)",
          "price": 12.50,
          "isVegetarian": false,
          "isVegan": false
        }
      ]
    }
  ]
}

Wichtige Regeln:
- Preise als Zahlen OHNE Euro-Zeichen (z.B. 12.50 statt "12,50 €")
- Komma-Preise in Punkt umwandeln (12,50 → 12.50)
- isVegetarian/isVegan nur true setzen wenn explizit markiert (V, VG, Symbole)
- Wenn keine Kategorie erkennbar, verwende "Speisen"
- Antworte NUR mit dem JSON, kein zusätzlicher Text`;

// ============================================
// OCR Fallback Logic (Tesseract.js)
// ============================================

const PRICE_PATTERNS = [
  /(\d{1,3}[.,]\d{2})\s*€/,
  /€\s*(\d{1,3}[.,]\d{2})/,
  /(\d{1,3}[.,]\d{2})\s*EUR/i,
  /(\d{1,3}[.,]\d{2})\s*$/,
  /(\d{1,3}[.,]-)\s*€?/,
  /(\d{1,2})\s*€/,
];

const CATEGORY_KEYWORDS_DE = [
  'vorspeisen', 'hauptgerichte', 'nachspeisen', 'desserts', 'getränke',
  'salate', 'suppen', 'pasta', 'pizza', 'fleisch', 'fisch', 'vegetarisch',
  'burger', 'beilagen', 'snacks', 'frühstück', 'mittagessen', 'abendessen',
  'spezialitäten', 'vom grill', 'aus dem ofen', 'klassiker', 'empfehlungen',
  'aperitif', 'digestif', 'weine', 'biere', 'alkoholfrei', 'kaffee', 'tee',
  'antipasti', 'primi', 'secondi', 'dolci', 'contorni',
  'starters', 'mains', 'sides', 'drinks', 'appetizers', 'entrees',
];

const VEGETARIAN_KEYWORDS = ['vegetarisch', 'veg', '🌿', '(v)', 'vegetarian'];
const VEGAN_KEYWORDS = ['vegan', '🌱', '(vg)', 'pflanzlich'];

function extractPrice(text: string): number | null {
  for (const pattern of PRICE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      let priceStr = match[1];
      if (priceStr.endsWith('-')) {
        priceStr = priceStr.replace('-', '00');
      }
      priceStr = priceStr.replace(',', '.');
      const price = parseFloat(priceStr);
      if (!isNaN(price) && price > 0 && price < 1000) {
        return Math.round(price * 100) / 100;
      }
    }
  }
  return null;
}

function isCategoryLine(line: string): boolean {
  const trimmed = line.trim().toLowerCase();
  if (trimmed.length < 3 || trimmed.length > 40) return false;
  if (extractPrice(line) !== null) return false;
  for (const keyword of CATEGORY_KEYWORDS_DE) {
    if (trimmed.includes(keyword)) return true;
  }
  const upperRatio = (line.match(/[A-ZÄÖÜ]/g) || []).length / line.length;
  if (upperRatio > 0.6 && line.length > 4) return true;
  if (trimmed.length < 25 && !trimmed.includes('€') && !/\d{1,2}[.,]\d{2}/.test(trimmed)) {
    if (trimmed.endsWith(':')) return true;
  }
  return false;
}

function checkDietaryInfo(text: string): { isVegetarian: boolean; isVegan: boolean } {
  const lower = text.toLowerCase();
  const isVegan = VEGAN_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  const isVegetarian = isVegan || VEGETARIAN_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  return { isVegetarian, isVegan };
}

function cleanDishName(line: string): string {
  let name = line;
  for (const pattern of PRICE_PATTERNS) {
    name = name.replace(pattern, '');
  }
  name = name.replace(/\(v\)|\(vg\)|🌿|🌱/gi, '');
  name = name.replace(/[.\-_]+\s*$/, '');
  name = name.replace(/\.{2,}/g, ' ');
  name = name.replace(/€/g, '');
  return name.trim();
}

function parseMenuText(ocrText: string): ExtractedMenuCategory[] {
  const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const categories: ExtractedMenuCategory[] = [];
  let currentCategory: ExtractedMenuCategory = { name: 'Speisen', items: [] };
  let previousLine = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isCategoryLine(line)) {
      if (currentCategory.items.length > 0) {
        categories.push(currentCategory);
      }
      let categoryName = line.replace(/:$/, '').trim();
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      currentCategory = { name: categoryName, items: [] };
      previousLine = '';
      continue;
    }

    const price = extractPrice(line);
    if (price !== null) {
      const dietary = checkDietaryInfo(line);
      let dishName = cleanDishName(line);

      if (dishName.length < 3 && previousLine.length > 3 && !extractPrice(previousLine)) {
        dishName = cleanDishName(previousLine);
      }

      if (dishName.length >= 2) {
        const item: ExtractedMenuItem = {
          name: dishName,
          price: price,
          isVegetarian: dietary.isVegetarian,
          isVegan: dietary.isVegan,
          allergens: [],
          tags: [],
          confidence: 0.7,
        };

        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          if (!extractPrice(nextLine) && !isCategoryLine(nextLine) && nextLine.length > 5 && nextLine.length < 150) {
            item.description = nextLine;
            i++;
          }
        }
        currentCategory.items.push(item);
      }
    }
    previousLine = line;
  }

  if (currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }
  if (categories.length === 0 && currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }
  return categories;
}

async function extractWithOCR(imageBuffer: Buffer, language: string): Promise<ExtractedMenuCategory[]> {
  const ocrLanguage = language === 'de' ? 'deu+eng' : 'eng+deu';

  // Add timeout for OCR (60 seconds max)
  const ocrPromise = Tesseract.recognize(imageBuffer, ocrLanguage, {
    logger: () => {}
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('OCR Timeout (60s)')), 60000);
  });

  const ocrResult = await Promise.race([ocrPromise, timeoutPromise]);

  const extractedText = ocrResult.data.text;
  if (!extractedText || extractedText.trim().length < 10) {
    throw new Error('Kein Text erkannt');
  }

  console.log('OCR extracted text length:', extractedText.length);
  return parseMenuText(extractedText);
}

// ============================================
// Gemini AI Logic
// ============================================

async function extractWithGemini(base64Image: string, mimeType: string): Promise<ExtractedMenuCategory[]> {
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!geminiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY nicht konfiguriert');
  }

  // Add timeout of 30 seconds for Gemini
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: GEMINI_PROMPT },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        }
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(errorData.error?.message || `Gemini API Fehler: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      throw new Error('Keine Antwort von Gemini');
    }

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Kein JSON in Gemini-Antwort gefunden');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.categories || !Array.isArray(parsed.categories)) {
      throw new Error('Ungültiges JSON-Format');
    }

    return parsed.categories;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Gemini Timeout (30s)');
    }
    throw error;
  }
}

// ============================================
// Main API Handler
// ============================================

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = getIdentifier(req);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.AI_API);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
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

    // Convert file to base64 and buffer
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    const base64Image = imageBuffer.toString('base64');

    let categories: ExtractedMenuCategory[];
    let method: 'gemini' | 'ocr';
    let confidence: number;

    // Try Gemini first, fallback to OCR if Gemini fails
    try {
      console.log('Attempting Gemini extraction...');
      categories = await extractWithGemini(base64Image, file.type);
      method = 'gemini';
      confidence = 0.9;
      console.log('Gemini extraction successful');
    } catch (geminiError) {
      console.warn('Gemini failed, trying OCR fallback:', geminiError);

      // Fallback to OCR (works but slower)
      try {
        console.log('Attempting OCR extraction...');
        categories = await extractWithOCR(imageBuffer, language);
        method = 'ocr';
        confidence = 0.7;
        console.log('OCR extraction successful');
      } catch (ocrError) {
        console.error('OCR also failed:', ocrError);
        const geminiMsg = geminiError instanceof Error ? geminiError.message : 'Unbekannter Fehler';
        return NextResponse.json(
          { error: `Analyse fehlgeschlagen. Bitte spaeter erneut versuchen. (${geminiMsg})` },
          { status: 422 }
        );
      }
    }

    // Clean up and validate data
    const cleanedCategories: ExtractedMenuCategory[] = categories.map(category => ({
      name: String(category.name || 'Speisen').trim(),
      items: (category.items || []).map(item => ({
        name: String(item.name || '').trim(),
        price: typeof item.price === 'number' ? Math.round(item.price * 100) / 100 : 0,
        description: item.description ? String(item.description).trim() : undefined,
        isVegetarian: Boolean(item.isVegetarian),
        isVegan: Boolean(item.isVegan),
        allergens: [],
        tags: [],
        confidence: method === 'gemini' ? 0.9 : 0.7,
      })).filter(item => item.name.length > 1 && item.price > 0),
    })).filter(category => category.items.length > 0);

    const totalItems = cleanedCategories.reduce((sum, cat) => sum + cat.items.length, 0);

    if (totalItems === 0) {
      return NextResponse.json(
        { error: 'Keine Gerichte erkannt. Bitte ein klareres Foto mit gut lesbaren Preisen versuchen.' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      categories: cleanedCategories,
      totalItems,
      language,
      confidence,
      method,
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
