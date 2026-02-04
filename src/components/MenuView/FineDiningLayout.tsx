'use client';

import { Category, MenuItem as MenuItemType, Restaurant, CourseType, MenuSchedule } from '@/types/database';
import { MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { formatPrice } from '@/lib/utils';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { AllergenLegend } from './shared/AllergenLegend';
import { ChefMessageCard } from './FineDining/ChefMessageCard';
import { WinePairingSection } from './FineDining/WinePairingSection';
import { CourseIndicator } from './FineDining/CourseIndicator';
import { AwardsDisplay } from './FineDining/AwardsDisplay';
import { CategoryHeader } from './FineDining/CategoryHeader';
import { ScheduleIndicator } from './shared/ScheduleIndicator';
import { FilterFAB } from './filters/FilterFAB';
import { FilterBottomSheet } from './filters/FilterBottomSheet';
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

// Group items by course type for elegant presentation
const groupItemsByCourse = (items: MenuItemType[]): Map<CourseType | 'none', MenuItemType[]> => {
  const groups = new Map<CourseType | 'none', MenuItemType[]>();

  items.forEach(item => {
    const course = item.course_type || 'none';
    if (!groups.has(course)) {
      groups.set(course, []);
    }
    groups.get(course)!.push(item);
  });

  // Sort by course order
  const courseOrder: (CourseType | 'none')[] = ['amuse', 'starter', 'main', 'cheese', 'dessert', 'none'];
  const sorted = new Map<CourseType | 'none', MenuItemType[]>();
  courseOrder.forEach(course => {
    if (groups.has(course)) {
      sorted.set(course, groups.get(course)!);
    }
  });

  return sorted;
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
  activeSchedule,
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

  const filters = useMenuFilters({ restaurantSlug: restaurant.slug });
  const { filterItem, hasActiveFilters, clearAll } = filters;

  const [selectedAllergen] = useState<string | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(items.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Filter displayed categories based on embedded mode
  const displayedCategories = isEmbedded && filterCategory
    ? sortedCategories.filter(cat => cat.id === filterCategory)
    : sortedCategories;

  // Check if we should show course grouping
  const showCourseTypes = restaurant.template_config?.showCourseTypes !== false;
  const showWinePairings = restaurant.template_config?.showWinePairings !== false;
  const showChefNotes = restaurant.template_config?.showChefNotes !== false;

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

      {/* Chef Message Card - Elegant introduction */}
      {showChefNotes && (restaurant.chef_message || restaurant.philosophy) && (
        <ChefMessageCard restaurant={restaurant} theme={theme} />
      )}

      {/* Awards Display */}
      {(restaurant.awards && restaurant.awards.length > 0) && (
        <AwardsDisplay restaurant={restaurant} theme={theme} />
      )}

      {/* Menu Content - Elegant Centered Layout */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {displayedCategories.map((category) => {
          const categoryName = getLocalizedCategoryName(category, language);
          const categoryItems = items
            .filter((item) => item.category_id === category.id)
            .filter((item) => filterItem(item, categoryName))
            .sort((a, b) => a.position - b.position);

          if (categoryItems.length === 0 && !hasActiveFilters) return null;

          // Group items by course type if enabled
          const courseGroups = showCourseTypes ? groupItemsByCourse(categoryItems) : null;

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              ref={(el) => {
                if (el) categoryRefs.current.set(category.id, el);
              }}
              className="mb-16 scroll-mt-40"
            >
              {/* Category Header - Elegant with SVG Ornaments */}
              <CategoryHeader categoryName={categoryName} theme={theme} />

              {/* Menu Items - Elegant Single Column */}
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
              ) : courseGroups ? (
                // Render with course grouping
                <div className="space-y-12">
                  {Array.from(courseGroups.entries()).map(([courseType, courseItems]) => (
                    <div key={courseType} className="space-y-10">
                      {/* Course indicator */}
                      {courseType !== 'none' && (
                        <CourseIndicator courseType={courseType as CourseType} theme={theme} />
                      )}

                      {/* Items in this course */}
                      {courseItems.map((item) => (
                        <FineDiningMenuItem
                          key={item.id}
                          item={item}
                          language={language}
                          theme={theme}
                          template={template}
                          showWinePairings={showWinePairings}
                          getLocalizedName={getLocalizedName}
                          getLocalizedDescription={getLocalizedDescription}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                // Render without course grouping
                <div className="space-y-10">
                  {categoryItems.map((item) => (
                    <FineDiningMenuItem
                      key={item.id}
                      item={item}
                      language={language}
                      theme={theme}
                      template={template}
                      showWinePairings={showWinePairings}
                      getLocalizedName={getLocalizedName}
                      getLocalizedDescription={getLocalizedDescription}
                    />
                  ))}
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

        {/* Reservation CTA */}
        {restaurant.reservation_required && (
          <div className="mt-16 text-center">
            <div
              className="inline-block px-8 py-4 rounded-lg"
              style={{
                backgroundColor: theme.styles.primaryLight,
                border: `1px solid ${theme.styles.primary}`,
              }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: theme.styles.primary }}>
                {t.reservationRequired}
              </p>
              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone}`}
                  className="text-lg font-serif"
                  style={{ color: theme.styles.text, fontFamily: '"Playfair Display", serif' }}
                >
                  {restaurant.phone}
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Filter FAB - Bottom Right */}
      <FilterFAB
        filters={filters}
        theme={theme}
        language={language}
        onOpenSheet={() => setIsFilterSheetOpen(true)}
        hideOnScroll
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filters}
        theme={theme}
        language={language}
      />
    </div>
  );
}

// Extracted MenuItem component for Fine Dining
interface FineDiningMenuItemProps {
  item: MenuItemType;
  language: Language;
  theme: ThemeConfig;
  template: MenuTemplate;
  showWinePairings: boolean;
  getLocalizedName: (item: MenuItemType, lang: Language) => string;
  getLocalizedDescription: (item: MenuItemType, lang: Language) => string | null;
}

function FineDiningMenuItem({
  item,
  language,
  theme,
  template,
  showWinePairings,
  getLocalizedName,
  getLocalizedDescription,
}: FineDiningMenuItemProps) {
  const t = getTranslation(language);
  const itemName = getLocalizedName(item, language);
  const itemDescription = getLocalizedDescription(item, language);

  return (
    <article className="text-center animate-fadeIn">
      {/* Chef's Note */}
      {item.chef_note && (
        <div className="mb-3">
          <span
            className="inline-block text-xs italic px-3 py-1 rounded-full"
            style={{
              backgroundColor: theme.styles.primaryLight,
              color: theme.styles.primary,
            }}
          >
            👨‍🍳 {item.chef_note}
          </span>
        </div>
      )}

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

      {/* Origin Region */}
      {item.origin_region && (
        <p
          className="text-xs tracking-wide mb-2"
          style={{ color: theme.styles.textMuted }}
        >
          {item.origin_region}
        </p>
      )}

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
              🌱 {t.vegan}
            </span>
          )}
          {item.is_vegetarian && !item.is_vegan && (
            <span className="text-xs tracking-wide" style={{ color: theme.styles.textMuted }}>
              🥬 {t.vegetarian}
            </span>
          )}
          {item.is_special && (
            <span className="text-xs tracking-wide" style={{ color: theme.styles.primary }}>
              ✦ {t.chefsSpecial}
            </span>
          )}
        </div>
      )}

      {/* Wine Pairings */}
      {showWinePairings && item.wine_pairings && item.wine_pairings.length > 0 && (
        <WinePairingSection winePairings={item.wine_pairings} theme={theme} />
      )}
    </article>
  );
}
