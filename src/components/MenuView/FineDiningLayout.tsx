'use client';

import { Category, MenuItem as MenuItemType, Restaurant } from '@/types/database';
import { MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { formatPrice } from '@/lib/utils';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { DietaryFilters } from './shared/DietaryFilters';
import { AllergenLegend } from './shared/AllergenLegend';
import { useState } from 'react';

interface FineDiningLayoutProps {
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

export function FineDiningLayout({
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
}: FineDiningLayoutProps) {
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

  const [selectedAllergen] = useState<string | null>(null);

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
        {/* Restaurant Header Hero */}
        <RestaurantHeader
          restaurant={restaurant}
          theme={theme}
          language={language}
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          variant="hero"
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

      {/* Menu Content - Elegant Centered Layout */}
      <main className="max-w-3xl mx-auto px-6 py-12">
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
              className="mb-16 scroll-mt-40"
            >
              {/* Category Header - Elegant Centered with Decorative Divider */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: theme.styles.textMuted }}>
                    ✦
                  </span>
                  <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
                </div>
                <h2
                  className="text-3xl font-serif tracking-wide"
                  style={{ color: theme.styles.primary, fontFamily: '"Playfair Display", "Cormorant", serif' }}
                >
                  {categoryName}
                </h2>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: theme.styles.textMuted }}>
                    ✦
                  </span>
                  <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
                </div>
              </div>

              {/* Menu Items - Elegant Single Column */}
              {categoryItems.length === 0 && activeFilters.size > 0 ? (
                <div className="py-8 text-center text-sm" style={{ color: theme.styles.textMuted }}>
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
                <div className="space-y-10">
                  {categoryItems.map((item) => {
                    const itemName = getLocalizedName(item, language);
                    const itemDescription = getLocalizedDescription(item, language);

                    return (
                      <article
                        key={item.id}
                        className="text-center"
                      >
                        {/* Item Name - Large Serif */}
                        <h3
                          className="text-2xl font-serif mb-3"
                          style={{
                            color: theme.styles.text,
                            fontFamily: '"Playfair Display", "Cormorant", serif',
                          }}
                        >
                          {itemName}
                        </h3>

                        {/* Description - Generous Line Height */}
                        {template.density.showDescription && itemDescription && (
                          <p
                            className="text-base leading-relaxed mb-4 max-w-2xl mx-auto"
                            style={{
                              color: theme.styles.textMuted,
                              fontStyle: 'italic',
                            }}
                          >
                            {itemDescription}
                          </p>
                        )}

                        {/* Price - Elegant Typography */}
                        <div
                          className="text-xl font-medium tracking-wider"
                          style={{ color: theme.styles.primary }}
                        >
                          {formatPrice(item.price)}
                        </div>

                        {/* Subtle badges (minimal, no hover effects) */}
                        {template.density.showBadges && (
                          <div className="flex items-center justify-center gap-3 mt-3">
                            {item.is_vegan && (
                              <span className="text-xs tracking-wide" style={{ color: theme.styles.textMuted }}>
                                🌱 Vegan
                              </span>
                            )}
                            {item.is_vegetarian && !item.is_vegan && (
                              <span className="text-xs tracking-wide" style={{ color: theme.styles.textMuted }}>
                                🥬 Vegetarian
                              </span>
                            )}
                            {item.is_special && (
                              <span className="text-xs tracking-wide" style={{ color: theme.styles.primary }}>
                                ✦ Chef&apos;s Special
                              </span>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Allergen Legend */}
        {usedAllergens.length > 0 && (
          <div className="mt-16">
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
