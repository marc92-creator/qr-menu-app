'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  showWatermark: boolean;
}

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

export function MenuView({ restaurant, categories, menuItems, showWatermark }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [showAllergenLegend, setShowAllergenLegend] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLElement>>(new Map());

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
      const headerHeight = 160;
      const top = categorySection.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Check if any menu item has allergens
  const hasAnyAllergens = menuItems.some(item => item.allergens && item.allergens.length > 0);

  // Get all unique allergens used in the menu
  const usedAllergenIds = Array.from(new Set(menuItems.flatMap(item => item.allergens || [])));
  const usedAllergens = getAllergensByIds(usedAllergenIds);

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    category,
    items: menuItems.filter(item => item.category_id === category.id)
  }));

  const handleAllergenClick = (allergenId: string) => {
    setSelectedAllergen(selectedAllergen === allergenId ? null : allergenId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none" />

      {/* Header - Sticky with Glassmorphism */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        {/* Restaurant Info */}
        <div className="px-5 py-5 md:px-8">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
            {restaurant.logo_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover flex-shrink-0 shadow-md ring-1 ring-black/5"
              />
            ) : (
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl md:text-3xl text-white font-bold">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate tracking-tight">
                {restaurant.name}
              </h1>
              {restaurant.address && (
                <p className="text-sm md:text-base text-gray-500 truncate mt-0.5">
                  📍 {restaurant.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        {categories.length > 0 && (
          <div
            ref={tabsRef}
            className="flex overflow-x-auto px-5 pb-4 gap-3 scrollbar-hide md:px-8 md:justify-center"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`
                  min-h-[48px] px-6 py-3 rounded-2xl whitespace-nowrap
                  text-base font-semibold transition-all duration-200 flex-shrink-0
                  active:scale-95 touch-manipulation
                  ${activeCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm ring-1 ring-gray-100'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Menu Items - All Categories */}
      <main className={`${showWatermark ? 'pb-24' : 'pb-12'} px-4 md:px-8`}>
        <div className="max-w-3xl mx-auto">
          {categories.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="text-6xl mb-6">🍽️</div>
              <p className="text-gray-500 text-lg">Keine Speisekarte verfügbar.</p>
            </div>
          ) : (
            <div className="space-y-8 pt-6">
              {itemsByCategory.map(({ category, items }) => (
                <section
                  key={category.id}
                  ref={(el) => {
                    if (el) categoryRefs.current.set(category.id, el);
                  }}
                  className="scroll-mt-40"
                >
                  {/* Category Header */}
                  <div className="sticky top-[140px] z-10 py-3 -mx-4 px-4 md:-mx-8 md:px-8">
                    <div className="bg-[#FAFAFA]/90 backdrop-blur-sm rounded-xl py-2">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                        {category.name}
                      </h2>
                    </div>
                  </div>

                  {/* Items */}
                  {items.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                      Keine Gerichte in dieser Kategorie
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => {
                        const itemAllergens = getAllergensByIds(item.allergens || []);

                        return (
                          <article
                            key={item.id}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 ring-1 ring-gray-100/50"
                          >
                            <div className="flex justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                                  {item.name}
                                </h3>
                                {item.description && (
                                  <p className="text-gray-500 mt-1.5 leading-relaxed line-clamp-2 text-[15px]">
                                    {item.description}
                                  </p>
                                )}
                                {/* Allergen Badges */}
                                {itemAllergens.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {itemAllergens.map((allergen) => (
                                      <button
                                        key={allergen.id}
                                        onClick={() => handleAllergenClick(allergen.id)}
                                        className={`
                                          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                          text-xs font-medium transition-all duration-200 touch-manipulation
                                          ${selectedAllergen === allergen.id
                                            ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300 scale-105'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'
                                          }
                                        `}
                                      >
                                        <span>{allergen.icon}</span>
                                        <span className="hidden sm:inline">{allergen.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0 pl-3">
                                <span className="text-lg md:text-xl font-bold text-emerald-600">
                                  {formatPrice(item.price)}
                                </span>
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
                <p className="text-sm text-gray-400">
                  Zuletzt aktualisiert: {formatLastUpdated(restaurant.updated_at)}
                </p>
              </div>

              {/* Allergen Legend */}
              {hasAnyAllergens && (
                <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100/50 overflow-hidden">
                  <button
                    onClick={() => setShowAllergenLegend(!showAllergenLegend)}
                    className="w-full flex items-center justify-between p-5 text-left touch-manipulation hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">ℹ️</span>
                      <span className="font-semibold text-gray-900 text-lg">
                        Allergen-Informationen
                      </span>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${showAllergenLegend ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAllergenLegend && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {usedAllergens.map((allergen) => (
                          <div
                            key={allergen.id}
                            className={`
                              flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                              ${selectedAllergen === allergen.id
                                ? 'bg-amber-50 ring-2 ring-amber-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                              }
                            `}
                          >
                            <span className="text-2xl">{allergen.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-900">{allergen.name}</div>
                              <div className="text-sm text-gray-500">{allergen.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 mt-4 text-center">
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
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 animate-in slide-in-from-bottom-4 duration-200"
          onClick={() => setSelectedAllergen(null)}
        >
          <div className="bg-white rounded-2xl p-4 shadow-xl ring-1 ring-gray-100 cursor-pointer">
            {(() => {
              const allergen = ALLERGENS.find(a => a.id === selectedAllergen);
              if (!allergen) return null;
              return (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{allergen.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{allergen.name}</div>
                    <div className="text-sm text-gray-500">{allergen.description}</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-2 touch-manipulation transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Watermark / Demo Badge - Glassmorphism */}
      {showWatermark && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <div className="bg-gray-900/80 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
            <div className="py-4 px-6 text-center">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors touch-manipulation"
              >
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Demo</span>
                <span>·</span>
                <span>Erstellt mit MenuApp</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
