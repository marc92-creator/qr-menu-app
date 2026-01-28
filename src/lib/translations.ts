// Translation system for menu display
// Supports German (de) and English (en)

export type Language = 'de' | 'en';

export interface MenuTranslations {
  // Header
  openNow: string;
  closedNow: string;
  closedToday: string;
  opens: string;
  closes: string;

  // Badges
  vegan: string;
  vegetarian: string;
  popular: string;
  special: string;
  dailySpecial: string;

  // Allergens section
  allergens: string;
  allergenInfo: string;

  // Categories
  allCategories: string;

  // Menu items
  notAvailable: string;

  // Footer
  poweredBy: string;
  lastUpdated: string;
  free: string;
  createdWith: string;

  // Contact
  contactViaWhatsApp: string;
  orderViaWhatsApp: string;

  // Empty states
  noMenuAvailable: string;
  noItemsInCategory: string;

  // Time relative
  justNow: string;
  minuteAgo: string;
  minutesAgo: string;
  hourAgo: string;
  hoursAgo: string;
  yesterday: string;
  daysAgo: string;

  // TV Mode
  category: string;
  of: string;
  autoScrollActive: string;
  autoScrollPaused: string;
  keyboardHint: string;
}

export const translations: Record<Language, MenuTranslations> = {
  de: {
    // Header
    openNow: 'Geöffnet',
    closedNow: 'Geschlossen',
    closedToday: 'Heute Ruhetag',
    opens: 'Öffnet',
    closes: 'Schließt',

    // Badges
    vegan: 'Vegan',
    vegetarian: 'Vegetarisch',
    popular: 'Beliebt',
    special: 'Angebot',
    dailySpecial: 'Tagesangebot',

    // Allergens
    allergens: 'Allergene',
    allergenInfo: 'Fragen Sie unser Personal bei Allergien oder Unverträglichkeiten.',

    // Categories
    allCategories: 'Alle',

    // Menu items
    notAvailable: 'Nicht verfügbar',

    // Footer
    poweredBy: 'Erstellt mit',
    lastUpdated: 'Aktualisiert',
    free: 'Gratis',
    createdWith: 'Erstellt mit MenuApp',

    // Contact
    contactViaWhatsApp: 'Kontakt via WhatsApp',
    orderViaWhatsApp: 'Bestellen via WhatsApp',

    // Empty states
    noMenuAvailable: 'Keine Speisekarte verfügbar.',
    noItemsInCategory: 'Keine Gerichte in dieser Kategorie',

    // Time relative
    justNow: 'Gerade eben',
    minuteAgo: 'Vor 1 Minute',
    minutesAgo: 'Vor {n} Minuten',
    hourAgo: 'Vor 1 Stunde',
    hoursAgo: 'Vor {n} Stunden',
    yesterday: 'Gestern',
    daysAgo: 'Vor {n} Tagen',

    // TV Mode
    category: 'Kategorie',
    of: 'von',
    autoScrollActive: 'Auto-Scroll aktiv',
    autoScrollPaused: 'Auto-Scroll pausiert',
    keyboardHint: 'Tastatur: ← → Navigation | P = Pause | Leertaste = Weiter',
  },
  en: {
    // Header
    openNow: 'Open now',
    closedNow: 'Closed',
    closedToday: 'Closed today',
    opens: 'Opens',
    closes: 'Closes',

    // Badges
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    popular: 'Popular',
    special: 'Special',
    dailySpecial: 'Daily Special',

    // Allergens
    allergens: 'Allergens',
    allergenInfo: 'Please ask our staff about allergies or intolerances.',

    // Categories
    allCategories: 'All',

    // Menu items
    notAvailable: 'Not available',

    // Footer
    poweredBy: 'Powered by',
    lastUpdated: 'Updated',
    free: 'Free',
    createdWith: 'Created with MenuApp',

    // Contact
    contactViaWhatsApp: 'Contact via WhatsApp',
    orderViaWhatsApp: 'Order via WhatsApp',

    // Empty states
    noMenuAvailable: 'No menu available.',
    noItemsInCategory: 'No items in this category',

    // Time relative
    justNow: 'Just now',
    minuteAgo: '1 minute ago',
    minutesAgo: '{n} minutes ago',
    hourAgo: '1 hour ago',
    hoursAgo: '{n} hours ago',
    yesterday: 'Yesterday',
    daysAgo: '{n} days ago',

    // TV Mode
    category: 'Category',
    of: 'of',
    autoScrollActive: 'Auto-scroll active',
    autoScrollPaused: 'Auto-scroll paused',
    keyboardHint: 'Keyboard: ← → Navigate | P = Pause | Space = Next',
  },
};

// Allergen translations
export const allergenTranslations: Record<Language, Record<string, string>> = {
  de: {
    gluten: 'Gluten',
    crustaceans: 'Krebstiere',
    eggs: 'Eier',
    fish: 'Fisch',
    peanuts: 'Erdnüsse',
    soy: 'Soja',
    milk: 'Milch',
    nuts: 'Schalenfrüchte',
    celery: 'Sellerie',
    mustard: 'Senf',
    sesame: 'Sesam',
    sulfites: 'Sulfite',
    lupin: 'Lupinen',
    molluscs: 'Weichtiere',
  },
  en: {
    gluten: 'Gluten',
    crustaceans: 'Crustaceans',
    eggs: 'Eggs',
    fish: 'Fish',
    peanuts: 'Peanuts',
    soy: 'Soy',
    milk: 'Milk',
    nuts: 'Tree Nuts',
    celery: 'Celery',
    mustard: 'Mustard',
    sesame: 'Sesame',
    sulfites: 'Sulfites',
    lupin: 'Lupin',
    molluscs: 'Molluscs',
  },
};

// Get translation helper
export function getTranslation(lang: Language): MenuTranslations {
  return translations[lang] || translations.de;
}

// Get allergen name in specified language
export function getAllergenName(allergenId: string, lang: Language): string {
  return allergenTranslations[lang]?.[allergenId] || allergenTranslations.de[allergenId] || allergenId;
}

// Format relative time with translations
export function formatRelativeTime(dateString: string, lang: Language): string {
  const t = getTranslation(lang);
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return t.justNow;
  if (diffMins === 1) return t.minuteAgo;
  if (diffMins < 60) return t.minutesAgo.replace('{n}', String(diffMins));
  if (diffHours === 1) return t.hourAgo;
  if (diffHours < 24) return t.hoursAgo.replace('{n}', String(diffHours));
  if (diffDays === 1) return t.yesterday;
  if (diffDays < 7) return t.daysAgo.replace('{n}', String(diffDays));

  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Default language
export const DEFAULT_LANGUAGE: Language = 'de';

// Language options for UI
export const LANGUAGE_OPTIONS: { id: Language; label: string; flag: string }[] = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
];
