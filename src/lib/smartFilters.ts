import { MenuItem } from '@/types/database';
import { SmartFilters } from '@/components/MenuView/filters/SmartFilterBar';

/**
 * Apply smart filters to menu items
 */
export function applySmartFilters(items: MenuItem[], filters: SmartFilters): MenuItem[] {
  let filtered = [...items];

  // Price range filter
  filtered = filtered.filter(
    item => item.price >= filters.priceRange.min && item.price <= filters.priceRange.max
  );

  // Dietary filters
  if (filters.dietary.size > 0) {
    filtered = filtered.filter(item => {
      if (filters.dietary.has('vegetarian') && !item.is_vegetarian && !item.is_vegan) return false;
      if (filters.dietary.has('vegan') && !item.is_vegan) return false;
      if (filters.dietary.has('glutenFree') && item.allergens?.includes('gluten')) return false;
      if (filters.dietary.has('noNuts') &&
          (item.allergens?.includes('peanuts') || item.allergens?.includes('nuts'))) return false;
      return true;
    });
  }

  // Meal time filters (based on tags or special fields)
  if (filters.mealTime.size > 0) {
    filtered = filtered.filter(item => {
      // Check if item has relevant tags
      const itemTags = (item.tags || []).map(t => t.toLowerCase());
      return Array.from(filters.mealTime).some(time =>
        itemTags.includes(time) ||
        item.name.toLowerCase().includes(time)
      );
    });
  }

  // Spice level filter
  if (filters.spiceLevel.max < 5) {
    filtered = filtered.filter(item =>
      !item.spice_level || item.spice_level <= filters.spiceLevel.max
    );
  }

  // Preparation time filter
  if (filters.preparationTime.max < 120) {
    filtered = filtered.filter(item =>
      !item.preparation_time || item.preparation_time <= filters.preparationTime.max
    );
  }

  // Calories filter
  if (filters.calories.max < 2000) {
    filtered = filtered.filter(item =>
      !item.calories || item.calories <= filters.calories.max
    );
  }

  // Tag filters
  if (filters.tags.size > 0) {
    filtered = filtered.filter(item => {
      const itemTags = new Set(item.tags || []);
      return Array.from(filters.tags).some(tag => itemTags.has(tag));
    });
  }

  // Sort
  filtered = sortItems(filtered, filters.sortBy);

  return filtered;
}

/**
 * Sort menu items by specified criteria
 */
function sortItems(items: MenuItem[], sortBy: SmartFilters['sortBy']): MenuItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);

    case 'popularity':
      return sorted.sort((a, b) => {
        // Prioritize special > popular > recommended > new
        if (a.is_special !== b.is_special) return a.is_special ? -1 : 1;
        if (a.is_popular !== b.is_popular) return a.is_popular ? -1 : 1;
        if (a.is_recommended !== b.is_recommended) return a.is_recommended ? -1 : 1;
        if (a.is_new !== b.is_new) return a.is_new ? -1 : 1;
        return a.position - b.position;
      });

    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'preparation-time':
      return sorted.sort((a, b) => {
        const timeA = a.preparation_time || 999;
        const timeB = b.preparation_time || 999;
        return timeA - timeB;
      });

    case 'calories':
      return sorted.sort((a, b) => {
        const calA = a.calories || 9999;
        const calB = b.calories || 9999;
        return calA - calB;
      });

    default:
      return sorted;
  }
}

/**
 * Get default smart filters
 */
export function getDefaultSmartFilters(items: MenuItem[]): SmartFilters {
  const prices = items.map(item => item.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;

  return {
    priceRange: { min: minPrice, max: maxPrice },
    dietary: new Set(),
    mealTime: new Set(),
    spiceLevel: { min: 0, max: 5 },
    preparationTime: { max: 120 },
    calories: { max: 2000 },
    tags: new Set(),
    sortBy: 'popularity',
  };
}

/**
 * Get contextual filter suggestions based on time of day
 */
export function getContextualFilterSuggestions(): Partial<SmartFilters> {
  const hour = new Date().getHours();
  const mealTime = new Set<string>();

  if (hour < 11) {
    mealTime.add('breakfast');
    mealTime.add('brunch');
  } else if (hour < 15) {
    mealTime.add('lunch');
  } else if (hour < 18) {
    mealTime.add('snack');
  } else {
    mealTime.add('dinner');
  }

  return { mealTime };
}
