/**
 * Ghibli-Style Food Image Library
 *
 * Beautiful, warm, illustrated food images for menu items.
 * Images are auto-matched based on dish names or can be manually selected.
 */

export interface FoodImageEntry {
  id: string;
  keywords: string[];
  image: string;
  label: string;
  category: FoodCategory;
}

export type FoodCategory =
  | 'doener'
  | 'beilagen'
  | 'getraenke'
  | 'pizza'
  | 'burger'
  | 'pasta'
  | 'suppen'
  | 'desserts'
  | 'fruehstueck'
  | 'andere';

export const FOOD_CATEGORIES: { id: FoodCategory; label: string; icon: string }[] = [
  { id: 'doener', label: 'Döner & Türkisch', icon: '🥙' },
  { id: 'beilagen', label: 'Beilagen', icon: '🍟' },
  { id: 'getraenke', label: 'Getränke', icon: '🥤' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'burger', label: 'Burger', icon: '🍔' },
  { id: 'pasta', label: 'Pasta', icon: '🍝' },
  { id: 'suppen', label: 'Suppen', icon: '🍜' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'fruehstueck', label: 'Frühstück', icon: '🥐' },
  { id: 'andere', label: 'Andere', icon: '🍽️' },
];

/**
 * Food Image Library
 * Each entry has keywords for auto-matching and a category for browsing
 */
export const FOOD_IMAGE_LIBRARY: FoodImageEntry[] = [
  // Döner & Türkisch
  {
    id: 'doener',
    keywords: ['döner', 'doner', 'kebab', 'kebap', 'fleisch im brot'],
    image: '/food-images/doener.svg',
    label: 'Döner',
    category: 'doener',
  },
  {
    id: 'dueruem',
    keywords: ['dürüm', 'durum', 'wrap', 'yufka', 'rolle'],
    image: '/food-images/dueruem.svg',
    label: 'Dürüm / Wrap',
    category: 'doener',
  },
  {
    id: 'lahmacun',
    keywords: ['lahmacun', 'türkische pizza', 'lahmajun'],
    image: '/food-images/lahmacun.svg',
    label: 'Lahmacun',
    category: 'doener',
  },
  {
    id: 'falafel',
    keywords: ['falafel', 'kichererbsen'],
    image: '/food-images/falafel.svg',
    label: 'Falafel',
    category: 'doener',
  },
  {
    id: 'doener-teller',
    keywords: ['döner teller', 'kebap teller', 'teller'],
    image: '/food-images/doener-teller.svg',
    label: 'Döner Teller',
    category: 'doener',
  },
  {
    id: 'pide',
    keywords: ['pide', 'türkisches boot'],
    image: '/food-images/pide.svg',
    label: 'Pide',
    category: 'doener',
  },
  {
    id: 'kebab',
    keywords: ['kebab spiess', 'spiess', 'shish', 'adana', 'iskender'],
    image: '/food-images/kebab.svg',
    label: 'Kebab Spieß',
    category: 'doener',
  },

  // Beilagen
  {
    id: 'pommes',
    keywords: ['pommes', 'frites', 'fritten', 'french fries'],
    image: '/food-images/pommes.svg',
    label: 'Pommes',
    category: 'beilagen',
  },
  {
    id: 'salat',
    keywords: ['salat', 'salad', 'gemischter salat', 'beilagensalat'],
    image: '/food-images/salat.svg',
    label: 'Salat',
    category: 'beilagen',
  },
  {
    id: 'reis',
    keywords: ['reis', 'rice', 'basmati'],
    image: '/food-images/reis.svg',
    label: 'Reis',
    category: 'beilagen',
  },
  {
    id: 'hummus',
    keywords: ['hummus', 'humus'],
    image: '/food-images/hummus.svg',
    label: 'Hummus',
    category: 'beilagen',
  },

  // Getränke
  {
    id: 'cola',
    keywords: ['cola', 'coca', 'pepsi'],
    image: '/food-images/cola.svg',
    label: 'Cola',
    category: 'getraenke',
  },
  {
    id: 'wasser',
    keywords: ['wasser', 'water', 'mineralwasser'],
    image: '/food-images/wasser.svg',
    label: 'Wasser',
    category: 'getraenke',
  },
  {
    id: 'ayran',
    keywords: ['ayran', 'joghurt getränk'],
    image: '/food-images/ayran.svg',
    label: 'Ayran',
    category: 'getraenke',
  },
  {
    id: 'fanta',
    keywords: ['fanta', 'orangenlimonade', 'orange'],
    image: '/food-images/fanta.svg',
    label: 'Fanta / Orange',
    category: 'getraenke',
  },
  {
    id: 'sprite',
    keywords: ['sprite', 'zitrone', 'limo'],
    image: '/food-images/sprite.svg',
    label: 'Sprite / Limo',
    category: 'getraenke',
  },
  {
    id: 'tee',
    keywords: ['tee', 'tea', 'çay', 'cay'],
    image: '/food-images/tee.svg',
    label: 'Tee',
    category: 'getraenke',
  },
  {
    id: 'kaffee',
    keywords: ['kaffee', 'coffee', 'espresso', 'cappuccino'],
    image: '/food-images/kaffee.svg',
    label: 'Kaffee',
    category: 'getraenke',
  },

  // Pizza
  {
    id: 'pizza',
    keywords: ['pizza', 'margherita', 'salami pizza', 'pizza stück', 'slice'],
    image: '/food-images/pizza.svg',
    label: 'Pizza',
    category: 'pizza',
  },

  // Burger
  {
    id: 'burger',
    keywords: ['burger', 'hamburger', 'cheeseburger'],
    image: '/food-images/burger.svg',
    label: 'Burger',
    category: 'burger',
  },
  {
    id: 'chicken',
    keywords: ['chicken', 'hähnchen', 'hühnchen', 'crispy chicken', 'chicken burger', 'nuggets'],
    image: '/food-images/chicken.svg',
    label: 'Hähnchen',
    category: 'burger',
  },

  // Pasta
  {
    id: 'pasta',
    keywords: ['pasta', 'spaghetti', 'nudeln', 'penne', 'tagliatelle', 'lasagne', 'lasagna'],
    image: '/food-images/pasta.svg',
    label: 'Pasta',
    category: 'pasta',
  },

  // Suppen
  {
    id: 'suppe',
    keywords: ['suppe', 'soup', 'brühe', 'linsensuppe', 'mercimek', 'linsen'],
    image: '/food-images/suppe.svg',
    label: 'Suppe',
    category: 'suppen',
  },

  // Desserts
  {
    id: 'baklava',
    keywords: ['baklava', 'baklawa'],
    image: '/food-images/baklava.svg',
    label: 'Baklava',
    category: 'desserts',
  },
  {
    id: 'eis',
    keywords: ['eis', 'ice cream', 'gelato', 'eiskugel'],
    image: '/food-images/eis.svg',
    label: 'Eis',
    category: 'desserts',
  },
  {
    id: 'kuchen',
    keywords: ['kuchen', 'cake', 'torte'],
    image: '/food-images/kuchen.svg',
    label: 'Kuchen',
    category: 'desserts',
  },

  // Frühstück
  {
    id: 'broetchen',
    keywords: ['brötchen', 'semmel', 'brot', 'sandwich'],
    image: '/food-images/broetchen.svg',
    label: 'Brötchen',
    category: 'fruehstueck',
  },
  {
    id: 'croissant',
    keywords: ['croissant', 'frühstück', 'breakfast'],
    image: '/food-images/croissant.svg',
    label: 'Croissant',
    category: 'fruehstueck',
  },

  // Andere
  {
    id: 'schnitzel',
    keywords: ['schnitzel', 'wiener schnitzel'],
    image: '/food-images/schnitzel.svg',
    label: 'Schnitzel',
    category: 'andere',
  },
  {
    id: 'currywurst',
    keywords: ['currywurst', 'wurst'],
    image: '/food-images/currywurst.svg',
    label: 'Currywurst',
    category: 'andere',
  },
  {
    id: 'default',
    keywords: [],
    image: '/food-images/default-food.svg',
    label: 'Standard',
    category: 'andere',
  },
];

/**
 * Get automatic image based on dish name
 * Searches through keywords case-insensitive
 */
export function getAutoImage(dishName: string): string {
  const nameLower = dishName.toLowerCase();

  // Search for matching keywords
  for (const entry of FOOD_IMAGE_LIBRARY) {
    for (const keyword of entry.keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return entry.image;
      }
    }
  }

  // Return default image if no match found
  return '/food-images/default-food.svg';
}

/**
 * Get image entry by ID
 */
export function getImageById(id: string): FoodImageEntry | undefined {
  return FOOD_IMAGE_LIBRARY.find(entry => entry.id === id);
}

/**
 * Get all images for a category
 */
export function getImagesByCategory(category: FoodCategory): FoodImageEntry[] {
  return FOOD_IMAGE_LIBRARY.filter(entry => entry.category === category);
}

/**
 * Search images by query
 */
export function searchImages(query: string): FoodImageEntry[] {
  const queryLower = query.toLowerCase();
  return FOOD_IMAGE_LIBRARY.filter(entry =>
    entry.label.toLowerCase().includes(queryLower) ||
    entry.keywords.some(k => k.toLowerCase().includes(queryLower))
  );
}

/**
 * Image mode for menu items
 */
export type ImageMode = 'auto' | 'library' | 'custom' | 'none';

/**
 * Category Image Mapping
 * Maps category names to icons and images
 */
export interface CategoryImageEntry {
  keywords: string[];
  icon: string;
  image: string;
}

export const CATEGORY_IMAGES: Record<string, CategoryImageEntry> = {
  doener: { keywords: ['döner', 'doner', 'kebab', 'kebap', 'türkisch', 'wraps'], icon: '🥙', image: '/food-images/doener.svg' },
  beilagen: { keywords: ['beilagen', 'sides', 'extras'], icon: '🍟', image: '/food-images/pommes.svg' },
  getraenke: { keywords: ['getränke', 'drinks', 'trinken'], icon: '🥤', image: '/food-images/cola.svg' },
  pizza: { keywords: ['pizza'], icon: '🍕', image: '/food-images/pizza.svg' },
  burger: { keywords: ['burger'], icon: '🍔', image: '/food-images/burger.svg' },
  pasta: { keywords: ['pasta', 'nudeln', 'spaghetti'], icon: '🍝', image: '/food-images/pasta.svg' },
  salate: { keywords: ['salat', 'salads', 'salate'], icon: '🥗', image: '/food-images/salat.svg' },
  desserts: { keywords: ['dessert', 'süß', 'nachspeise', 'nachtisch', 'süßes'], icon: '🍰', image: '/food-images/baklava.svg' },
  fruehstueck: { keywords: ['frühstück', 'breakfast', 'morgen'], icon: '🥐', image: '/food-images/croissant.svg' },
  suppen: { keywords: ['suppe', 'soup', 'suppen'], icon: '🍜', image: '/food-images/suppe.svg' },
  hauptgerichte: { keywords: ['hauptgericht', 'main', 'gericht'], icon: '🍽️', image: '/food-images/schnitzel.svg' },
  vorspeisen: { keywords: ['vorspeise', 'starter', 'appetizer'], icon: '🥗', image: '/food-images/hummus.svg' },
  default: { keywords: [], icon: '🍽️', image: '/food-images/default-food.svg' },
};

/**
 * Get category icon and image based on category name
 */
export function getCategoryImage(categoryName: string): { icon: string; image: string } {
  const nameLower = categoryName.toLowerCase();

  for (const [, entry] of Object.entries(CATEGORY_IMAGES)) {
    for (const keyword of entry.keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return { icon: entry.icon, image: entry.image };
      }
    }
  }

  return { icon: CATEGORY_IMAGES.default.icon, image: CATEGORY_IMAGES.default.image };
}

/**
 * Get the actual image URL for a menu item
 */
export function getItemImageUrl(
  item: {
    name: string;
    image_url?: string | null;
    image_library_key?: string | null;
    image_mode?: ImageMode;
  },
  autoImagesEnabled: boolean = true
): string | null {
  const mode = item.image_mode || 'auto';

  // If restaurant has disabled auto images, only show custom images
  if (!autoImagesEnabled && mode !== 'custom') {
    return null;
  }

  switch (mode) {
    case 'none':
      return null;
    case 'custom':
      return item.image_url || null;
    case 'library':
      if (item.image_library_key) {
        const entry = getImageById(item.image_library_key);
        return entry?.image || null;
      }
      return null;
    case 'auto':
    default:
      return getAutoImage(item.name);
  }
}
