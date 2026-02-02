'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { MenuFiltersReturn, FilterType } from '@/hooks/useMenuFilters';
import { AllergenFilterModal } from '../AllergenFilterModal';
import { UniversalSearchBar } from '../UniversalSearchBar';
import { haptics } from '@/lib/haptics';

interface HiddenFilterTriggerProps {
  filters: MenuFiltersReturn;
  theme: ThemeConfig;
  language: Language;
}

const DIETARY_FILTERS: { id: FilterType; icon: string; labelKey: keyof ReturnType<typeof getTranslation> }[] = [
  { id: 'vegetarian', icon: '🥬', labelKey: 'filterVegetarian' },
  { id: 'vegan', icon: '🌱', labelKey: 'filterVegan' },
  { id: 'glutenFree', icon: '🌾', labelKey: 'filterGlutenFree' },
  { id: 'noNuts', icon: '🥜', labelKey: 'filterNoNuts' },
];

export function HiddenFilterTrigger({
  filters,
  theme,
  language,
}: HiddenFilterTriggerProps) {
  const t = getTranslation(language);
  const styles = theme.styles;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);

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

  const handleTriggerClick = () => {
    haptics.tap();
    setIsExpanded(!isExpanded);
  };

  const handleToggleFilter = (filter: FilterType) => {
    haptics.tap();
    toggleFilter(filter);
  };

  return (
    <>
      <div className="px-4 py-2">
        {/* Collapsed State - Just the icon trigger */}
        {!isExpanded ? (
          <div className="flex justify-end">
            <button
              onClick={handleTriggerClick}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95"
              style={{
                backgroundColor: activeFilterCount > 0 ? styles.primaryLight : styles.pillBg,
                color: activeFilterCount > 0 ? styles.primary : styles.textMuted,
                border: activeFilterCount > 0 ? `1px solid ${styles.primary}` : `1px solid ${styles.border}`,
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {activeFilterCount > 0 ? (
                <span>{language === 'de' ? `${activeFilterCount} Filter` : `${activeFilterCount} Filters`}</span>
              ) : (
                <span>{language === 'de' ? 'Filter' : 'Filters'}</span>
              )}

              {/* Badge */}
              {activeFilterCount > 0 && (
                <span
                  className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: styles.primary,
                    color: '#fff',
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        ) : (
          /* Expanded State - Full filter bar */
          <div
            className="rounded-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
              backgroundColor: styles.surface,
              border: `1px solid ${styles.border}`,
            }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium" style={{ color: styles.text }}>
                {language === 'de' ? 'Filter' : 'Filters'}
              </span>
              <button
                onClick={handleTriggerClick}
                className="p-1 rounded-lg hover:bg-black/5 transition-colors touch-manipulation"
                style={{ color: styles.textMuted }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <UniversalSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                theme={theme}
                language={language}
                variant="inline"
              />
            </div>

            {/* Dietary Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {DIETARY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleToggleFilter(filter.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all touch-manipulation active:scale-95"
                  style={{
                    backgroundColor: activeFilters.has(filter.id) ? styles.primary : styles.pillBg,
                    color: activeFilters.has(filter.id) ? '#fff' : styles.text,
                    border: `1px solid ${activeFilters.has(filter.id) ? styles.primary : styles.border}`,
                  }}
                >
                  <span>{filter.icon}</span>
                  {t[filter.labelKey]}
                </button>
              ))}
            </div>

            {/* Allergen Button + Clear */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  haptics.tap();
                  setIsAllergenModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all touch-manipulation active:scale-95"
                style={{
                  backgroundColor: excludeAllergens.size > 0 ? styles.primary : styles.pillBg,
                  color: excludeAllergens.size > 0 ? '#fff' : styles.text,
                  border: `1px solid ${excludeAllergens.size > 0 ? styles.primary : styles.border}`,
                }}
              >
                <span>⚠️</span>
                <span>{language === 'de' ? 'Allergene' : 'Allergens'}</span>
                {excludeAllergens.size > 0 && (
                  <span
                    className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {excludeAllergens.size}
                  </span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    haptics.tap();
                    clearAll();
                  }}
                  className="ml-auto text-xs font-medium touch-manipulation"
                  style={{ color: styles.primary }}
                >
                  {t.clearFilters}
                </button>
              )}
            </div>
          </div>
        )}
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
