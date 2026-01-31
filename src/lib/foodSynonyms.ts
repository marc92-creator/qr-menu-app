/**
 * Food Synonyms and Regional Variants
 * Maps different names to the same food items
 */

export interface SynonymGroup {
  canonical: string; // Main term
  variants: string[]; // All alternative names
}

/**
 * Comprehensive food synonym database
 * Includes regional dialects, spelling variants, and translations
 */
export const FOOD_SYNONYMS: SynonymGroup[] = [
  // ============================================
  // DÖNER & TURKISH
  // ============================================
  {
    canonical: 'döner',
    variants: [
      'doner', 'doener', 'donner', 'dönar', 'donar',
      'kebab', 'kebap', 'kepap', 'kabab', 'kabob',
      'shawarma', 'gyros döner', 'türkischer döner'
    ]
  },
  {
    canonical: 'dürüm',
    variants: [
      'durum', 'dürum', 'duruem', 'durüm',
      'wrap', 'yufka', 'lavash', 'rolle',
      'döner wrap', 'türkischer wrap'
    ]
  },
  {
    canonical: 'lahmacun',
    variants: [
      'lahmajun', 'lahmajo', 'lahmaçun',
      'türkische pizza', 'arabische pizza'
    ]
  },
  {
    canonical: 'pide',
    variants: [
      'türkisches fladenbrot', 'türkische pizza',
      'pita', 'pidé'
    ]
  },
  {
    canonical: 'köfte',
    variants: [
      'koefte', 'kofte', 'köftesi', 'kofta',
      'fleischbällchen', 'hackbällchen', 'türkische frikadellen'
    ]
  },

  // ============================================
  // POMMES FRITES (Regional variants!)
  // ============================================
  {
    canonical: 'pommes',
    variants: [
      'pommes frites', 'fritten', 'friten', 'frites',
      'french fries', 'chips', 'kartoffelstäbchen',
      'pommfrit', 'pommfritz', 'pomm', 'pom'
    ]
  },

  // ============================================
  // CHICKEN / HÄHNCHEN
  // ============================================
  {
    canonical: 'hähnchen',
    variants: [
      'haehnchen', 'hahnchen', 'hendl', 'broiler',
      'chicken', 'poulet', 'pollo', 'tavuk',
      'grillhähnchen', 'brathähnchen', 'huhn'
    ]
  },

  // ============================================
  // PFANNKUCHEN (Most regional variants!)
  // ============================================
  {
    canonical: 'pfannkuchen',
    variants: [
      'eierkuchen', 'palatschinken', 'pancakes',
      'flädle', 'plinsen', 'eierpuffer', 'crêpes',
      'fladen', 'eierpfannkuchen'
    ]
  },

  // ============================================
  // BRÖTCHEN (Huge regional variation!)
  // ============================================
  {
    canonical: 'brötchen',
    variants: [
      'broetchen', 'semmel', 'schrippe', 'weck',
      'rundstück', 'weckle', 'brötli', 'laabla',
      'bun', 'roll', 'brot', 'kleinbrot'
    ]
  },

  // ============================================
  // BURGER
  // ============================================
  {
    canonical: 'burger',
    variants: [
      'hamburger', 'cheeseburger', 'beefburger',
      'hackfleisch brötchen', 'bulette im brot'
    ]
  },
  {
    canonical: 'cheeseburger',
    variants: [
      'cheese burger', 'käseburger', 'burger mit käse'
    ]
  },

  // ============================================
  // PIZZA
  // ============================================
  {
    canonical: 'pizza',
    variants: ['piza', 'pizze', 'italian pizza']
  },
  {
    canonical: 'pizza margherita',
    variants: [
      'margherita', 'margerita', 'pizza margarita',
      'pizza mozzarella', 'käsepizza'
    ]
  },
  {
    canonical: 'pizza salami',
    variants: [
      'salamipizza', 'pizza pepperoni', 'pepperoni pizza'
    ]
  },

  // ============================================
  // PASTA
  // ============================================
  {
    canonical: 'pasta',
    variants: ['nudeln', 'noodles', 'teigwaren']
  },
  {
    canonical: 'spaghetti',
    variants: ['spagetti', 'spagheti', 'spaghetty']
  },
  {
    canonical: 'spaghetti bolognese',
    variants: [
      'bolognese', 'spag bol', 'spaghetti mit fleischsoße',
      'spaghetti hackfleisch', 'spagetti bolo'
    ]
  },
  {
    canonical: 'spaghetti carbonara',
    variants: [
      'carbonara', 'pasta carbonara', 'spagetti carbonara',
      'spaghetti mit speck'
    ]
  },

  // ============================================
  // SALAD
  // ============================================
  {
    canonical: 'salat',
    variants: [
      'salad', 'salade', 'insalata', 'blattsalat'
    ]
  },
  {
    canonical: 'caesar salad',
    variants: [
      'cäsar salat', 'caesar salat', 'caesarsalat',
      'ceasar salad'
    ]
  },

  // ============================================
  // SCHNITZEL
  // ============================================
  {
    canonical: 'schnitzel',
    variants: [
      'schnitsl', 'cutlet', 'escalope', 'kotelett'
    ]
  },
  {
    canonical: 'wiener schnitzel',
    variants: [
      'wienerschnitzel', 'kalb schnitzel', 'kalbsschnitzel'
    ]
  },

  // ============================================
  // FALAFEL
  // ============================================
  {
    canonical: 'falafel',
    variants: [
      'felafel', 'falefel', 'falaffel',
      'kichererbsenbällchen', 'veggie balls'
    ]
  },

  // ============================================
  // CURRYWURST
  // ============================================
  {
    canonical: 'currywurst',
    variants: [
      'curry wurst', 'curywurst', 'wurst mit curry',
      'bratwurst curry', 'bratwurst mit currysoße'
    ]
  },

  // ============================================
  // DRINKS - COFFEE
  // ============================================
  {
    canonical: 'kaffee',
    variants: [
      'coffee', 'cafe', 'caffè', 'kahve',
      'filterkaffee', 'bohnenkaffee'
    ]
  },
  {
    canonical: 'espresso',
    variants: [
      'expresso', 'esspresso', 'espreso',
      'kurzer', 'schwarzer'
    ]
  },
  {
    canonical: 'cappuccino',
    variants: [
      'capuccino', 'cappucino', 'capuchino',
      'milchkaffee', 'cappucchino'
    ]
  },
  {
    canonical: 'latte macchiato',
    variants: [
      'latte', 'macchiato', 'latte machiato',
      'milchkaffee', 'lattemachiato'
    ]
  },

  // ============================================
  // DRINKS - SOFT DRINKS
  // ============================================
  {
    canonical: 'cola',
    variants: [
      'coke', 'coca cola', 'pepsi', 'kolagetränk'
    ]
  },
  {
    canonical: 'fanta',
    variants: [
      'orange', 'orangenlimo', 'orangenlimonade',
      'orange soda'
    ]
  },
  {
    canonical: 'sprite',
    variants: [
      'zitronenlimo', 'lemon lime', '7up', 'seven up'
    ]
  },
  {
    canonical: 'wasser',
    variants: [
      'water', 'mineralwasser', 'sprudel',
      'stilles wasser', 'tafelwasser'
    ]
  },

  // ============================================
  // DRINKS - BEER
  // ============================================
  {
    canonical: 'bier',
    variants: [
      'beer', 'pils', 'pilsner', 'lager',
      'helles', 'export'
    ]
  },
  {
    canonical: 'weißbier',
    variants: [
      'weissbier', 'weizen', 'weizenbier',
      'hefeweizen', 'wheat beer'
    ]
  },

  // ============================================
  // ASIAN FOOD
  // ============================================
  {
    canonical: 'sushi',
    variants: ['susi', 'suschi', 'japanese rolls']
  },
  {
    canonical: 'ramen',
    variants: ['ramennudeln', 'ramen noodles', 'nudelsuppe']
  },
  {
    canonical: 'pad thai',
    variants: ['padthai', 'pad tai', 'thailändische nudeln']
  },
  {
    canonical: 'fried rice',
    variants: [
      'gebratener reis', 'reis gebraten', 'bratreis',
      'chinesischer reis', 'asia reis'
    ]
  },

  // ============================================
  // DESSERTS
  // ============================================
  {
    canonical: 'tiramisu',
    variants: ['tiramisù', 'tiramisu dessert', 'italienisches dessert']
  },
  {
    canonical: 'kuchen',
    variants: ['cake', 'torte', 'gebäck']
  },
  {
    canonical: 'eis',
    variants: ['eiscreme', 'ice cream', 'gelato', 'speiseeis']
  },
  {
    canonical: 'schokolade',
    variants: [
      'schoko', 'chocolate', 'chocolat', 'cioccolato',
      'kakao', 'schocko'
    ]
  },

  // ============================================
  // BREAKFAST
  // ============================================
  {
    canonical: 'croissant',
    variants: [
      'crossaint', 'croasant', 'kruwassong',
      'hörnchen', 'buttercroissant'
    ]
  },
  {
    canonical: 'müsli',
    variants: [
      'muesli', 'musli', 'granola', 'haferflocken',
      'cereal', 'frühstücksflocken'
    ]
  },

  // ============================================
  // VEGETARIAN/VEGAN TERMS
  // ============================================
  {
    canonical: 'vegetarisch',
    variants: [
      'veggie', 'vegetarian', 'fleischlos',
      'ohne fleisch', 'meatless'
    ]
  },
  {
    canonical: 'vegan',
    variants: [
      'pflanzlich', 'plant based', 'rein pflanzlich',
      'ohne tierische produkte'
    ]
  },
];

/**
 * Find all synonyms for a given term
 */
export function getSynonyms(term: string): string[] {
  const normalizedTerm = term.toLowerCase().trim();

  for (const group of FOOD_SYNONYMS) {
    // Check if term matches canonical or any variant
    if (
      group.canonical.toLowerCase() === normalizedTerm ||
      group.variants.some(v => v.toLowerCase() === normalizedTerm)
    ) {
      // Return all terms (canonical + variants)
      return [group.canonical, ...group.variants];
    }
  }

  return [term]; // No synonyms found, return original
}

/**
 * Check if two terms are synonyms
 */
export function areSynonyms(term1: string, term2: string): boolean {
  const synonyms1 = getSynonyms(term1);
  const synonyms2 = getSynonyms(term2);

  // Check if there's any overlap
  return synonyms1.some(s1 =>
    synonyms2.some(s2 => s1.toLowerCase() === s2.toLowerCase())
  );
}

/**
 * Expand search terms with synonyms
 */
export function expandWithSynonyms(searchTerm: string): string[] {
  const words = searchTerm.toLowerCase().split(' ');
  const expandedSets: string[][] = [];

  // Get synonyms for each word
  for (const word of words) {
    const synonyms = getSynonyms(word);
    expandedSets.push(synonyms);
  }

  // If only one word, return all synonyms
  if (expandedSets.length === 1) {
    return expandedSets[0];
  }

  // For multi-word terms, create combinations
  // E.g., "chicken burger" → ["hähnchen burger", "chicken hamburger", etc.]
  const combinations: string[] = [];

  function generateCombinations(index: number, current: string[]) {
    if (index === expandedSets.length) {
      combinations.push(current.join(' '));
      return;
    }

    for (const synonym of expandedSets[index]) {
      generateCombinations(index + 1, [...current, synonym]);
    }
  }

  generateCombinations(0, []);

  // Limit combinations to avoid explosion
  return combinations.slice(0, 50);
}
