'use client';

import { Category, MenuItem as MenuItemType, Restaurant } from '@/types/database';
import { MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { getItemImageUrl } from '@/lib/foodImages';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { DietaryFilters } from './shared/DietaryFilters';
import { MenuItem } from './shared/MenuItem';
import { AllergenLegend } from './shared/AllergenLegend';
import { useState } from 'react';

interface ModernGridLayoutProps {
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

export function ModernGridLayout({
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
}: ModernGridLayoutProps) {
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

      {/* Menu Content - 2 Column Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {displayedCategories.map((category) => {
          const categoryItems = items
            .filter((item) => item.category_id === category.id)
            .filter(filterItem)
            .sort((a, b) => a.position - b.position);

          if (categoryItems.length === 0 && activeFilters.size === 0) return null;

          const categoryName = getLocalizedCategoryName(category, language);

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              ref={(el) => {
                if (el) categoryRefs.current.set(category.id, el);
              }}
              className="mb-12 scroll-mt-40"
            >
              {/* Category Header */}
              <div className="mb-6">
                <h2
                  className="text-2xl font-bold flex items-center gap-2"
                  style={{ color: theme.styles.primary }}
                >
                  <span
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: theme.styles.primary }}
                  />
                  {categoryName}
                </h2>
              </div>

              {/* Menu Items - 2 Column Grid */}
              {categoryItems.length === 0 && activeFilters.size > 0 ? (
                <div className="py-8 text-center text-sm col-span-full" style={{ color: theme.styles.textMuted }}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryItems.map((item) => {
                    const imageUrl = getItemImageUrl(item, restaurant.auto_images !== false);
                    return (
                      <MenuItem
                        key={item.id}
                        item={item}
                        theme={theme}
                        language={language}
                        variant="grid"
                        imageUrl={imageUrl}
                        showDescription={template.density.showDescription}
                        showAllergens={template.density.showAllergens}
                        showBadges={template.density.showBadges}
                        selectedAllergen={selectedAllergen}
                        onAllergenClick={(id) => setSelectedAllergen(selectedAllergen === id ? null : id)}
                        getLocalizedName={getLocalizedName}
                        getLocalizedDescription={getLocalizedDescription}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Allergen Legend */}
        {usedAllergens.length > 0 && (
          <div className="mt-8">
            <AllergenLegend
              allergens={usedAllergens}
              theme={theme}
              language={language}
              variant="collapsible"
              selectedAllergen={selectedAllergen}
            />
          </div>
        )}
      </main>
    </div>
  );
}
