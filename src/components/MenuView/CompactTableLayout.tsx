'use client';

import { Category, MenuItem as MenuItemType, Restaurant } from '@/types/database';
import { getCategoryIcon, MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { DietaryFilters } from './shared/DietaryFilters';
import { MenuItem } from './shared/MenuItem';
import { AllergenLegend } from './shared/AllergenLegend';
import { useState } from 'react';

interface CompactTableLayoutProps {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItemType[];
  template: MenuTemplate;
  language: Language;
  theme: ThemeConfig;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDemo?: boolean;
  isEmbedded?: boolean;
}

// Get localized category name
const getLocalizedCategoryName = (category: Category, lang: Language): string => {
  if (lang === 'de') {
    return category.name;
  }
  if (category.name_en && category.name_en.trim() !== '') {
    return category.name_en;
  }
  return category.name;
};

// Get localized item name
const getLocalizedName = (item: MenuItemType, lang: Language): string => {
  if (lang === 'de') {
    return item.name;
  }
  if (item.name_en && item.name_en.trim() !== '') {
    return item.name_en;
  }
  return item.name;
};

// Get localized item description
const getLocalizedDescription = (item: MenuItemType, lang: Language): string | null => {
  if (!item.description) return null;
  if (lang === 'de') {
    return item.description;
  }
  if (item.description_en && item.description_en.trim() !== '') {
    return item.description_en;
  }
  return item.description;
};

export function CompactTableLayout({
  restaurant,
  categories,
  items,
  template,
  language,
  theme,
  currentLang,
  onLanguageChange,
  isDemo = false,
  isEmbedded = false,
}: CompactTableLayoutProps) {
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);
  const t = getTranslation(language);

  // Use our custom hooks
  const {
    activeCategory,
    filterCategory,
    setFilterCategory,
    tabsRef,
    categoryRefs,
    scrollToCategory,
  } = useMenuNavigation(sortedCategories, isEmbedded);

  const {
    activeFilters,
    toggleFilter,
    clearFilters,
    filterItem,
  } = useMenuFilters();

  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(items.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Filter displayed categories based on embedded mode
  const displayedCategories = isEmbedded && filterCategory
    ? sortedCategories.filter(cat => cat.id === filterCategory)
    : sortedCategories;

  return (
    <div style={{ backgroundColor: theme.styles.background, color: theme.styles.text }} className="min-h-screen">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-20 backdrop-blur-md shadow-sm"
        style={{
          background: theme.styles.headerBg,
          borderBottom: `1px solid ${theme.styles.headerBorder}`,
        }}
      >
        {/* Restaurant Header Card */}
        <RestaurantHeader
          restaurant={restaurant}
          theme={theme}
          language={language}
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          variant="card"
          isDemo={isDemo}
        />

        {/* Category Navigation Pills */}
        {sortedCategories.length > 0 && (
          <CategoryNavigation
            categories={sortedCategories}
            activeCategory={activeCategory}
            filterCategory={filterCategory}
            onCategoryClick={scrollToCategory}
            theme={theme}
            language={language}
            variant="pills"
            isEmbedded={isEmbedded}
            onShowAll={() => setFilterCategory(null)}
            tabsRef={tabsRef}
            getCategoryName={getLocalizedCategoryName}
          />
        )}

        {/* Dietary Filters */}
        <DietaryFilters
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
          theme={theme}
          language={language}
          variant="chips"
        />
      </header>

      {/* Menu Content - Compact Table Style */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {displayedCategories.map((category) => {
          const categoryItems = items
            .filter((item) => item.category_id === category.id)
            .filter(filterItem)
            .sort((a, b) => a.position - b.position);

          if (categoryItems.length === 0 && activeFilters.size === 0) return null;

          const categoryIcon = getCategoryIcon(category.name);
          const categoryName = getLocalizedCategoryName(category, language);

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              ref={(el) => {
                if (el) categoryRefs.current.set(category.id, el);
              }}
              className="mb-8 scroll-mt-40"
            >
              {/* Category Header - Compact with Icon */}
              <div
                className="flex items-center gap-2 mb-3 pb-2 border-b"
                style={{ borderColor: theme.styles.border }}
              >
                <span className="text-2xl">{categoryIcon}</span>
                <h2
                  className="text-lg font-bold"
                  style={{ color: theme.styles.primary }}
                >
                  {categoryName}
                </h2>
              </div>

              {/* Menu Items - Compact Table Rows */}
              {categoryItems.length === 0 && activeFilters.size > 0 ? (
                <div className="py-6 text-center text-sm" style={{ color: theme.styles.textMuted }}>
                  <p>{t.noMatchingItems}</p>
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-sm font-medium hover:underline"
                    style={{ color: theme.styles.primary }}
                  >
                    {t.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {categoryItems.map((item, itemIndex) => (
                    <div key={item.id} className="flex">
                      {/* Optional numbering column */}
                      <span
                        className="text-xs font-medium mr-3 mt-2 flex-shrink-0 w-6 text-right"
                        style={{ color: theme.styles.textMuted }}
                      >
                        {itemIndex + 1}.
                      </span>
                      <div className="flex-1">
                        <MenuItem
                          item={item}
                          theme={theme}
                          language={language}
                          variant="table-row"
                          showDescription={template.density.showDescription}
                          showAllergens={false} // Keep compact - no allergens inline
                          showBadges={template.density.showBadges}
                          selectedAllergen={selectedAllergen}
                          onAllergenClick={(id) => setSelectedAllergen(selectedAllergen === id ? null : id)}
                          getLocalizedName={getLocalizedName}
                          getLocalizedDescription={getLocalizedDescription}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Allergen Legend - Inline for compact layout */}
        {usedAllergens.length > 0 && (
          <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: theme.styles.surfaceHover }}>
            <AllergenLegend
              allergens={usedAllergens}
              theme={theme}
              language={language}
              variant="inline"
              selectedAllergen={selectedAllergen}
            />
          </div>
        )}
      </main>
    </div>
  );
}
