'use client';

import { useState } from 'react';
import { MenuItem } from '@/types/database';

export type FilterType = 'vegetarian' | 'vegan' | 'glutenFree' | 'noNuts';

/**
 * Hook for managing dietary filter state and item filtering
 */
export function useMenuFilters() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set());

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) next.delete(filter);
      else next.add(filter);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const filterItem = (item: MenuItem): boolean => {
    if (activeFilters.size === 0) return true;
    if (activeFilters.has('vegetarian') && !item.is_vegetarian && !item.is_vegan) return false;
    if (activeFilters.has('vegan') && !item.is_vegan) return false;
    if (activeFilters.has('glutenFree') && item.allergens?.includes('gluten')) return false;
    if (activeFilters.has('noNuts') &&
        (item.allergens?.includes('peanuts') || item.allergens?.includes('nuts'))) return false;
    return true;
  };

  return {
    activeFilters,
    toggleFilter,
    clearFilters,
    filterItem,
  };
}
