// Item Tags Configuration
// These tags can be applied to menu items for additional classification

import { Language } from './translations';

export interface ItemTag {
  id: string;
  name: string;
  name_en: string;
  name_fr?: string;
  name_it?: string;
  name_es?: string;
  name_tr?: string;
  name_pl?: string;
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
    name_fr: 'Nouveau',
    name_it: 'Nuovo',
    name_es: 'Nuevo',
    name_tr: 'Yeni',
    name_pl: 'Nowość',
    icon: '🔥',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
  {
    id: 'popular',
    name: 'Bestseller',
    name_en: 'Bestseller',
    name_fr: 'Populaire',
    name_it: 'Popolare',
    name_es: 'Popular',
    name_tr: 'Popüler',
    name_pl: 'Bestseller',
    icon: '❤️',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'recommended',
    name: 'Empfohlen',
    name_en: 'Recommended',
    name_fr: 'Recommandé',
    name_it: 'Consigliato',
    name_es: 'Recomendado',
    name_tr: 'Tavsiye',
    name_pl: 'Polecane',
    icon: '👍',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: 'special',
    name: 'Spezialität',
    name_en: 'Specialty',
    name_fr: 'Spécialité',
    name_it: 'Specialità',
    name_es: 'Especialidad',
    name_tr: 'Özel',
    name_pl: 'Specjalność',
    icon: '⭐',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarisch',
    name_en: 'Vegetarian',
    name_fr: 'Végétarien',
    name_it: 'Vegetariano',
    name_es: 'Vegetariano',
    name_tr: 'Vejetaryen',
    name_pl: 'Wegetariańskie',
    icon: '🥬',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    name_en: 'Vegan',
    name_fr: 'Végan',
    name_it: 'Vegano',
    name_es: 'Vegano',
    name_tr: 'Vegan',
    name_pl: 'Wegańskie',
    icon: '🌱',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'spicy',
    name: 'Scharf',
    name_en: 'Spicy',
    name_fr: 'Épicé',
    name_it: 'Piccante',
    name_es: 'Picante',
    name_tr: 'Acı',
    name_pl: 'Ostre',
    icon: '🌶️',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'healthy',
    name: 'Gesund',
    name_en: 'Healthy',
    name_fr: 'Sain',
    name_it: 'Salutare',
    name_es: 'Saludable',
    name_tr: 'Sağlıklı',
    name_pl: 'Zdrowe',
    icon: '💪',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'kids',
    name: 'Für Kinder',
    name_en: 'For Kids',
    name_fr: 'Pour enfants',
    name_it: 'Per bambini',
    name_es: 'Para niños',
    name_tr: 'Çocuklar için',
    name_pl: 'Dla dzieci',
    icon: '👶',
    color: 'pink',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
  },
  {
    id: 'homemade',
    name: 'Hausgemacht',
    name_en: 'Homemade',
    name_fr: 'Fait maison',
    name_it: 'Fatto in casa',
    name_es: 'Casero',
    name_tr: 'Ev yapımı',
    name_pl: 'Domowe',
    icon: '🏠',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  {
    id: 'gluten_free',
    name: 'Glutenfrei',
    name_en: 'Gluten Free',
    name_fr: 'Sans gluten',
    name_it: 'Senza glutine',
    name_es: 'Sin gluten',
    name_tr: 'Glutensiz',
    name_pl: 'Bezglutenowe',
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
export function getLocalizedTagName(tag: ItemTag, lang: Language): string {
  switch (lang) {
    case 'en':
      return tag.name_en;
    case 'fr':
      return tag.name_fr || tag.name_en;
    case 'it':
      return tag.name_it || tag.name_en;
    case 'es':
      return tag.name_es || tag.name_en;
    case 'tr':
      return tag.name_tr || tag.name_en;
    case 'pl':
      return tag.name_pl || tag.name_en;
    default:
      return tag.name; // German default
  }
}
