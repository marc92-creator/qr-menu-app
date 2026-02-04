'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { MenuFiltersReturn, FilterType } from '@/hooks/useMenuFilters';
import { AllergenFilterModal } from '../AllergenFilterModal';
import { haptics } from '@/lib/haptics';

interface ThumbZoneFilterBarProps {
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

export function ThumbZoneFilterBar({
  filters,
  theme,
  language,
}: ThumbZoneFilterBarProps) {
  const t = getTranslation(language);
  const styles = theme.styles;
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

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

  const handleSearchSubmit = () => {
    setSearchQuery(localSearchQuery);
    setIsSearchExpanded(false);
  };

  const handleToggleFilter = (filter: FilterType) => {
    haptics.tap();
    toggleFilter(filter);
  };

  return (
    <>
      {/* Fixed Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t safe-area-bottom"
        style={{
          backgroundColor: `${styles.surface}f0`,
          borderColor: styles.border,
        }}
      >
        <div className="px-4 py-3">
          {/* Search Expanded State */}
          {isSearchExpanded ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder={t.searchPlaceholder}
                autoFocus
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                style={{
                  backgroundColor: styles.pillBg,
                  color: styles.text,
                  border: `1px solid ${styles.border}`,
                }}
              />
              <button
                onClick={handleSearchSubmit}
                className="p-2.5 rounded-xl touch-manipulation active:scale-95"
                style={{ backgroundColor: styles.primary }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsSearchExpanded(false);
                  setLocalSearchQuery('');
                }}
                className="p-2.5 rounded-xl touch-manipulation active:scale-95"
                style={{ backgroundColor: styles.pillBg }}
              >
                <svg className="w-5 h-5" style={{ color: styles.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {/* Search Button */}
              <button
                onClick={() => {
                  haptics.tap();
                  setLocalSearchQuery(searchQuery);
                  setIsSearchExpanded(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95 flex-shrink-0 ${
                  searchQuery ? 'ring-2 ring-offset-1' : ''
                }`}
                style={{
                  backgroundColor: searchQuery ? styles.primary : styles.pillBg,
                  color: searchQuery ? '#fff' : styles.text,
                  ...(searchQuery && { ringColor: styles.primary }),
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery ? (
                  <span className="max-w-16 truncate">{searchQuery}</span>
                ) : (
                  <span>{t.search}</span>
                )}
              </button>

              {/* Divider */}
              <div
                className="w-px h-6 flex-shrink-0"
                style={{ backgroundColor: styles.border }}
              />

              {/* Dietary Pills */}
              {DIETARY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleToggleFilter(filter.id)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95 flex-shrink-0"
                  style={{
                    backgroundColor: activeFilters.has(filter.id) ? styles.primary : styles.pillBg,
                    color: activeFilters.has(filter.id) ? '#fff' : styles.text,
                  }}
                >
                  <span>{filter.icon}</span>
                </button>
              ))}

              {/* Allergen Button */}
              <button
                onClick={() => {
                  haptics.tap();
                  setIsAllergenModalOpen(true);
                }}
                className="relative flex items-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95 flex-shrink-0"
                style={{
                  backgroundColor: excludeAllergens.size > 0 ? styles.primary : styles.pillBg,
                  color: excludeAllergens.size > 0 ? '#fff' : styles.text,
                }}
              >
                <span>⚠️</span>
                {excludeAllergens.size > 0 && (
                  <span
                    className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {excludeAllergens.size}
                  </span>
                )}
              </button>

              {/* Clear All */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    haptics.tap();
                    clearAll();
                  }}
                  className="flex items-center gap-1 px-3 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95 flex-shrink-0"
                  style={{
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
