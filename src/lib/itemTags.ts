// Item Tags Configuration
// These tags can be applied to menu items for additional classification

export interface ItemTag {
  id: string;
  name: string;
  name_en: string;
  icon: string;
  color: string; // Tailwind color classes
  bgColor: string;
  textColor: string;
}

export const ITEM_TAGS: ItemTag[] = [
  {
    id: 'new',
    name: 'Neu',
    name_en: 'New',
    icon: '🔥',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
  {
    id: 'popular',
    name: 'Bestseller',
    name_en: 'Bestseller',
    icon: '❤️',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'recommended',
    name: 'Empfohlen',
    name_en: 'Recommended',
    icon: '👍',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: 'special',
    name: 'Spezialität',
    name_en: 'Specialty',
    icon: '⭐',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarisch',
    name_en: 'Vegetarian',
    icon: '🥬',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    name_en: 'Vegan',
    icon: '🌱',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'spicy',
    name: 'Scharf',
    name_en: 'Spicy',
    icon: '🌶️',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'healthy',
    name: 'Gesund',
    name_en: 'Healthy',
    icon: '💪',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'kids',
    name: 'Für Kinder',
    name_en: 'For Kids',
    icon: '👶',
    color: 'pink',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
  },
  {
    id: 'homemade',
    name: 'Hausgemacht',
    name_en: 'Homemade',
    icon: '🏠',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  {
    id: 'gluten_free',
    name: 'Glutenfrei',
    name_en: 'Gluten Free',
    icon: '🌾',
    color: 'teal',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-700',
  },
];

// Helper to get a tag by ID
export function getTagById(id: string): ItemTag | undefined {
  return ITEM_TAGS.find(tag => tag.id === id);
}

// Helper to get multiple tags by IDs
export function getTagsByIds(ids: string[]): ItemTag[] {
  return ids.map(id => getTagById(id)).filter((tag): tag is ItemTag => tag !== undefined);
}

// Get localized tag name
export function getLocalizedTagName(tag: ItemTag, lang: 'de' | 'en'): string {
  return lang === 'en' ? tag.name_en : tag.name;
}
