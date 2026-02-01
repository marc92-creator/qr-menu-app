/**
 * Menu Template System
 * Separates content from presentation - same data, different layouts
 */

export type LayoutType = 'single-column' | 'two-column' | 'grid' | 'table' | 'cards';
export type ImageStrategy = 'none' | 'category-headers' | 'item-thumbnails' | 'item-hero' | 'mixed';
export type DensityLevel = 'minimal' | 'standard' | 'detailed' | 'verbose';
export type LanguageMode = 'primary' | 'side-by-side' | 'tabs' | 'toggle';

export interface MenuTemplate {
  id: string;
  name: string;
  description: string;
  preview: string; // Preview image URL

  // Layout Configuration
  layout: {
    type: LayoutType;
    columns?: number;
    gap?: 'compact' | 'standard' | 'spacious';
  };

  // Image Strategy
  images: {
    strategy: ImageStrategy;
    categoryIcons?: boolean;
    itemImages?: boolean;
    imageSize?: 'small' | 'medium' | 'large';
    position?: 'left' | 'top' | 'background';
  };

  // Information Density
  density: {
    level: DensityLevel;
    showDescription?: boolean;
    showAllergens?: boolean;
    showBadges?: boolean;
    showTags?: boolean;
  };

  // Language Display
  language: {
    mode: LanguageMode;
    showFlags?: boolean;
  };

  // Typography
  typography: {
    nameSize: 'sm' | 'base' | 'lg' | 'xl';
    priceSize: 'sm' | 'base' | 'lg';
    descriptionSize: 'xs' | 'sm' | 'base';
  };

  // Default theme for this template
  defaultTheme: string;

  // Metadata
  metadata: {
    category: 'fast-food' | 'casual' | 'fine-dining' | 'cafe' | 'bar';
    complexity: 'simple' | 'moderate' | 'complex';
    recommended: string[];
  };
}

/**
 * Category Icon Mapping
 * Auto-detects category icons based on name
 */
export const CATEGORY_ICONS: Record<string, string> = {
  // Pizza & Italian
  'Pizza': '🍕',
  'Pizzas': '🍕',
  'Pizza & Pasta': '🍕',
  'Pasta': '🍝',
  'Italienisch': '🍝',

  // Burger & American
  'Burger': '🍔',
  'Burgers': '🍔',
  'Hamburger': '🍔',
  'American': '🍔',

  // Asian
  'Sushi': '🍣',
  'Asiatisch': '🍜',
  'Ramen': '🍜',
  'Nudeln': '🍜',
  'Curry': '🍛',
  'Reis': '🍚',

  // Salads & Healthy
  'Salat': '🥗',
  'Salate': '🥗',
  'Salads': '🥗',
  'Bowls': '🥗',
  'Vegan': '🌱',
  'Vegetarisch': '🥬',

  // Desserts & Sweets
  'Dessert': '🍰',
  'Desserts': '🍰',
  'Kuchen': '🍰',
  'Eis': '🍨',
  'Nachspeisen': '🍮',

  // Drinks
  'Getränke': '🥤',
  'Drinks': '🥤',
  'Kaffee': '☕',
  'Coffee': '☕',
  'Tee': '🍵',
  'Tea': '🍵',
  'Cocktails': '🍹',
  'Bier': '🍺',
  'Wein': '🍷',

  // Starters
  'Vorspeisen': '🥟',
  'Starters': '🥟',
  'Appetizer': '🥟',
  'Suppen': '🍲',
  'Soups': '🍲',

  // Mains
  'Hauptgerichte': '🍖',
  'Hauptspeisen': '🍖',
  'Mains': '🍖',
  'Fleisch': '🥩',
  'Meat': '🥩',
  'Fisch': '🐟',
  'Fish': '🐟',
  'Döner': '🥙',
  'Wraps': '🌯',

  // Sides
  'Beilagen': '🍟',
  'Sides': '🍟',
  'Pommes': '🍟',

  // Breakfast
  'Frühstück': '🥐',
  'Breakfast': '🥐',
  'Brunch': '🥐',
};

/**
 * Get category icon based on name
 */
export function getCategoryIcon(categoryName: string): string {
  // Direct match
  if (CATEGORY_ICONS[categoryName]) {
    return CATEGORY_ICONS[categoryName];
  }

  // Partial match (case insensitive)
  const lowerName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return icon;
    }
  }

  // Default icon
  return '🍽️';
}

/**
 * Available Templates
 */
export const TEMPLATES: Record<string, MenuTemplate> = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, text-focused design with category icons only',
    preview: '/templates/minimalist-preview.png',

    layout: {
      type: 'single-column',
      gap: 'spacious',
    },

    images: {
      strategy: 'category-headers',
      categoryIcons: true,
      itemImages: false,
    },

    density: {
      level: 'minimal',
      showDescription: true,
      showAllergens: false,
      showBadges: true,
      showTags: false,
    },

    language: {
      mode: 'primary',
      showFlags: false,
    },

    typography: {
      nameSize: 'lg',
      priceSize: 'lg',
      descriptionSize: 'sm',
    },

    defaultTheme: 'modern',

    metadata: {
      category: 'cafe',
      complexity: 'simple',
      recommended: ['Café', 'Bar', 'Bistro', 'Bäckerei'],
    },
  },

  traditional: {
    id: 'traditional',
    name: 'Traditional',
    description: 'Current style with item images and full details',
    preview: '/templates/traditional-preview.png',

    layout: {
      type: 'single-column',
      gap: 'standard',
    },

    images: {
      strategy: 'item-thumbnails',
      categoryIcons: false,
      itemImages: true,
      imageSize: 'medium',
      position: 'left',
    },

    density: {
      level: 'standard',
      showDescription: true,
      showAllergens: true,
      showBadges: true,
      showTags: true,
    },

    language: {
      mode: 'primary',
      showFlags: false,
    },

    typography: {
      nameSize: 'base',
      priceSize: 'base',
      descriptionSize: 'sm',
    },

    defaultTheme: 'classic',

    metadata: {
      category: 'fast-food',
      complexity: 'moderate',
      recommended: ['Döner', 'Pizza', 'Burger', 'Restaurant'],
    },
  },

  'modern-grid': {
    id: 'modern-grid',
    name: 'Modern Grid',
    description: 'Instagram-style 2-column grid with large hero images',
    preview: '/templates/modern-grid-preview.png',

    layout: {
      type: 'grid',
      columns: 2,
      gap: 'compact',
    },

    images: {
      strategy: 'item-hero',
      categoryIcons: false,
      itemImages: true,
      imageSize: 'large',
      position: 'top',
    },

    density: {
      level: 'minimal',
      showDescription: true,
      showAllergens: false,
      showBadges: true,
      showTags: false,
    },

    language: {
      mode: 'primary',
      showFlags: false,
    },

    typography: {
      nameSize: 'base',
      priceSize: 'base',
      descriptionSize: 'sm',
    },

    defaultTheme: 'modern',

    metadata: {
      category: 'cafe',
      complexity: 'simple',
      recommended: ['Café', 'Breakfast', 'Bakery', 'Juice Bar'],
    },
  },

  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Dense table layout for large menus',
    preview: '/templates/compact-preview.png',

    layout: {
      type: 'table',
      gap: 'compact',
    },

    images: {
      strategy: 'none',
      categoryIcons: true,
      itemImages: false,
    },

    density: {
      level: 'detailed',
      showDescription: true,
      showAllergens: true,
      showBadges: true,
      showTags: false,
    },

    language: {
      mode: 'primary',
      showFlags: false,
    },

    typography: {
      nameSize: 'sm',
      priceSize: 'sm',
      descriptionSize: 'xs',
    },

    defaultTheme: 'classic',

    metadata: {
      category: 'fast-food',
      complexity: 'simple',
      recommended: ['Döner', 'Pizza', 'Fast Food', 'Große Menüs'],
    },
  },

  'fine-dining': {
    id: 'fine-dining',
    name: 'Fine Dining',
    description: 'Elegant upscale design with serif typography',
    preview: '/templates/fine-dining-preview.png',

    layout: {
      type: 'single-column',
      gap: 'spacious',
    },

    images: {
      strategy: 'none',
      categoryIcons: false,
      itemImages: false,
    },

    density: {
      level: 'verbose',
      showDescription: true,
      showAllergens: false,
      showBadges: true,
      showTags: false,
    },

    language: {
      mode: 'side-by-side',
      showFlags: false,
    },

    typography: {
      nameSize: 'xl',
      priceSize: 'lg',
      descriptionSize: 'base',
    },

    defaultTheme: 'finedining',

    metadata: {
      category: 'fine-dining',
      complexity: 'simple',
      recommended: ['Fine Dining', 'Wine Bar', 'Gourmet', 'Michelin'],
    },
  },
};

/**
 * Get template by ID
 */
export function getTemplate(templateId: string): MenuTemplate {
  return TEMPLATES[templateId] || TEMPLATES.traditional;
}

/**
 * Get all available templates
 */
export function getAllTemplates(): MenuTemplate[] {
  return Object.values(TEMPLATES);
}

/**
 * Recommend template based on restaurant data
 */
export function recommendTemplate(data: {
  itemCount: number;
  categoryCount: number;
  hasImages: number; // Percentage 0-1
  isBilingual: boolean;
}): string {
  const { itemCount, categoryCount, hasImages } = data;

  // Fine dining: small menu (< 15 items), no images
  if (itemCount < 15 && hasImages < 0.2) {
    return 'fine-dining';
  }

  // Modern grid: high image percentage (> 70%)
  if (hasImages > 0.7) {
    return 'modern-grid';
  }

  // Compact: large menu (> 40 items)
  if (itemCount > 40) {
    return 'compact';
  }

  // Minimalist: small menu (< 20 items), few categories
  if (itemCount <= 20 && categoryCount <= 5) {
    return 'minimalist';
  }

  // Default: Traditional
  return 'traditional';
}
