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
import { MenuItem } from './shared/MenuItem';
import { AllergenLegend } from './shared/AllergenLegend';
import { EnhancedFilterBar } from './EnhancedFilterBar';
import { FocusModeToggle } from './Minimalist/FocusModeToggle';
import { PhilosophyCard } from './Minimalist/PhilosophyCard';
import { ScheduleIndicator } from './shared/ScheduleIndicator';
import { useState } from 'react';

interface MinimalistLayoutProps {
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

export function MinimalistLayout({
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
}: MinimalistLayoutProps) {
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
  const [focusMode, setFocusMode] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Template config flags for Minimalist layout
  const enableFocusMode = restaurant.template_config?.enableFocusMode !== false;
  const showPhilosophy = restaurant.philosophy || restaurant.minimalist_quote;

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
          variant="minimal"
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

        {/* Enhanced Filters with Search, Dietary, and Allergen Filters */}
        <EnhancedFilterBar
          filters={filters}
          theme={theme}
          language={language}
          showSearch={true}
          showDietaryFilters={true}
          showAllergenButton={true}
        />
      </header>

      {/* Philosophy Card - Inspirational introduction */}
      {showPhilosophy && (
        <PhilosophyCard restaurant={restaurant} theme={theme} />
      )}

      {/* Focus Mode Toggle */}
      {enableFocusMode && (
        <FocusModeToggle
          enabled={focusMode}
          onToggle={() => setFocusMode(!focusMode)}
          theme={theme}
        />
      )}

      {/* Menu Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
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
              className="mb-12 scroll-mt-40"
            >
              {/* Category Header with Icon - Clickable for Accordion */}
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )}
                className="w-full mb-6 pb-3 border-b-2 text-left transition-all hover:opacity-80"
                style={{ borderColor: theme.styles.primary }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{categoryIcon}</span>
                    <h2
                      className="text-3xl font-bold tracking-tight"
                      style={{ color: theme.styles.primary }}
                    >
                      {categoryName}
                    </h2>
                  </div>
                  <span
                    className={`text-2xl transition-transform duration-300 ${
                      expandedCategory === category.id || expandedCategory === null ? 'rotate-180' : ''
                    }`}
                    style={{ color: theme.styles.textMuted }}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {/* Menu Items - Accordion & Focus Mode Support */}
              {(expandedCategory === category.id || expandedCategory === null) && (
                <>
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
                  ) : focusMode ? (
                    /* Focus Mode - Ultra minimal, just name and price */
                    <div className="space-y-3">
                      {categoryItems.map((item) => {
                        const itemName = getLocalizedName(item, language);
                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-dotted"
                            style={{ borderColor: theme.styles.border }}
                          >
                            <span
                              className="font-medium"
                              style={{ color: theme.styles.text }}
                            >
                              {itemName}
                              {item.is_sold_out && (
                                <span
                                  className="ml-2 text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: theme.styles.badgeSoldOutBg,
                                    color: theme.styles.badgeSoldOutText,
                                  }}
                                >
                                  {language === 'de' ? 'Ausverkauft' : 'Sold out'}
                                </span>
                              )}
                            </span>
                            <span
                              className="font-bold tabular-nums"
                              style={{ color: theme.styles.primary }}
                            >
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Normal Mode - Full item display */
                    <div className="space-y-6">
                      {categoryItems.map((item) => (
                        <MenuItem
                          key={item.id}
                          item={item}
                          theme={theme}
                          language={language}
                          variant="minimal"
                          showDescription={template.density.showDescription}
                          showAllergens={template.density.showAllergens}
                          showBadges={template.density.showBadges}
                          selectedAllergen={selectedAllergen}
                          onAllergenClick={(id) => setSelectedAllergen(selectedAllergen === id ? null : id)}
                          getLocalizedName={getLocalizedName}
                          getLocalizedDescription={getLocalizedDescription}
                        />
                      ))}
                    </div>
                  )}
                </>
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
