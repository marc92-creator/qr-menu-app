'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { FilterType, MenuFiltersReturn } from '@/hooks/useMenuFilters';
import { AllergenFilterModal } from './AllergenFilterModal';
import { UniversalSearchBar } from './UniversalSearchBar';

interface EnhancedFilterBarProps {
  filters: MenuFiltersReturn;
  theme: ThemeConfig;
  language: Language;
  showSearch?: boolean;
  showDietaryFilters?: boolean;
  showAllergenButton?: boolean;
  variant?: 'full' | 'compact';
}

const DIETARY_FILTERS: { id: FilterType; icon: string; labelKey: keyof ReturnType<typeof getTranslation> }[] = [
  { id: 'vegetarian', icon: '🥬', labelKey: 'filterVegetarian' },
  { id: 'vegan', icon: '🌱', labelKey: 'filterVegan' },
  { id: 'glutenFree', icon: '🌾', labelKey: 'filterGlutenFree' },
  { id: 'noNuts', icon: '🥜', labelKey: 'filterNoNuts' },
];

export function EnhancedFilterBar({
  filters,
  theme,
  language,
  showSearch = true,
  showDietaryFilters = true,
  showAllergenButton = true,
  variant = 'full',
}: EnhancedFilterBarProps) {
  const t = getTranslation(language);
  const styles = theme.styles;
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const {
    activeFilters,
    toggleFilter,
    excludeAllergens,
    toggleAllergen,
    clearAllergens,
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    clearAll,
  } = filters;

  // Compact variant - just show a combined filter button
  if (variant === 'compact') {
    return (
      <>
        <div className="flex items-center gap-2 px-4 py-2">
          {/* Search toggle */}
          {showSearch && (
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all touch-manipulation active:scale-95 ${
                searchQuery ? 'ring-2 ring-offset-1 ring-emerald-500' : ''
              }`}
              style={{
                backgroundColor: searchQuery ? styles.primary : styles.pillBg,
                color: searchQuery ? '#fff' : styles.text,
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && <span className="max-w-20 truncate">{searchQuery}</span>}
            </button>
          )}

          {/* Allergen button */}
          {showAllergenButton && (
            <button
              onClick={() => setIsAllergenModalOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all touch-manipulation active:scale-95"
              style={{
                backgroundColor: excludeAllergens.size > 0 ? styles.primary : styles.pillBg,
                color: excludeAllergens.size > 0 ? '#fff' : styles.text,
              }}
            >
              <span>⚠️</span>
              <span>{t.allergens}</span>
              {excludeAllergens.size > 0 && (
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  {excludeAllergens.size}
                </span>
              )}
            </button>
          )}

          {/* Clear all */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="ml-auto text-sm touch-manipulation"
              style={{ color: styles.primary }}
            >
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Expanded search */}
        {isSearchExpanded && (
          <div className="px-4 pb-3">
            <UniversalSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              theme={theme}
              language={language}
              variant="inline"
            />
          </div>
        )}

        <AllergenFilterModal
          isOpen={isAllergenModalOpen}
          onClose={() => setIsAllergenModalOpen(false)}
          selectedAllergens={excludeAllergens}
          onToggleAllergen={toggleAllergen}
          onClearAll={clearAllergens}
          theme={theme}
          language={language}
        />
      </>
    );
  }

  // Full variant
  return (
    <>
      <div className="space-y-3">
        {/* Search bar */}
        {showSearch && (
          <div className="px-4">
            <UniversalSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              theme={theme}
              language={language}
              variant="inline"
            />
          </div>
        )}

        {/* Filter pills row */}
        <div
          className="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Allergen filter button */}
          {showAllergenButton && (
            <button
              onClick={() => setIsAllergenModalOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 touch-manipulation active:scale-95"
              style={{
                background: excludeAllergens.size > 0 ? styles.primary : 'transparent',
                color: excludeAllergens.size > 0 ? '#fff' : styles.text,
                border: `1px solid ${excludeAllergens.size > 0 ? styles.primary : styles.border}`,
              }}
            >
              <span>⚠️</span>
              <span>{t.allergens}</span>
              {excludeAllergens.size > 0 && (
                <span
                  className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: excludeAllergens.size > 0 ? 'rgba(255,255,255,0.3)' : styles.primary,
                    color: excludeAllergens.size > 0 ? '#fff' : '#fff',
                  }}
                >
                  {excludeAllergens.size}
                </span>
              )}
            </button>
          )}

          {/* Divider */}
          {showAllergenButton && showDietaryFilters && (
            <div
              className="w-px h-6 my-auto flex-shrink-0"
              style={{ backgroundColor: styles.border }}
            />
          )}

          {/* Dietary filter pills */}
          {showDietaryFilters &&
            DIETARY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 touch-manipulation active:scale-95"
                style={{
                  background: activeFilters.has(filter.id) ? styles.primary : 'transparent',
                  color: activeFilters.has(filter.id) ? '#fff' : styles.text,
                  border: `1px solid ${activeFilters.has(filter.id) ? styles.primary : styles.border}`,
                }}
              >
                <span>{filter.icon}</span>
                {t[filter.labelKey]}
              </button>
            ))}

          {/* Clear all button */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 touch-manipulation active:scale-95"
              style={{
                background: 'transparent',
                color: styles.primary,
                border: `1px dashed ${styles.primary}`,
              }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Allergen Modal */}
      <AllergenFilterModal
        isOpen={isAllergenModalOpen}
        onClose={() => setIsAllergenModalOpen(false)}
        selectedAllergens={excludeAllergens}
        onToggleAllergen={toggleAllergen}
        onClearAll={clearAllergens}
        theme={theme}
        language={language}
      />
    </>
  );
}
