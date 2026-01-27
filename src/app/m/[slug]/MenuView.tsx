'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant, Category, MenuItem, OpeningHours } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';
import { getTheme, isGradient } from '@/lib/themes';

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  showWatermark: boolean;
  isDemo?: boolean;
}

// Day keys for opening hours (Sunday = 0)
const DAY_KEYS = ['so', 'mo', 'di', 'mi', 'do', 'fr', 'sa'] as const;

// Check if restaurant is currently open
const getOpenStatus = (openingHours: OpeningHours | null): { isOpen: boolean; todayHours: string | null } => {
  if (!openingHours) return { isOpen: false, todayHours: null };

  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  const todaySchedule = openingHours[dayKey];

  if (!todaySchedule || todaySchedule.closed) {
    return { isOpen: false, todayHours: 'Geschlossen' };
  }

  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const isOpen = currentTime >= todaySchedule.open && currentTime < todaySchedule.close;

  return {
    isOpen,
    todayHours: `${todaySchedule.open} - ${todaySchedule.close}`
  };
};

// Format the last updated date in a human-readable way
const formatLastUpdated = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Gerade eben';
  if (diffMins < 60) return `Vor ${diffMins} Minute${diffMins !== 1 ? 'n' : ''}`;
  if (diffHours < 24) return `Vor ${diffHours} Stunde${diffHours !== 1 ? 'n' : ''}`;
  if (diffDays === 1) return 'Gestern';
  if (diffDays < 7) return `Vor ${diffDays} Tagen`;

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export function MenuView({ restaurant, categories, menuItems, showWatermark, isDemo = false }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [showAllergenLegend, setShowAllergenLegend] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Get theme configuration
  const theme = getTheme(restaurant.theme || 'classic');
  const styles = theme.styles;

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // Track page view / scan
  useEffect(() => {
    const trackScan = async () => {
      try {
        await fetch('/api/track-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId: restaurant.id }),
        });
      } catch {
        // Silently fail - tracking shouldn't break the menu
      }
    };

    trackScan();
  }, [restaurant.id]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);

    // Scroll tab into view
    if (tabsRef.current) {
      const tab = tabsRef.current.querySelector(`[data-category="${categoryId}"]`);
      if (tab) {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    // Scroll to category section
    const categorySection = categoryRefs.current.get(categoryId);
    if (categorySection) {
      const headerHeight = 140;
      const top = categorySection.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Check if any menu item has allergens
  const hasAnyAllergens = menuItems.some(item => item.allergens && item.allergens.length > 0);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(menuItems.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Group items by category, with specials first
  const itemsByCategory = categories.map(category => {
    const categoryItems = menuItems.filter(item => item.category_id === category.id);
    // Sort: specials first, then by position
    const sortedItems = [...categoryItems].sort((a, b) => {
      if (a.is_special && !b.is_special) return -1;
      if (!a.is_special && b.is_special) return 1;
      return a.position - b.position;
    });
    return { category, items: sortedItems };
  });

  const handleAllergenClick = (allergenId: string) => {
    setSelectedAllergen(selectedAllergen === allergenId ? null : allergenId);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: styles.background,
        backgroundImage: styles.backgroundPattern || 'none',
      }}
    >
      {/* Decorative gradient overlay */}
      {styles.decorativeGradient && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: styles.decorativeGradient }}
        />
      )}

      {/* Header - Sticky with Glassmorphism */}
      <header
        className="sticky top-0 z-20 backdrop-blur-md border-b"
        style={{
          background: styles.headerBg,
          borderColor: styles.headerBorder,
        }}
      >
        {/* Restaurant Info */}
        <div className="px-4 pt-4 pb-3 md:px-6">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            {restaurant.logo_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0 ring-1"
                style={{ borderColor: styles.border }}
              />
            ) : (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: styles.primary }}
              >
                <span className="text-xl text-white font-bold">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold truncate" style={{ color: styles.text }}>
                  {restaurant.name}
                </h1>
                {isDemo && (
                  <span className="flex-shrink-0 bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: styles.textMuted }}>
                {restaurant.address && (
                  <span className="truncate">{restaurant.address}</span>
                )}
                {restaurant.opening_hours && (() => {
                  const { isOpen, todayHours } = getOpenStatus(restaurant.opening_hours);
                  return (
                    <span
                      className="flex items-center gap-1 flex-shrink-0"
                      style={{
                        color: isOpen ? styles.statusOpenText : styles.statusClosedText,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: isOpen ? styles.statusOpenText : styles.statusClosedText,
                        }}
                      />
                      <span
                        className="text-xs font-medium px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: isOpen ? styles.statusOpenBg : styles.statusClosedBg,
                          color: isOpen ? styles.statusOpenText : styles.statusClosedText,
                        }}
                      >
                        {isOpen ? 'Geöffnet' : 'Geschlossen'}
                      </span>
                      {todayHours && todayHours !== 'Geschlossen' && (
                        <span className="text-xs hidden sm:inline" style={{ color: styles.textMuted }}>· {todayHours}</span>
                      )}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills - Horizontal Scroll */}
        {categories.length > 0 && (
          <div
            ref={tabsRef}
            className="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide md:px-6 md:justify-center"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  data-category={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className="px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 active:scale-95 touch-manipulation"
                  style={isActive ? {
                    background: styles.pillActiveBg,
                    color: styles.pillActiveText,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  } : {
                    backgroundColor: isGradient(styles.pillBg) ? undefined : styles.pillBg,
                    backgroundImage: isGradient(styles.pillBg) ? styles.pillBg : undefined,
                    color: styles.pillText,
                    boxShadow: `inset 0 0 0 1px ${styles.border}`,
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Menu Items - All Categories */}
      <main className={`${showWatermark ? 'pb-20' : 'pb-8'} px-4 md:px-6`}>
        <div className="max-w-2xl mx-auto">
          {categories.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-5xl mb-4">🍽️</div>
              <p style={{ color: styles.textMuted }}>Keine Speisekarte verfügbar.</p>
            </div>
          ) : (
            <div className="space-y-6 pt-4">
              {itemsByCategory.map(({ category, items }) => (
                <section
                  key={category.id}
                  ref={(el) => {
                    if (el) categoryRefs.current.set(category.id, el);
                  }}
                  className="scroll-mt-36"
                >
                  {/* Category Header */}
                  <div
                    className="sticky top-[120px] z-10 py-2 -mx-4 px-4 md:-mx-6 md:px-6 backdrop-blur-sm"
                    style={{
                      backgroundColor: `${styles.background}ee`,
                    }}
                  >
                    <h2
                      className="text-base font-semibold"
                      style={{ color: styles.text }}
                    >
                      {category.name}
                    </h2>
                  </div>

                  {/* Items */}
                  {items.length === 0 ? (
                    <div
                      className="py-8 text-center text-sm"
                      style={{ color: styles.textMuted }}
                    >
                      Keine Gerichte in dieser Kategorie
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => {
                        const itemAllergens = getAllergensByIds(item.allergens || []);
                        const isHovered = hoveredCard === item.id;

                        return (
                          <article
                            key={item.id}
                            className="rounded-xl p-4 transition-all duration-200"
                            style={{
                              backgroundColor: styles.cardBg,
                              border: `1px solid ${styles.cardBorder}`,
                              boxShadow: isHovered ? styles.cardHoverShadow : styles.cardShadow,
                              transform: isHovered ? styles.cardHoverTransform : 'none',
                            }}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            <div className="flex gap-4">
                              {/* Image or Placeholder */}
                              <div className="flex-shrink-0">
                                {item.image_url ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div
                                    className="w-20 h-20 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: styles.surfaceHover }}
                                  >
                                    <svg className="w-8 h-8" style={{ color: styles.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3
                                        className="text-base font-semibold leading-tight"
                                        style={{ color: styles.text }}
                                      >
                                        {item.name}
                                      </h3>
                                      {/* Badges */}
                                      {item.is_special && (
                                        <span
                                          className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded"
                                          style={{
                                            background: styles.badgeSpecialBg,
                                            color: styles.badgeSpecialText,
                                          }}
                                        >
                                          ⭐ Tagesangebot
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
                                          ❤️ Beliebt
                                        </span>
                                      )}
                                      {item.is_vegan && (
                                        <span
                                          className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded"
                                          title="Vegan"
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
                                          title="Vegetarisch"
                                          style={{
                                            backgroundColor: styles.badgeVeganBg,
                                            color: styles.badgeVeganText,
                                            opacity: 0.8,
                                          }}
                                        >
                                          🥬
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span
                                    className="flex-shrink-0 text-base font-bold"
                                    style={{ color: styles.priceColor }}
                                  >
                                    {formatPrice(item.price)}
                                  </span>
                                </div>
                                {item.description && (
                                  <p
                                    className="text-sm mt-1 line-clamp-2 leading-relaxed"
                                    style={{ color: styles.textMuted }}
                                  >
                                    {item.description}
                                  </p>
                                )}
                                {/* Allergen Badges */}
                                {itemAllergens.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {itemAllergens.map((allergen) => {
                                      const isSelected = selectedAllergen === allergen.id;
                                      return (
                                        <button
                                          key={allergen.id}
                                          onClick={() => handleAllergenClick(allergen.id)}
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
                                          <span className="hidden sm:inline">{allergen.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              ))}

              {/* Last Updated Info */}
              <div className="text-center py-4">
                <p className="text-xs" style={{ color: styles.textMuted }}>
                  Aktualisiert {formatLastUpdated(restaurant.updated_at)}
                </p>
              </div>

              {/* Allergen Legend */}
              {hasAnyAllergens && (
                <section
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: styles.cardBg,
                    border: `1px solid ${styles.cardBorder}`,
                    boxShadow: styles.cardShadow,
                  }}
                >
                  <button
                    onClick={() => setShowAllergenLegend(!showAllergenLegend)}
                    className="w-full flex items-center justify-between p-4 text-left touch-manipulation transition-colors"
                    style={{ color: styles.text }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">ℹ️</span>
                      <span className="font-medium text-sm">
                        Allergen-Informationen
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${showAllergenLegend ? 'rotate-180' : ''}`}
                      style={{ color: styles.textMuted }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAllergenLegend && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {usedAllergens.map((allergen) => {
                          const isSelected = selectedAllergen === allergen.id;
                          return (
                            <div
                              key={allergen.id}
                              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
                              style={isSelected ? {
                                background: styles.allergenSelectedBg,
                                color: styles.allergenSelectedText,
                              } : {
                                backgroundColor: styles.surfaceHover,
                              }}
                            >
                              <span className="text-xl">{allergen.icon}</span>
                              <div>
                                <div
                                  className="font-medium text-sm"
                                  style={{ color: isSelected ? styles.allergenSelectedText : styles.text }}
                                >
                                  {allergen.name}
                                </div>
                                <div
                                  className="text-xs"
                                  style={{ color: isSelected ? styles.allergenSelectedText : styles.textMuted, opacity: isSelected ? 0.8 : 1 }}
                                >
                                  {allergen.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p
                        className="text-xs mt-3 text-center"
                        style={{ color: styles.textMuted }}
                      >
                        Bei Fragen zu Allergenen wenden Sie sich bitte an unser Personal.
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Selected Allergen Tooltip */}
      {selectedAllergen && (
        <div
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 animate-in slide-in-from-bottom-4 duration-200"
          onClick={() => setSelectedAllergen(null)}
        >
          <div
            className="rounded-xl p-3 cursor-pointer"
            style={{
              backgroundColor: styles.surface,
              border: `1px solid ${styles.border}`,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            {(() => {
              const allergen = ALLERGENS.find(a => a.id === selectedAllergen);
              if (!allergen) return null;
              return (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: styles.allergenBg }}
                  >
                    <span className="text-xl">{allergen.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm" style={{ color: styles.text }}>{allergen.name}</div>
                    <div className="text-xs" style={{ color: styles.textMuted }}>{allergen.description}</div>
                  </div>
                  <button
                    className="p-1 touch-manipulation transition-colors"
                    style={{ color: styles.textMuted }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      {restaurant.whatsapp_number && (
        <a
          href={`https://wa.me/${restaurant.whatsapp_number.replace(/[^0-9+]/g, '').replace('+', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            fixed z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full
            flex items-center justify-center shadow-lg shadow-green-500/30
            transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation
            ${showWatermark ? 'bottom-20 right-4' : 'bottom-6 right-4'}
          `}
          title="Per WhatsApp kontaktieren"
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}

      {/* Watermark / Footer - Subtle */}
      {showWatermark && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <div
            className="backdrop-blur-sm safe-area-bottom"
            style={{
              background: styles.footerBg,
              borderTop: `1px solid ${styles.footerBorder}`,
            }}
          >
            <div className="py-3 px-4 text-center">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors touch-manipulation hover:opacity-80"
                style={{ color: styles.footerText }}
              >
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                  style={{
                    backgroundColor: styles.primaryLight,
                    color: styles.primary,
                  }}
                >
                  Gratis
                </span>
                <span>Erstellt mit MenuApp</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
