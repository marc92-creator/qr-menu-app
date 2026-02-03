'use client';

import { useState } from 'react';
import { MenuItem as MenuItemType } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation, getAllergenName } from '@/lib/translations';
import { getAllergensByIds } from '@/lib/allergens';
import { formatPrice } from '@/lib/utils';
import { getTagsByIds, getLocalizedTagName } from '@/lib/itemTags';

interface MenuItemProps {
  item: MenuItemType;
  theme: ThemeConfig;
  language: Language;
  variant?: 'card' | 'list' | 'minimal' | 'grid' | 'table-row';
  imageUrl?: string | null;
  showDescription?: boolean;
  showAllergens?: boolean;
  showBadges?: boolean;
  onAllergenClick?: (allergenId: string) => void;
  selectedAllergen?: string | null;
  getLocalizedName: (item: MenuItemType, lang: Language) => string;
  getLocalizedDescription: (item: MenuItemType, lang: Language) => string | null;
}

// Premium Image Component with loading state and blur effect
function MenuImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Debug: Log image loading
  console.log('[MenuImage] Loading:', src?.substring(0, 50) + '...');

  if (hasError) {
    console.error('[MenuImage] Failed to load:', src);
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={style}
        onLoad={() => {
          console.log('[MenuImage] Loaded successfully:', src?.substring(0, 50) + '...');
          setIsLoaded(true);
        }}
        onError={(e) => {
          console.error('[MenuImage] Error loading image:', src, e);
          setHasError(true);
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export function MenuItem({
  item,
  theme,
  language,
  variant = 'card',
  imageUrl,
  showDescription = true,
  showAllergens = true,
  showBadges = true,
  onAllergenClick,
  selectedAllergen,
  getLocalizedName,
  getLocalizedDescription,
}: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = getTranslation(language);
  const styles = theme.styles;
  const itemAllergens = getAllergensByIds(item.allergens || []);
  const itemName = getLocalizedName(item, language);
  const itemDescription = getLocalizedDescription(item, language);
  const isSvgImage = imageUrl?.endsWith('.svg');

  // Table row variant for CompactLayout
  if (variant === 'table-row') {
    return (
      <div
        className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-gray-50/50 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-medium" style={{ color: styles.text }}>{itemName}</span>
            {showBadges && (
              <>
                {item.is_vegan && <span>🌱</span>}
                {item.is_vegetarian && !item.is_vegan && <span>🥬</span>}
                {item.is_special && <span>⭐</span>}
              </>
            )}
          </div>
          {showDescription && itemDescription && (
            <p className="text-xs truncate" style={{ color: styles.textMuted }}>{itemDescription}</p>
          )}
        </div>
        <span className="font-bold tabular-nums flex-shrink-0" style={{ color: styles.priceColor }}>
          {formatPrice(item.price)}
        </span>
      </div>
    );
  }

  // Grid variant for ModernGridLayout
  if (variant === 'grid') {
    return (
      <div
        className="group rounded-xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: styles.cardBg,
          border: `1px solid ${styles.cardBorder}`,
          boxShadow: isHovered ? styles.cardHoverShadow : styles.cardShadow,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            {isSvgImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl}
                alt={itemName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: '#f9fafb' }}
              />
            ) : (
              <MenuImage
                src={imageUrl}
                alt={itemName}
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
        )}
        <div className="p-4">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="font-semibold" style={{ color: styles.text }}>{itemName}</h3>
            <span className="font-bold tabular-nums flex-shrink-0" style={{ color: styles.priceColor }}>
              {formatPrice(item.price)}
            </span>
          </div>
          {showDescription && itemDescription && (
            <p className="text-sm line-clamp-2" style={{ color: styles.textMuted }}>{itemDescription}</p>
          )}
        </div>
      </div>
    );
  }

  // Minimal variant for MinimalistLayout and FineDiningLayout
  if (variant === 'minimal') {
    return (
      <div
        className="group hover:bg-gray-50/50 -mx-4 px-4 py-3 rounded-xl transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-2px)' : 'none',
        }}
      >
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-xl font-semibold flex-1" style={{ color: styles.text }}>
            {itemName}
            {item.is_sold_out && (
              <span className="ml-3 text-sm font-normal text-red-600">
                Ausverkauft
              </span>
            )}
          </h3>
          <span className="text-xl font-bold whitespace-nowrap" style={{ color: styles.primary }}>
            {formatPrice(item.price)}
          </span>
        </div>
        {showDescription && itemDescription && (
          <p className="text-gray-600 text-sm leading-relaxed mb-2">{itemDescription}</p>
        )}
        {showBadges && (
          <div className="flex flex-wrap gap-2">
            {item.is_special && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                <span>⭐</span>
                <span>Tagesangebot</span>
              </span>
            )}
            {item.is_popular && !item.is_special && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
                <span>❤️</span>
                <span>Beliebt</span>
              </span>
            )}
            {item.is_vegan && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                <span>🌱</span>
                <span>Vegan</span>
              </span>
            )}
            {item.is_vegetarian && !item.is_vegan && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                <span>🥬</span>
                <span>Vegetarisch</span>
              </span>
            )}
            {showAllergens && itemAllergens.length > 0 && (
              <span className="text-xs text-gray-500">
                Allergene: {itemAllergens.map((a) => a.name).join(', ')}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default: card variant (Traditional layout)
  return (
    <article
      className={`rounded-2xl p-4 transition-all duration-300 hover:shadow-lg ${item.is_sold_out ? 'opacity-60' : ''}`}
      style={{
        backgroundColor: styles.cardBg,
        border: `1px solid ${styles.cardBorder}`,
        boxShadow: isHovered ? styles.cardHoverShadow : styles.cardShadow,
        transform: isHovered ? styles.cardHoverTransform : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            {isSvgImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl}
                alt={itemName}
                className="w-20 h-20 rounded-lg object-cover"
                style={{ backgroundColor: '#f9fafb' }}
              />
            ) : (
              <MenuImage
                src={imageUrl}
                alt={itemName}
                className="w-20 h-20 rounded-lg"
              />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold leading-tight" style={{ color: styles.text }}>
                  {itemName}
                </h3>
                {showBadges && (
                  <>
                    {item.is_special && (
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        style={{
                          background: styles.badgeSpecialBg,
                          color: styles.badgeSpecialText,
                        }}
                      >
                        ⭐ {t.dailySpecial}
                      </span>
                    )}
                    {item.is_popular && !item.is_special && (
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        style={{
                          backgroundColor: styles.badgePopularBg,
                          color: styles.badgePopularText,
                        }}
                      >
                        ❤️ {t.popular}
                      </span>
                    )}
                    {item.is_vegan && (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        title={t.vegan}
                        style={{
                          backgroundColor: styles.badgeVeganBg,
                          color: styles.badgeVeganText,
                        }}
                      >
                        🌱
                      </span>
                    )}
                    {item.is_vegetarian && !item.is_vegan && (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        title={t.vegetarian}
                        style={{
                          backgroundColor: styles.badgeVeganBg,
                          color: styles.badgeVeganText,
                          opacity: 0.8,
                        }}
                      >
                        🥬
                      </span>
                    )}
                    {item.tags && item.tags.length > 0 && getTagsByIds(item.tags).map((tag) => (
                      <span
                        key={tag.id}
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold rounded ${tag.bgColor} ${tag.textColor}`}
                      >
                        {tag.icon} {getLocalizedTagName(tag, language)}
                      </span>
                    ))}
                    {item.is_sold_out && (
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded"
                        style={{
                          backgroundColor: styles.badgeSoldOutBg,
                          color: styles.badgeSoldOutText,
                        }}
                      >
                        🚫 {t.soldOut}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <span
              className={`flex-shrink-0 text-lg font-bold tabular-nums ${item.is_sold_out ? 'line-through' : ''}`}
              style={{ color: item.is_sold_out ? styles.textMuted : styles.priceColor }}
            >
              {formatPrice(item.price)}
            </span>
          </div>
          {showDescription && itemDescription && (
            <p className="text-sm mt-1 line-clamp-2 leading-relaxed" style={{ color: styles.textMuted }}>
              {itemDescription}
            </p>
          )}
          {item.upsell_text && (
            <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
              <span className="font-medium">💡 {t.upsellTip}:</span> {item.upsell_text}
            </p>
          )}
          {showAllergens && itemAllergens.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {itemAllergens.map((allergen) => {
                const isSelected = selectedAllergen === allergen.id;
                return (
                  <button
                    key={allergen.id}
                    onClick={() => onAllergenClick?.(allergen.id)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 touch-manipulation active:scale-95"
                    style={isSelected ? {
                      background: styles.allergenSelectedBg,
                      color: styles.allergenSelectedText,
                    } : {
                      backgroundColor: styles.allergenBg,
                      color: styles.allergenText,
                      border: `1px solid ${styles.allergenBorder}`,
                    }}
                  >
                    <span className="text-sm">{allergen.icon}</span>
                    <span className="hidden sm:inline">{getAllergenName(allergen.id, language)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
