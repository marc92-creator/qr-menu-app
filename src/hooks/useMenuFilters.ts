'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { MenuItem } from '@/types/database';
import { AllergenId } from '@/lib/allergens';

export type FilterType = 'vegetarian' | 'vegan' | 'glutenFree' | 'noNuts';

interface UseMenuFiltersOptions {
  restaurantSlug?: string;
  persistAllergens?: boolean;
}

/**
 * Hook for managing dietary filter state, allergen exclusions, and search
 */
export function useMenuFilters(options: UseMenuFiltersOptions = {}) {
  const { restaurantSlug, persistAllergens = true } = options;

  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set());
  const [excludeAllergens, setExcludeAllergens] = useState<Set<AllergenId>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Load persisted allergen preferences from localStorage
  useEffect(() => {
    if (!persistAllergens || typeof window === 'undefined') return;

    const storageKey = restaurantSlug
      ? `menu-allergens-${restaurantSlug}`
      : 'menu-allergens-global';

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const allergens = JSON.parse(stored) as string[];
        setExcludeAllergens(new Set(allergens as AllergenId[]));
      }
    } catch {
      // Ignore parsing errors
    }
  }, [restaurantSlug, persistAllergens]);

  // Persist allergen preferences to localStorage
  useEffect(() => {
    if (!persistAllergens || typeof window === 'undefined') return;

    const storageKey = restaurantSlug
      ? `menu-allergens-${restaurantSlug}`
      : 'menu-allergens-global';

    if (excludeAllergens.size > 0) {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(excludeAllergens)));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [excludeAllergens, restaurantSlug, persistAllergens]);

  const toggleFilter = useCallback((filter: FilterType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) next.delete(filter);
      else next.add(filter);
      return next;
    });
  }, []);

  const toggleAllergen = useCallback((allergenId: AllergenId) => {
    setExcludeAllergens(prev => {
      const next = new Set(prev);
      if (next.has(allergenId)) next.delete(allergenId);
      else next.add(allergenId);
      return next;
    });
  }, []);

  const setAllergens = useCallback((allergenIds: AllergenId[]) => {
    setExcludeAllergens(new Set(allergenIds));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, []);

  const clearAllergens = useCallback(() => {
    setExcludeAllergens(new Set());
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const clearAll = useCallback(() => {
    setActiveFilters(new Set());
    setExcludeAllergens(new Set());
    setSearchQuery('');
  }, []);

  // Normalize text for search (handle umlauts and case)
  const normalizeText = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss');
  }, []);

  const filterItem = useCallback((item: MenuItem, categoryName?: string): boolean => {
    // Dietary filters
    if (activeFilters.size > 0) {
      if (activeFilters.has('vegetarian') && !item.is_vegetarian && !item.is_vegan) return false;
      if (activeFilters.has('vegan') && !item.is_vegan) return false;
      if (activeFilters.has('glutenFree') && item.allergens?.includes('gluten')) return false;
      if (activeFilters.has('noNuts') &&
          (item.allergens?.includes('peanuts') || item.allergens?.includes('nuts'))) return false;
    }

    // Allergen exclusions
    if (excludeAllergens.size > 0 && item.allergens) {
      for (const allergen of item.allergens) {
        if (excludeAllergens.has(allergen as AllergenId)) {
          return false;
        }
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery.trim());
      const searchableTexts = [
        item.name,
        item.name_en,
        item.description,
        item.description_en,
        categoryName,
        item.item_number?.toString(),
      ].filter(Boolean) as string[];

      const matchFound = searchableTexts.some(text =>
        normalizeText(text).includes(normalizedQuery)
      );

      if (!matchFound) return false;
    }

    return true;
  }, [activeFilters, excludeAllergens, searchQuery, normalizeText]);

  // Count active filters for badge display
  const activeFilterCount = useMemo(() => {
    return activeFilters.size + excludeAllergens.size + (searchQuery.trim() ? 1 : 0);
  }, [activeFilters.size, excludeAllergens.size, searchQuery]);

  const hasActiveFilters = activeFilterCount > 0;

  return {
    // Dietary filters
    activeFilters,
    toggleFilter,
    clearFilters,

    // Allergen exclusions
    excludeAllergens,
    toggleAllergen,
    setAllergens,
    clearAllergens,

    // Search
    searchQuery,
    setSearchQuery,
    clearSearch,

    // Combined
    filterItem,
    clearAll,
    activeFilterCount,
    hasActiveFilters,
  };
}

// Type for the return value of useMenuFilters
export type MenuFiltersReturn = ReturnType<typeof useMenuFilters>;
