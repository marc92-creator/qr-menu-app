'use client';

import { Category, MenuItem as MenuItemType, Restaurant, MenuSchedule } from '@/types/database';
import { MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { getItemImageByStrategy } from '@/lib/imageService';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { MenuItem } from './shared/MenuItem';
import { AllergenLegend } from './shared/AllergenLegend';
import { EnhancedFilterBar } from './EnhancedFilterBar';
import { NutritionalInfo } from './Traditional/NutritionalInfo';
import { SpiceLevelIndicator } from './Traditional/SpiceLevelIndicator';
import { PortionSizeDisplay } from './Traditional/PortionSizeDisplay';
import { PrepTimeBadge } from './Traditional/PrepTimeBadge';
import { ScheduleIndicator } from './shared/ScheduleIndicator';
import { useHeaderVisibility } from '@/hooks/useHeaderVisibility';
import { useState } from 'react';

interface TraditionalLayoutProps {
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
  activeSchedule?: MenuSchedule | null;
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

export function TraditionalLayout({
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
  activeSchedule,
}: TraditionalLayoutProps) {
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

  const filters = useMenuFilters({ restaurantSlug: restaurant.slug });
  const { filterItem, hasActiveFilters, clearAll } = filters;

  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const isFilterBarVisible = useHeaderVisibility(100);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(items.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Filter displayed categories based on embedded mode
  const displayedCategories = isEmbedded && filterCategory
    ? sortedCategories.filter(cat => cat.id === filterCategory)
    : sortedCategories;

  // Template config flags for Traditional layout
  const showNutritionalInfo = restaurant.template_config?.showNutritionalInfo !== false;
  const showSpiceLevel = restaurant.template_config?.showSpiceLevel !== false;
  const showPortionSizes = restaurant.template_config?.showPortionSizes !== false;

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

        {/* Active Schedule Indicator */}
        {activeSchedule && (
          <div className="px-4 py-2">
            <ScheduleIndicator schedule={activeSchedule} theme={theme} />
          </div>
        )}

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

        {/* Enhanced Filters with Search, Dietary, and Allergen Filters - Hide on Scroll */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden ${
            isFilterBarVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <EnhancedFilterBar
            filters={filters}
            theme={theme}
            language={language}
            showSearch={true}
            showDietaryFilters={true}
            showAllergenButton={true}
          />
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-2xl mx-auto px-4 py-4 md:px-6">
        {sortedCategories.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-5xl mb-4">🍽️</div>
            <p style={{ color: theme.styles.textMuted }}>{t.noMenuAvailable}</p>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            {displayedCategories.map((category) => {
              const categoryName = getLocalizedCategoryName(category, language);
              const categoryItems = items
                .filter((item) => item.category_id === category.id)
                .filter((item) => filterItem(item, categoryName))
                .sort((a, b) => {
                  // Sort: specials first, then by position
                  if (a.is_special && !b.is_special) return -1;
                  if (!a.is_special && b.is_special) return 1;
                  return a.position - b.position;
                });

              if (categoryItems.length === 0 && !hasActiveFilters) return null;

              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  ref={(el) => {
                    if (el) categoryRefs.current.set(category.id, el);
                  }}
                  className="scroll-mt-40"
                >
                  {/* Category Header */}
                  <div className="py-3 -mx-4 px-4 md:-mx-6 md:px-6">
                    <h2
                      className="text-lg font-bold flex items-center gap-2"
                      style={{ color: theme.styles.text }}
                    >
                      <span
                        className="w-1 h-5 rounded-full"
                        style={{ backgroundColor: theme.styles.primary }}
                      />
                      {categoryName}
                    </h2>
                  </div>

                  {/* Items */}
                  {categoryItems.length === 0 && hasActiveFilters ? (
                    <div className="py-8 text-center text-sm" style={{ color: theme.styles.textMuted }}>
                      <p>{t.noMatchingItems}</p>
                      <button
                        onClick={clearAll}
                        className="mt-2 text-sm font-medium hover:underline"
                        style={{ color: theme.styles.primary }}
                      >
                        {t.clearFilters}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {categoryItems.map((item) => {
                        const imageResult = getItemImageByStrategy(item, restaurant.image_strategy || 'ghibli', restaurant.auto_images !== false);
                        const imageUrl = imageResult?.url || null;
                        const hasExtras = (showSpiceLevel && item.spice_level) ||
                                         (showPortionSizes && item.portion_size) ||
                                         item.preparation_time;

                        return (
                          <div key={item.id} className="space-y-0">
                            <MenuItem
                              item={item}
                              theme={theme}
                              language={language}
                              variant="card"
                              imageUrl={imageUrl}
                              showDescription={template.density.showDescription}
                              showAllergens={template.density.showAllergens}
                              showBadges={template.density.showBadges}
                              selectedAllergen={selectedAllergen}
                              onAllergenClick={(id) => setSelectedAllergen(selectedAllergen === id ? null : id)}
                              getLocalizedName={getLocalizedName}
                              getLocalizedDescription={getLocalizedDescription}
                            />

                            {/* Traditional Template Extras */}
                            {hasExtras && (
                              <div
                                className="flex flex-wrap items-center gap-2 px-3 pb-3 -mt-1 rounded-b-lg"
                                style={{ backgroundColor: theme.styles.cardBg }}
                              >
                                {showSpiceLevel && item.spice_level && item.spice_level > 0 && (
                                  <SpiceLevelIndicator
                                    level={item.spice_level}
                                    theme={theme}
                                  />
                                )}
                                {showPortionSizes && item.portion_size && (
                                  <PortionSizeDisplay
                                    portionSize={item.portion_size}
                                    theme={theme}
                                  />
                                )}
                                {item.preparation_time && item.preparation_time > 0 && (
                                  <PrepTimeBadge
                                    minutes={item.preparation_time}
                                    theme={theme}
                                    language={language}
                                  />
                                )}
                              </div>
                            )}

                            {/* Nutritional Info */}
                            {showNutritionalInfo && item.calories && (
                              <div
                                className="px-3 pb-3 -mt-1 rounded-b-lg"
                                style={{ backgroundColor: theme.styles.cardBg }}
                              >
                                <NutritionalInfo item={item} theme={theme} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
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
          </div>
        )}
      </main>
    </div>
  );
}
