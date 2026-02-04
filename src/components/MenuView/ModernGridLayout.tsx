'use client';

import { Category, MenuItem as MenuItemType, Restaurant, MenuSchedule } from '@/types/database';
import { MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { getItemImageByStrategy } from '@/lib/imageService';
import { formatPrice } from '@/lib/utils';
import { useMenuNavigation } from '@/hooks/useMenuNavigation';
import { useMenuFilters } from '@/hooks/useMenuFilters';
import { CategoryNavigation } from './shared/CategoryNavigation';
import { RestaurantHeader } from './shared/RestaurantHeader';
import { AllergenLegend } from './shared/AllergenLegend';
import { EnhancedFilterBar } from './EnhancedFilterBar';
import { InstagramIntegration } from './ModernGrid/InstagramIntegration';
import { HashtagDisplay } from './ModernGrid/HashtagDisplay';
import { ScheduleIndicator } from './shared/ScheduleIndicator';
import { FilterFAB } from './filters/FilterFAB';
import { FilterBottomSheet } from './filters/FilterBottomSheet';
import { useState, useCallback } from 'react';

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

// Hook for managing liked items
function useLikedItems(restaurantSlug: string) {
  const [likedItems, setLikedItems] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(`liked-items-${restaurantSlug}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleLike = useCallback((itemId: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      // Persist to localStorage
      try {
        localStorage.setItem(`liked-items-${restaurantSlug}`, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, [restaurantSlug]);

  return { likedItems, toggleLike };
}

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
  activeSchedule,
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

  const filters = useMenuFilters({ restaurantSlug: restaurant.slug });
  const { filterItem, hasActiveFilters, clearAll } = filters;

  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{ url: string; name: string } | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { likedItems, toggleLike } = useLikedItems(restaurant.slug);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(items.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Filter displayed categories based on embedded mode
  const displayedCategories = isEmbedded && filterCategory
    ? sortedCategories.filter(cat => cat.id === filterCategory)
    : sortedCategories;

  // Check template config
  const showInstagram = restaurant.template_config?.enableInstagram !== false;

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

        {/* Dietary Pills Only - Search and Allergens via FAB */}
        <EnhancedFilterBar
          filters={filters}
          theme={theme}
          language={language}
          showSearch={false}
          showDietaryFilters={true}
          showAllergenButton={false}
        />
      </header>

      {/* Menu Content - 2 Column Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {displayedCategories.map((category) => {
          const categoryName = getLocalizedCategoryName(category, language);
          const categoryItems = items
            .filter((item) => item.category_id === category.id)
            .filter((item) => filterItem(item, categoryName))
            .sort((a, b) => a.position - b.position);

          if (categoryItems.length === 0 && !hasActiveFilters) return null;

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
              {categoryItems.length === 0 && hasActiveFilters ? (
                <div className="py-8 text-center text-sm col-span-full" style={{ color: theme.styles.textMuted }}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryItems.map((item) => {
                    const imageResult = getItemImageByStrategy(item, restaurant.image_strategy || 'ghibli', restaurant.auto_images !== false, categoryName);
                    const imageUrl = imageResult?.url || null;
                    const isLiked = likedItems.has(item.id);
                    return (
                      <ModernGridItem
                        key={item.id}
                        item={item}
                        imageUrl={imageUrl}
                        theme={theme}
                        language={language}
                        template={template}
                        isLiked={isLiked}
                        onLike={() => toggleLike(item.id)}
                        onImageClick={() => imageUrl && setFullscreenImage({ url: imageUrl, name: getLocalizedName(item, language) })}
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

        {/* Instagram Integration */}
        {showInstagram && (restaurant.instagram_handle || restaurant.instagram_hashtag) && (
          <InstagramIntegration restaurant={restaurant} theme={theme} />
        )}

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

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setFullscreenImage(null)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={fullscreenImage.url}
            alt={fullscreenImage.name}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-medium">
            {fullscreenImage.name}
          </p>
        </div>
      )}

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

// Modern Grid Item Component with double-tap to like
interface ModernGridItemProps {
  item: MenuItemType;
  imageUrl: string | null;
  theme: ThemeConfig;
  language: Language;
  template: MenuTemplate;
  isLiked: boolean;
  onLike: () => void;
  onImageClick: () => void;
  selectedAllergen: string | null;
  onAllergenClick: (id: string) => void;
  getLocalizedName: (item: MenuItemType, lang: Language) => string;
  getLocalizedDescription: (item: MenuItemType, lang: Language) => string | null;
}

function ModernGridItem({
  item,
  imageUrl,
  theme,
  language,
  template,
  isLiked,
  onLike,
  onImageClick,
  getLocalizedName,
  getLocalizedDescription,
}: ModernGridItemProps) {
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const t = getTranslation(language);

  const itemName = getLocalizedName(item, language);
  const itemDescription = getLocalizedDescription(item, language);

  // Handle double-tap to like
  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap detected
      if (!isLiked) {
        onLike();
        setShowHeartAnimation(true);
        setTimeout(() => setShowHeartAnimation(false), 1000);
      }
    }
    setLastTap(now);
  }, [lastTap, isLiked, onLike]);

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: itemName,
          text: itemDescription || undefined,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: theme.styles.cardBg,
        border: `1px solid ${theme.styles.cardBorder}`,
      }}
    >
      {/* Image Section */}
      {imageUrl && (
        <div
          className="relative aspect-square cursor-pointer overflow-hidden"
          onClick={handleTap}
          onDoubleClick={() => {
            if (!isLiked) {
              onLike();
              setShowHeartAnimation(true);
              setTimeout(() => setShowHeartAnimation(false), 1000);
            }
          }}
        >
          <img
            src={imageUrl}
            alt={itemName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />

          {/* Heart Animation on Double-tap */}
          {showHeartAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl animate-ping text-red-500">❤️</span>
            </div>
          )}

          {/* Expand button */}
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-black/30 text-white opacity-0 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick();
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Sold out overlay */}
          {item.is_sold_out && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{t.soldOut}</span>
            </div>
          )}

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {item.is_special && (
              <span
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  background: theme.styles.badgeSpecialBg,
                  color: theme.styles.badgeSpecialText,
                }}
              >
                ⭐ Special
              </span>
            )}
            {item.is_new && (
              <span
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  background: theme.styles.primary,
                  color: '#fff',
                }}
              >
                NEU
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg" style={{ color: theme.styles.text }}>
              {itemName}
            </h3>
            {template.density.showDescription && itemDescription && (
              <p
                className="text-sm mt-1 line-clamp-2"
                style={{ color: theme.styles.textMuted }}
              >
                {itemDescription}
              </p>
            )}
          </div>
          <div className="text-lg font-bold" style={{ color: theme.styles.priceColor }}>
            {formatPrice(item.price)}
          </div>
        </div>

        {/* Dietary badges */}
        {template.density.showBadges && (item.is_vegan || item.is_vegetarian) && (
          <div className="flex gap-2 mt-2">
            {item.is_vegan && (
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: theme.styles.badgeVeganBg,
                  color: theme.styles.badgeVeganText,
                }}
              >
                🌱 {t.vegan}
              </span>
            )}
            {item.is_vegetarian && !item.is_vegan && (
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: theme.styles.badgeVeganBg,
                  color: theme.styles.badgeVeganText,
                }}
              >
                🥬 {t.vegetarian}
              </span>
            )}
          </div>
        )}

        {/* Hashtags */}
        {item.hashtags && item.hashtags.length > 0 && (
          <HashtagDisplay hashtags={item.hashtags} theme={theme} />
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: theme.styles.border }}>
          <button
            className="flex items-center gap-1 text-sm transition-colors"
            onClick={onLike}
            style={{ color: isLiked ? '#ef4444' : theme.styles.textMuted }}
          >
            <span className={`transition-transform ${isLiked ? 'scale-125' : ''}`}>
              {isLiked ? '❤️' : '🤍'}
            </span>
            <span>{isLiked ? 'Gemerkt' : 'Merken'}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              className="flex items-center gap-1 text-sm transition-colors"
              onClick={handleShare}
              style={{ color: theme.styles.textMuted }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Teilen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
