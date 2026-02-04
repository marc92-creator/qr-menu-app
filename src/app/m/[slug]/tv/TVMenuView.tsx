'use client';

import { useState, useEffect, useCallback } from 'react';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { getTheme } from '@/lib/themes';
import { formatPrice } from '@/lib/utils';
import { getItemImageByStrategy } from '@/lib/imageService';
import { getTranslation, Language, autoTranslate } from '@/lib/translations';

interface TVMenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
}

export function TVMenuView({ restaurant, categories, menuItems }: TVMenuViewProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const theme = getTheme(restaurant.theme || 'classic');
  const styles = theme.styles;

  // Get translations
  const lang = (restaurant.menu_language || 'de') as Language;
  const t = getTranslation(lang);

  // Localization helpers with auto-translation fallback
  const getLocalizedName = (item: MenuItem): string => {
    if (lang === 'de') return item.name;
    if (item.name_en && item.name_en.trim() !== '') return item.name_en;
    return autoTranslate(item.name);
  };

  const getLocalizedDescription = (item: MenuItem): string | null => {
    if (!item.description) return null;
    if (lang === 'de') return item.description;
    if (item.description_en && item.description_en.trim() !== '') return item.description_en;
    return autoTranslate(item.description);
  };

  const getLocalizedCategoryName = (category: Category): string => {
    if (lang === 'de') return category.name;
    if (category.name_en && category.name_en.trim() !== '') return category.name_en;
    return autoTranslate(category.name);
  };

  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

  // Auto-scroll through categories
  useEffect(() => {
    if (!isAutoScrolling || sortedCategories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % sortedCategories.length);
    }, 8000); // Switch every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, sortedCategories.length]);

  const currentCategory = sortedCategories[currentCategoryIndex];
  const categoryItems = currentCategory
    ? menuItems
        .filter((item) => item.category_id === currentCategory.id && item.is_available !== false)
        .sort((a, b) => {
          // Specials first, then by position
          if (a.is_special && !b.is_special) return -1;
          if (!a.is_special && b.is_special) return 1;
          return a.position - b.position;
        })
    : [];

  const goToCategory = useCallback((index: number) => {
    setCurrentCategoryIndex(index);
    setIsAutoScrolling(false);
    // Resume auto-scroll after 30 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 30000);
  }, []);

  const goNext = useCallback(() => {
    goToCategory((currentCategoryIndex + 1) % sortedCategories.length);
  }, [currentCategoryIndex, sortedCategories.length, goToCategory]);

  const goPrev = useCallback(() => {
    goToCategory((currentCategoryIndex - 1 + sortedCategories.length) % sortedCategories.length);
  }, [currentCategoryIndex, sortedCategories.length, goToCategory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'p' || e.key === 'P') {
        setIsAutoScrolling((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  if (sortedCategories.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: styles.background }}
      >
        <p className="text-2xl" style={{ color: styles.textMuted }}>
          {t.noMenuAvailable}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: styles.background,
        backgroundImage: styles.backgroundPattern || 'none',
      }}
    >
      {/* Header */}
      <header
        className="flex-shrink-0 px-8 py-6"
        style={{
          background: styles.headerBg,
          borderBottom: `2px solid ${styles.headerBorder}`,
        }}
      >
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          {/* Restaurant Info */}
          <div className="flex items-center gap-6">
            {restaurant.logo_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4"
                style={{ borderColor: styles.primary + '40' }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${styles.primary}, ${styles.accent || styles.primary})`,
                }}
              >
                <span className="text-4xl text-white font-bold">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold" style={{ color: styles.text }}>
                {restaurant.name}
              </h1>
              {restaurant.address && (
                <p className="text-xl mt-1" style={{ color: styles.textMuted }}>
                  📍 {restaurant.address}
                </p>
              )}
            </div>
          </div>

          {/* Current Category */}
          <div className="text-right">
            <div className="text-lg" style={{ color: styles.textMuted }}>
              {t.category} {currentCategoryIndex + 1} {t.of} {sortedCategories.length}
            </div>
            <h2 className="text-3xl font-bold" style={{ color: styles.primary }}>
              {currentCategory ? getLocalizedCategoryName(currentCategory) : ''}
            </h2>
          </div>
        </div>
      </header>

      {/* Category Navigation Pills */}
      <div
        className="flex-shrink-0 px-8 py-4 border-b"
        style={{ borderColor: styles.border, background: styles.cardBg }}
      >
        <div className="flex gap-3 max-w-[1920px] mx-auto overflow-x-auto scrollbar-hide">
          {sortedCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(index)}
              className="px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap transition-all"
              style={{
                background: index === currentCategoryIndex ? styles.pillActiveBg : styles.pillBg,
                color: index === currentCategoryIndex ? styles.pillActiveText : styles.pillText,
                border: `2px solid ${index === currentCategoryIndex ? 'transparent' : styles.border}`,
              }}
            >
              {getLocalizedCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <main className="flex-1 p-8 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1920px] mx-auto h-full auto-rows-max">
          {categoryItems.map((item) => {
            const imageResult = getItemImageByStrategy(item, restaurant.image_strategy || 'ghibli', restaurant.auto_images !== false);
            // DEBUG: ALWAYS show test placeholder to verify image rendering works - remove after testing
            const imageUrl = 'https://via.placeholder.com/400x200/ff0000/ffffff?text=TEST';
            const isSvgImage = imageUrl?.endsWith('.svg');

            return (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] ${item.is_sold_out ? 'opacity-60' : ''}`}
                style={{
                  background: styles.cardBg,
                  border: `2px solid ${styles.cardBorder}`,
                  boxShadow: styles.cardShadow,
                }}
              >
                {/* Image */}
                {imageUrl && (
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={getLocalizedName(item)}
                      className={`w-full h-full ${isSvgImage ? 'object-contain p-6' : 'object-cover'}`}
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.is_special && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{
                            background: styles.badgeSpecialBg,
                            color: styles.badgeSpecialText,
                          }}
                        >
                          ⭐ {t.dailySpecial}
                        </span>
                      )}
                      {item.is_popular && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{
                            background: styles.badgePopularBg,
                            color: styles.badgePopularText,
                          }}
                        >
                          🔥 {t.popular}
                        </span>
                      )}
                      {item.is_sold_out && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{
                            background: styles.badgeSoldOutBg,
                            color: styles.badgeSoldOutText,
                          }}
                        >
                          🚫 {t.soldOut}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold truncate" style={{ color: styles.text }}>
                        {getLocalizedName(item)}
                      </h3>
                      {(() => {
                        const desc = getLocalizedDescription(item);
                        return desc ? (
                          <p className="text-base mt-1 line-clamp-2" style={{ color: styles.textMuted }}>
                            {desc}
                          </p>
                        ) : null;
                      })()}
                    </div>
                    <div
                      className={`text-2xl font-bold flex-shrink-0 ${item.is_sold_out ? 'line-through' : ''}`}
                      style={{ color: item.is_sold_out ? styles.textMuted : styles.priceColor }}
                    >
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Diet Badges */}
                  {(item.is_vegetarian || item.is_vegan) && (
                    <div className="flex gap-2 mt-3">
                      {item.is_vegan && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            background: styles.badgeVeganBg,
                            color: styles.badgeVeganText,
                          }}
                        >
                          🌱 {t.vegan}
                        </span>
                      )}
                      {item.is_vegetarian && !item.is_vegan && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            background: styles.badgeVeganBg,
                            color: styles.badgeVeganText,
                          }}
                        >
                          🥬 {t.vegetarian}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer with Auto-scroll indicator */}
      <footer
        className="flex-shrink-0 px-8 py-4 border-t"
        style={{
          borderColor: styles.border,
          background: styles.headerBg,
        }}
      >
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                isAutoScrolling ? 'animate-pulse' : ''
              }`}
              style={{
                background: isAutoScrolling ? styles.primary + '20' : styles.cardBg,
                color: isAutoScrolling ? styles.primary : styles.textMuted,
                border: `1px solid ${isAutoScrolling ? styles.primary : styles.border}`,
              }}
            >
              <span className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-emerald-500' : 'bg-gray-400'}`} />
              {isAutoScrolling ? t.autoScrollActive : t.autoScrollPaused}
            </div>
          </div>

          <div className="text-sm" style={{ color: styles.textMuted }}>
            {t.keyboardHint}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {sortedCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCategory(index)}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  background: index === currentCategoryIndex ? styles.primary : styles.border,
                }}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
