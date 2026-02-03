import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { ExtractedMenuCategory, ExtractedMenuItem } from '@/types/database';
import Tesseract from 'tesseract.js';

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Price patterns for different formats
const PRICE_PATTERNS = [
  /(\d{1,3}[.,]\d{2})\s*€/,           // 12,50 € or 12.50 €
  /€\s*(\d{1,3}[.,]\d{2})/,           // € 12,50
  /(\d{1,3}[.,]\d{2})\s*EUR/i,        // 12,50 EUR
  /(\d{1,3}[.,]\d{2})\s*$/,           // 12,50 at end of line
  /(\d{1,3}[.,]-)\s*€?/,              // 12,- or 12.-
  /(\d{1,2})\s*€/,                    // 12 € (no decimals)
];

// Common category keywords (German)
const CATEGORY_KEYWORDS_DE = [
  'vorspeisen', 'hauptgerichte', 'nachspeisen', 'desserts', 'getränke',
  'salate', 'suppen', 'pasta', 'pizza', 'fleisch', 'fisch', 'vegetarisch',
  'burger', 'beilagen', 'snacks', 'frühstück', 'mittagessen', 'abendessen',
  'spezialitäten', 'vom grill', 'aus dem ofen', 'klassiker', 'empfehlungen',
  'aperitif', 'digestif', 'weine', 'biere', 'alkoholfrei', 'kaffee', 'tee',
  'antipasti', 'primi', 'secondi', 'dolci', 'contorni',
  'starters', 'mains', 'sides', 'drinks', 'appetizers', 'entrees',
];

// Words that indicate vegetarian/vegan
const VEGETARIAN_KEYWORDS = ['vegetarisch', 'veg', '🌿', '(v)', 'vegetarian'];
const VEGAN_KEYWORDS = ['vegan', '🌱', '(vg)', 'pflanzlich'];

/**
 * Extract price from a line of text
 */
function extractPrice(text: string): number | null {
  for (const pattern of PRICE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      let priceStr = match[1];
      // Handle "12,-" format
      if (priceStr.endsWith('-')) {
        priceStr = priceStr.replace('-', '00');
      }
      // Convert comma to dot for parsing
      priceStr = priceStr.replace(',', '.');
      const price = parseFloat(priceStr);
      if (!isNaN(price) && price > 0 && price < 1000) {
        return Math.round(price * 100) / 100;
      }
    }
  }
  return null;
}

/**
 * Check if a line looks like a category header
 */
function isCategoryLine(line: string): boolean {
  const trimmed = line.trim().toLowerCase();

  // Too short or too long for a category
  if (trimmed.length < 3 || trimmed.length > 40) return false;

  // Has a price? Not a category
  if (extractPrice(line) !== null) return false;

  // Check for category keywords
  for (const keyword of CATEGORY_KEYWORDS_DE) {
    if (trimmed.includes(keyword)) return true;
  }

  // All caps or mostly caps (common for headers)
  const upperRatio = (line.match(/[A-ZÄÖÜ]/g) || []).length / line.length;
  if (upperRatio > 0.6 && line.length > 4) return true;

  // Short line without price (potential category)
  if (trimmed.length < 25 && !trimmed.includes('€') && !/\d{1,2}[.,]\d{2}/.test(trimmed)) {
    // Check if it ends with a colon
    if (trimmed.endsWith(':')) return true;
  }

  return false;
}

/**
 * Check for vegetarian/vegan indicators
 */
function checkDietaryInfo(text: string): { isVegetarian: boolean; isVegan: boolean } {
  const lower = text.toLowerCase();
  const isVegan = VEGAN_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  const isVegetarian = isVegan || VEGETARIAN_KEYWORDS.some(k => lower.includes(k.toLowerCase()));
  return { isVegetarian, isVegan };
}

/**
 * Clean up dish name by removing price and dietary markers
 */
function cleanDishName(line: string): string {
  let name = line;

  // Remove price patterns
  for (const pattern of PRICE_PATTERNS) {
    name = name.replace(pattern, '');
  }

  // Remove dietary markers
  name = name.replace(/\(v\)|\(vg\)|🌿|🌱/gi, '');

  // Remove trailing dots/dashes used as separators
  name = name.replace(/[.\-_]+\s*$/, '');
  name = name.replace(/\.{2,}/g, ' ');

  // Remove € symbol
  name = name.replace(/€/g, '');

  return name.trim();
}

/**
 * Parse OCR text into menu structure
 */
function parseMenuText(ocrText: string): ExtractedMenuCategory[] {
  const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const categories: ExtractedMenuCategory[] = [];
  let currentCategory: ExtractedMenuCategory = {
    name: 'Speisen',
    items: []
  };

  let previousLine = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a category header
    if (isCategoryLine(line)) {
      // Save previous category if it has items
      if (currentCategory.items.length > 0) {
        categories.push(currentCategory);
      }

      // Start new category
      let categoryName = line.replace(/:$/, '').trim();
      // Title case
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

      currentCategory = {
        name: categoryName,
        items: []
      };
      previousLine = '';
      continue;
    }

    // Try to extract price
    const price = extractPrice(line);

    if (price !== null) {
      // This line has a price - it's a menu item
      const dietary = checkDietaryInfo(line);
      let dishName = cleanDishName(line);

      // If dish name is very short, might be just the price line
      // Check if previous line could be the dish name
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
          confidence: 0.75,
        };

        // Look for description in next line (if it has no price)
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          if (!extractPrice(nextLine) && !isCategoryLine(nextLine) && nextLine.length > 5 && nextLine.length < 150) {
            item.description = nextLine;
            i++; // Skip the description line
          }
        }

        currentCategory.items.push(item);
      }
    }

    previousLine = line;
  }

  // Don't forget the last category
  if (currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }

  // If we found items but no categories, keep them in default category
  if (categories.length === 0 && currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }

  return categories;
}

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

    // Convert file to Buffer for Tesseract
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Perform OCR with Tesseract.js
    // Use German + English for best results with German menus
    const ocrLanguage = language === 'de' ? 'deu+eng' : 'eng+deu';

    let ocrResult;
    try {
      ocrResult = await Tesseract.recognize(
        imageBuffer,
        ocrLanguage,
        {
          // Tesseract options for better menu recognition
          logger: () => {} // Suppress logs
        }
      );
    } catch (ocrError) {
      console.error('OCR error:', ocrError);
      return NextResponse.json(
        { error: 'Fehler bei der Texterkennung. Bitte ein klareres Foto versuchen.' },
        { status: 422 }
      );
    }

    const extractedText = ocrResult.data.text;

    if (!extractedText || extractedText.trim().length < 10) {
      return NextResponse.json(
        { error: 'Kein Text erkannt. Bitte ein klareres Foto der Speisekarte versuchen.' },
        { status: 422 }
      );
    }

    console.log('OCR extracted text length:', extractedText.length);

    // Parse the OCR text into menu structure
    const categories = parseMenuText(extractedText);

    // Clean up data
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
        confidence: typeof item.confidence === 'number' ? item.confidence : 0.75,
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
      confidence: 0.7, // OCR-based extraction has lower confidence than AI
      method: 'ocr', // Indicate this was OCR-based
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
