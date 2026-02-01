'use client';

import { Category } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { isGradient } from '@/lib/themes';

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string;
  filterCategory?: string | null;
  onCategoryClick: (categoryId: string) => void;
  theme: ThemeConfig;
  language: Language;
  variant?: 'pills' | 'tabs' | 'sidebar';
  isEmbedded?: boolean;
  onShowAll?: () => void;
  tabsRef?: React.RefObject<HTMLDivElement>;
  getCategoryName: (category: Category, lang: Language) => string;
}

export function CategoryNavigation({
  categories,
  activeCategory,
  filterCategory,
  onCategoryClick,
  theme,
  language,
  variant = 'pills', // eslint-disable-line @typescript-eslint/no-unused-vars
  isEmbedded = false,
  onShowAll,
  tabsRef,
  getCategoryName,
}: CategoryNavigationProps) {
  const t = getTranslation(language);
  const styles = theme.styles;

  if (categories.length === 0) return null;

  return (
    <div
      ref={tabsRef}
      className="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide md:px-6 md:justify-center"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* "Alle" button for embedded mode when filtering is active */}
      {isEmbedded && filterCategory && onShowAll && (
        <button
          onClick={onShowAll}
          className="px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 flex-shrink-0 touch-manipulation hover:scale-102 active:scale-95"
          style={{
            backgroundColor: isGradient(styles.pillBg) ? undefined : styles.pillBg,
            backgroundImage: isGradient(styles.pillBg) ? styles.pillBg : undefined,
            color: styles.pillText,
            boxShadow: `inset 0 0 0 1.5px ${styles.border}`,
          }}
        >
          ← {t.allCategories}
        </button>
      )}
      {categories.map((category) => {
        // In embedded mode: show active state based on filter, not scroll position
        const isActive = isEmbedded
          ? filterCategory === category.id
          : activeCategory === category.id;
        return (
          <button
            key={category.id}
            data-category={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 flex-shrink-0 touch-manipulation ${
              isActive ? 'scale-105' : 'hover:scale-102 active:scale-95'
            }`}
            style={isActive ? {
              background: styles.pillActiveBg,
              color: styles.pillActiveText,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            } : {
              backgroundColor: isGradient(styles.pillBg) ? undefined : styles.pillBg,
              backgroundImage: isGradient(styles.pillBg) ? styles.pillBg : undefined,
              color: styles.pillText,
              boxShadow: `inset 0 0 0 1.5px ${styles.border}`,
            }}
          >
            {getCategoryName(category, language)}
          </button>
        );
      })}
    </div>
  );
}
