import { MenuItem, Category } from '@/types/database';
import { Language } from '@/lib/translations';

/**
 * Get localized name for a menu item based on language
 * Falls back: requested language → English → German (default)
 */
export function getLocalizedItemName(item: MenuItem, lang: Language): string {
  if (lang === 'de') return item.name;

  // Try the requested language first
  const langField = `name_${lang}` as keyof MenuItem;
  const localizedName = item[langField] as string | null | undefined;
  if (localizedName && localizedName.trim() !== '') {
    return localizedName;
  }

  // Fall back to English
  if (item.name_en && item.name_en.trim() !== '') {
    return item.name_en;
  }

  // Fall back to German (default)
  return item.name;
}

/**
 * Get localized description for a menu item based on language
 * Falls back: requested language → English → German (default)
 */
export function getLocalizedItemDescription(item: MenuItem, lang: Language): string | null {
  if (!item.description) return null;

  if (lang === 'de') return item.description;

  // Try the requested language first
  const langField = `description_${lang}` as keyof MenuItem;
  const localizedDesc = item[langField] as string | null | undefined;
  if (localizedDesc && localizedDesc.trim() !== '') {
    return localizedDesc;
  }

  // Fall back to English
  if (item.description_en && item.description_en.trim() !== '') {
    return item.description_en;
  }

  // Fall back to German (default)
  return item.description;
}

/**
 * Get localized name for a category based on language
 * Falls back: requested language → English → German (default)
 */
export function getLocalizedCategoryName(category: Category, lang: Language): string {
  if (lang === 'de') return category.name;

  // Try the requested language first
  const langField = `name_${lang}` as keyof Category;
  const localizedName = category[langField] as string | null | undefined;
  if (localizedName && localizedName.trim() !== '') {
    return localizedName;
  }

  // Fall back to English
  if (category.name_en && category.name_en.trim() !== '') {
    return category.name_en;
  }

  // Fall back to German (default)
  return category.name;
}
