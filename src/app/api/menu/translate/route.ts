import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Translation prompt for Gemini
const TRANSLATION_PROMPT = `Du bist ein Übersetzer für Restaurant-Speisekarten.
Übersetze die folgenden Menü-Einträge von Deutsch in 6 Sprachen: Englisch (en), Französisch (fr), Italienisch (it), Spanisch (es), Türkisch (tr), Polnisch (pl).

WICHTIGE REGELN:
- Behalte Eigennamen bei (z.B. "Margherita" bleibt "Margherita", "Döner" bleibt "Döner")
- Übersetze nur die beschreibenden Teile
- Antworte NUR mit JSON, kein zusätzlicher Text
- Nutze natürliche Ausdrücke für jede Sprache

INPUT FORMAT:
{
  "items": [
    {"id": "1", "name": "Name auf Deutsch", "description": "Beschreibung auf Deutsch"},
    ...
  ]
}

OUTPUT FORMAT:
{
  "items": [
    {
      "id": "1",
      "name_en": "English name",
      "name_fr": "Nom français",
      "name_it": "Nome italiano",
      "name_es": "Nombre español",
      "name_tr": "Türkçe isim",
      "name_pl": "Polska nazwa",
      "description_en": "English description",
      "description_fr": "Description française",
      "description_it": "Descrizione italiana",
      "description_es": "Descripción española",
      "description_tr": "Türkçe açıklama",
      "description_pl": "Polski opis"
    },
    ...
  ]
}

Hier sind die zu übersetzenden Einträge:`;

// Fallback dictionary for common restaurant terms
const FALLBACK_TRANSLATIONS: Record<string, Record<string, string>> = {
  'mit': { en: 'with', fr: 'avec', it: 'con', es: 'con', tr: 'ile', pl: 'z' },
  'und': { en: 'and', fr: 'et', it: 'e', es: 'y', tr: 've', pl: 'i' },
  'oder': { en: 'or', fr: 'ou', it: 'o', es: 'o', tr: 'veya', pl: 'lub' },
  'hausgemacht': { en: 'homemade', fr: 'fait maison', it: 'fatto in casa', es: 'casero', tr: 'ev yapımı', pl: 'domowe' },
  'frisch': { en: 'fresh', fr: 'frais', it: 'fresco', es: 'fresco', tr: 'taze', pl: 'świeże' },
  'gebraten': { en: 'fried', fr: 'frit', it: 'fritto', es: 'frito', tr: 'kızarmış', pl: 'smażone' },
  'gegrillt': { en: 'grilled', fr: 'grillé', it: 'alla griglia', es: 'a la parrilla', tr: 'ızgara', pl: 'grillowane' },
  'gebacken': { en: 'baked', fr: 'cuit au four', it: 'al forno', es: 'al horno', tr: 'fırında', pl: 'pieczone' },
  'salat': { en: 'salad', fr: 'salade', it: 'insalata', es: 'ensalada', tr: 'salata', pl: 'sałatka' },
  'soße': { en: 'sauce', fr: 'sauce', it: 'salsa', es: 'salsa', tr: 'sos', pl: 'sos' },
  'sauce': { en: 'sauce', fr: 'sauce', it: 'salsa', es: 'salsa', tr: 'sos', pl: 'sos' },
  'käse': { en: 'cheese', fr: 'fromage', it: 'formaggio', es: 'queso', tr: 'peynir', pl: 'ser' },
  'fleisch': { en: 'meat', fr: 'viande', it: 'carne', es: 'carne', tr: 'et', pl: 'mięso' },
  'hähnchen': { en: 'chicken', fr: 'poulet', it: 'pollo', es: 'pollo', tr: 'tavuk', pl: 'kurczak' },
  'rind': { en: 'beef', fr: 'boeuf', it: 'manzo', es: 'ternera', tr: 'sığır', pl: 'wołowina' },
  'schwein': { en: 'pork', fr: 'porc', it: 'maiale', es: 'cerdo', tr: 'domuz', pl: 'wieprzowina' },
  'fisch': { en: 'fish', fr: 'poisson', it: 'pesce', es: 'pescado', tr: 'balık', pl: 'ryba' },
  'gemüse': { en: 'vegetables', fr: 'légumes', it: 'verdure', es: 'verduras', tr: 'sebze', pl: 'warzywa' },
  'kartoffeln': { en: 'potatoes', fr: 'pommes de terre', it: 'patate', es: 'patatas', tr: 'patates', pl: 'ziemniaki' },
  'pommes': { en: 'fries', fr: 'frites', it: 'patatine', es: 'patatas fritas', tr: 'patates kızartması', pl: 'frytki' },
  'reis': { en: 'rice', fr: 'riz', it: 'riso', es: 'arroz', tr: 'pilav', pl: 'ryż' },
  'brot': { en: 'bread', fr: 'pain', it: 'pane', es: 'pan', tr: 'ekmek', pl: 'chleb' },
  'suppe': { en: 'soup', fr: 'soupe', it: 'zuppa', es: 'sopa', tr: 'çorba', pl: 'zupa' },
  'klein': { en: 'small', fr: 'petit', it: 'piccolo', es: 'pequeño', tr: 'küçük', pl: 'mały' },
  'groß': { en: 'large', fr: 'grand', it: 'grande', es: 'grande', tr: 'büyük', pl: 'duży' },
  'portion': { en: 'portion', fr: 'portion', it: 'porzione', es: 'porción', tr: 'porsiyon', pl: 'porcja' },
};

// Simple fallback translation using dictionary
function fallbackTranslate(text: string, targetLang: string): string {
  if (!text) return text;

  let result = text.toLowerCase();

  for (const [german, translations] of Object.entries(FALLBACK_TRANSLATIONS)) {
    const translation = translations[targetLang];
    if (translation) {
      // Use word boundaries to avoid partial replacements
      const regex = new RegExp(`\\b${german}\\b`, 'gi');
      result = result.replace(regex, translation);
    }
  }

  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Translate using Gemini API
async function translateWithGemini(
  items: Array<{ id: string; name: string; description: string | null }>,
  apiKey: string
): Promise<Array<Record<string, string>>> {
  const input = {
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
    })),
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${TRANSLATION_PROMPT}\n\n${JSON.stringify(input, null, 2)}`,
        }],
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error('Keine Antwort von Gemini erhalten');
  }

  // Extract JSON from response (might be wrapped in markdown code blocks)
  let jsonStr = textContent;
  const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  const result = JSON.parse(jsonStr.trim());
  return result.items;
}

// Fallback translation when Gemini is not available
function translateWithFallback(
  items: Array<{ id: string; name: string; description: string | null }>
): Array<Record<string, string>> {
  const languages = ['en', 'fr', 'it', 'es', 'tr', 'pl'];

  return items.map(item => {
    const translations: Record<string, string> = { id: item.id };

    for (const lang of languages) {
      translations[`name_${lang}`] = fallbackTranslate(item.name, lang);
      if (item.description) {
        translations[`description_${lang}`] = fallbackTranslate(item.description, lang);
      }
    }

    return translations;
  });
}

export async function POST(request: NextRequest) {
  try {
    const { restaurant_id } = await request.json();

    if (!restaurant_id) {
      return NextResponse.json(
        { error: 'restaurant_id ist erforderlich' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user owns this restaurant
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('id, owner_id')
      .eq('id', restaurant_id)
      .single();

    if (!restaurant || restaurant.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'Restaurant nicht gefunden oder keine Berechtigung' },
        { status: 403 }
      );
    }

    // Fetch categories first
    const { data: categories } = await supabase
      .from('menu_categories')
      .select('id, name')
      .eq('restaurant_id', restaurant_id);

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: 'Keine Kategorien gefunden' },
        { status: 404 }
      );
    }

    const categoryIds = categories.map(c => c.id);

    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('id, name, description')
      .in('category_id', categoryIds);

    if (menuError) {
      return NextResponse.json(
        { error: 'Fehler beim Laden der Menü-Items: ' + menuError.message },
        { status: 500 }
      );
    }

    const allItems = [
      ...categories.map(c => ({ id: `cat_${c.id}`, name: c.name, description: null })),
      ...(menuItems || []).map(i => ({ id: `item_${i.id}`, name: i.name, description: i.description })),
    ];

    if (allItems.length === 0) {
      return NextResponse.json(
        { error: 'Keine Einträge zum Übersetzen gefunden' },
        { status: 404 }
      );
    }

    // Try Gemini first, fallback to dictionary
    let translations: Array<Record<string, string>>;
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;

    try {
      if (geminiKey) {
        // Process in batches of 20 to avoid token limits
        const BATCH_SIZE = 20;
        translations = [];

        for (let i = 0; i < allItems.length; i += BATCH_SIZE) {
          const batch = allItems.slice(i, i + BATCH_SIZE);
          const batchTranslations = await translateWithGemini(batch, geminiKey);
          translations.push(...batchTranslations);
        }
      } else {
        console.log('Gemini API key not configured, using fallback translation');
        translations = translateWithFallback(allItems);
      }
    } catch (geminiError) {
      console.error('Gemini translation failed, using fallback:', geminiError);
      translations = translateWithFallback(allItems);
    }

    // Update categories
    const categoryTranslations = translations.filter(t => t.id.startsWith('cat_'));
    for (const trans of categoryTranslations) {
      const categoryId = trans.id.replace('cat_', '');
      await supabase
        .from('menu_categories')
        .update({
          name_en: trans.name_en,
          name_fr: trans.name_fr,
          name_it: trans.name_it,
          name_es: trans.name_es,
          name_tr: trans.name_tr,
          name_pl: trans.name_pl,
        })
        .eq('id', categoryId);
    }

    // Update menu items
    const itemTranslations = translations.filter(t => t.id.startsWith('item_'));
    for (const trans of itemTranslations) {
      const itemId = trans.id.replace('item_', '');
      await supabase
        .from('menu_items')
        .update({
          name_en: trans.name_en,
          name_fr: trans.name_fr,
          name_it: trans.name_it,
          name_es: trans.name_es,
          name_tr: trans.name_tr,
          name_pl: trans.name_pl,
          description_en: trans.description_en,
          description_fr: trans.description_fr,
          description_it: trans.description_it,
          description_es: trans.description_es,
          description_tr: trans.description_tr,
          description_pl: trans.description_pl,
        })
        .eq('id', itemId);
    }

    return NextResponse.json({
      success: true,
      translated: {
        categories: categoryTranslations.length,
        items: itemTranslations.length,
      },
      method: geminiKey ? 'gemini' : 'fallback',
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Übersetzungsfehler' },
      { status: 500 }
    );
  }
}
