'use client';

import { Category, MenuItem as MenuItemType, Restaurant, MenuSchedule } from '@/types/database';
import { getCategoryIcon, MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { formatPrice } from '@/lib/utils';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { AllergenLegend } from './shared/AllergenLegend';
import { NumberBadge } from './Compact/NumberBadge';
import { SizeSelector } from './Compact/SizeSelector';
import { ScheduleIndicator } from './shared/ScheduleIndicator';
import { ThumbZoneFilterBar } from './filters/ThumbZoneFilterBar';
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
  activeSchedule,
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

  const filters = useMenuFilters({ restaurantSlug: restaurant.slug });
  const { filterItem, hasActiveFilters, clearAll } = filters;

  const [selectedAllergen] = useState<string | null>(null);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(items.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Filter displayed categories based on embedded mode
  const displayedCategories = isEmbedded && filterCategory
    ? sortedCategories.filter(cat => cat.id === filterCategory)
    : sortedCategories;

  // Template config
  const showItemNumbers = restaurant.template_config?.showItemNumbers !== false;
  const showSizes = restaurant.template_config?.showSizes !== false;

  // Generate global item numbers
  let globalItemNumber = 0;

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
      </header>

      {/* Menu Content - Compact Table Style */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {displayedCategories.map((category) => {
          const categoryName = getLocalizedCategoryName(category, language);
          const categoryItems = items
            .filter((item) => item.category_id === category.id)
            .filter((item) => filterItem(item, categoryName))
            .sort((a, b) => a.position - b.position);

          if (categoryItems.length === 0 && !hasActiveFilters) return null;

          const categoryIcon = getCategoryIcon(category.name);

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
              {categoryItems.length === 0 && hasActiveFilters ? (
                <div className="py-6 text-center text-sm" style={{ color: theme.styles.textMuted }}>
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
                <div className="space-y-1">
                  {categoryItems.map((item) => {
                    globalItemNumber++;
                    const itemNumber = item.item_number || globalItemNumber;
                    const itemName = getLocalizedName(item, language);
                    const itemDescription = getLocalizedDescription(item, language);

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 py-2 px-2 rounded-lg hover:bg-black/5 transition-colors"
                      >
                        {/* Item Number Badge */}
                        {showItemNumbers && (
                          <NumberBadge number={itemNumber} theme={theme} large />
                        )}

                        {/* Item Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              {/* Name with badges */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3
                                  className="font-semibold text-base"
                                  style={{ color: theme.styles.text }}
                                >
                                  {itemName}
                                </h3>
                                {item.is_sold_out && (
                                  <span
                                    className="px-1.5 py-0.5 rounded text-xs font-medium"
                                    style={{
                                      background: theme.styles.badgeSoldOutBg,
                                      color: theme.styles.badgeSoldOutText,
                                    }}
                                  >
                                    Ausverkauft
                                  </span>
                                )}
                                {item.is_vegan && (
                                  <span className="text-xs">🌱</span>
                                )}
                                {item.is_vegetarian && !item.is_vegan && (
                                  <span className="text-xs">🥬</span>
                                )}
                                {item.is_special && (
                                  <span className="text-xs">⭐</span>
                                )}
                              </div>

                              {/* Description */}
                              {template.density.showDescription && itemDescription && (
                                <p
                                  className="text-sm mt-0.5 line-clamp-1"
                                  style={{ color: theme.styles.textMuted }}
                                >
                                  {itemDescription}
                                </p>
                              )}
                            </div>

                            {/* Price or Sizes */}
                            <div className="flex-shrink-0 text-right">
                              {showSizes && item.sizes && Object.keys(item.sizes).length > 0 ? (
                                <SizeSelector sizes={item.sizes} theme={theme} />
                              ) : (
                                <span
                                  className="font-bold text-base"
                                  style={{ color: theme.styles.priceColor }}
                                >
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Addons preview */}
                          {item.addons && item.addons.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-2">
                              {item.addons.slice(0, 3).map((addon, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 rounded"
                                  style={{
                                    backgroundColor: theme.styles.surfaceHover,
                                    color: theme.styles.textMuted,
                                  }}
                                >
                                  + {addon.name} ({formatPrice(addon.price)})
                                </span>
                              ))}
                              {item.addons.length > 3 && (
                                <span
                                  className="text-xs"
                                  style={{ color: theme.styles.textMuted }}
                                >
                                  +{item.addons.length - 3} mehr
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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

        {/* Quick order hint */}
        {restaurant.template_config?.enableQuickOrder && (
          <div
            className="mt-6 p-4 rounded-lg text-center"
            style={{
              backgroundColor: theme.styles.primaryLight,
              border: `1px solid ${theme.styles.primary}`,
            }}
          >
            <p className="text-sm" style={{ color: theme.styles.primary }}>
              {language === 'de'
                ? 'Zum Bestellen einfach die Nummer nennen!'
                : 'Just tell us the number to order!'}
            </p>
          </div>
        )}
      </main>

      {/* Thumb Zone Filter Bar - Fixed at Bottom */}
      <ThumbZoneFilterBar
        filters={filters}
        theme={theme}
        language={language}
      />
    </div>
  );
}
