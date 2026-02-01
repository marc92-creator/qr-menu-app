'use client';

import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { FilterType } from '@/hooks/useMenuFilters';

interface DietaryFiltersProps {
  activeFilters: Set<FilterType>;
  onFilterToggle: (filter: FilterType) => void;
  theme: ThemeConfig;
  language: Language;
  variant?: 'chips' | 'pills' | 'compact';
}

const FILTER_DEFINITIONS = [
  { id: 'vegetarian' as FilterType, icon: '🥬', labelKey: 'filterVegetarian' as const },
  { id: 'vegan' as FilterType, icon: '🌱', labelKey: 'filterVegan' as const },
  { id: 'glutenFree' as FilterType, icon: '🌾', labelKey: 'filterGlutenFree' as const },
  { id: 'noNuts' as FilterType, icon: '🥜', labelKey: 'filterNoNuts' as const },
];

export function DietaryFilters({
  activeFilters,
  onFilterToggle,
  theme,
  language,
  variant = 'chips', // eslint-disable-line @typescript-eslint/no-unused-vars
}: DietaryFiltersProps) {
  const t = getTranslation(language);
  const styles = theme.styles;

  return (
    <div className="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide md:px-6 md:justify-center"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {FILTER_DEFINITIONS.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterToggle(filter.id)}
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
    </div>
  );
}
