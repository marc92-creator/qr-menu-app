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

export function MenuView({ restaurant, categories, menuItems, showWatermark }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [showAllergenLegend, setShowAllergenLegend] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

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
  const usedAllergenIds = [...new Set(menuItems.flatMap(item => item.allergens || []))];
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
    <div className="min-h-screen bg-white">
      {/* Header - Sticky */}
      <header className="bg-white sticky top-0 z-20 border-b border-gray-100">
        {/* Restaurant Info */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            {restaurant.logo_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {restaurant.name}
              </h1>
              {restaurant.address && (
                <p className="text-sm text-gray-500 truncate">
                  {restaurant.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        {categories.length > 0 && (
          <div
            ref={tabsRef}
            className="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide"
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
                  min-h-[44px] px-4 py-2 rounded-full whitespace-nowrap
                  text-[15px] font-semibold transition-all flex-shrink-0
                  active:scale-95 touch-manipulation
                  ${activeCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 active:bg-gray-200'
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
      <main className={`${showWatermark ? 'pb-20' : 'pb-8'}`}>
        {categories.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-gray-500 text-base">Keine Speisekarte verfügbar.</p>
          </div>
        ) : (
          <div>
            {itemsByCategory.map(({ category, items }) => (
              <div
                key={category.id}
                ref={(el) => {
                  if (el) categoryRefs.current.set(category.id, el);
                }}
                className="scroll-mt-32"
              >
                {/* Category Header */}
                <div className="sticky top-[120px] z-10 bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    {category.name}
                  </h2>
                </div>

                {/* Items */}
                {items.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    Keine Gerichte in dieser Kategorie
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => {
                      const itemAllergens = getAllergensByIds(item.allergens || []);

                      return (
                        <div
                          key={item.id}
                          className="px-4 py-4 active:bg-gray-50 transition-colors touch-manipulation"
                        >
                          <div className="flex justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                                {item.name}
                              </h3>
                              {item.description && (
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              {/* Allergen Icons */}
                              {itemAllergens.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {itemAllergens.map((allergen) => (
                                    <button
                                      key={allergen.id}
                                      onClick={() => handleAllergenClick(allergen.id)}
                                      className={`
                                        w-6 h-6 flex items-center justify-center rounded-full
                                        text-sm transition-all touch-manipulation
                                        ${selectedAllergen === allergen.id
                                          ? 'bg-amber-100 ring-2 ring-amber-400 scale-110'
                                          : 'bg-gray-100 active:bg-gray-200'
                                        }
                                      `}
                                      title={allergen.name}
                                    >
                                      {allergen.icon}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-base font-bold text-emerald-600 flex-shrink-0 pl-2">
                              {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Allergen Legend */}
            {hasAnyAllergens && (
              <div className="px-4 py-6 border-t border-gray-100">
                <button
                  onClick={() => setShowAllergenLegend(!showAllergenLegend)}
                  className="w-full flex items-center justify-between py-3 text-left touch-manipulation"
                >
                  <span className="font-semibold text-gray-900">
                    Allergen-Informationen
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showAllergenLegend ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAllergenLegend && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {usedAllergens.map((allergen) => (
                      <div
                        key={allergen.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg transition-colors
                          ${selectedAllergen === allergen.id ? 'bg-amber-50' : 'bg-gray-50'}
                        `}
                      >
                        <span className="text-xl">{allergen.icon}</span>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{allergen.name}</div>
                          <div className="text-xs text-gray-500">{allergen.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-4">
                  Bei Fragen zu Allergenen wenden Sie sich bitte an unser Personal.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Selected Allergen Tooltip */}
      {selectedAllergen && (
        <div
          className="fixed bottom-20 left-4 right-4 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-lg z-40 safe-area-bottom"
          onClick={() => setSelectedAllergen(null)}
        >
          {(() => {
            const allergen = ALLERGENS.find(a => a.id === selectedAllergen);
            if (!allergen) return null;
            return (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{allergen.icon}</span>
                <div>
                  <div className="font-semibold text-amber-900">{allergen.name}</div>
                  <div className="text-sm text-amber-700">{allergen.description}</div>
                </div>
                <button className="ml-auto text-amber-600 p-2 touch-manipulation">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* Watermark / Beta Badge */}
      {showWatermark && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white py-3 px-4 text-center safe-area-bottom z-30">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium active:opacity-70 touch-manipulation"
          >
            Erstellt mit MenuApp (Beta) →
          </a>
        </div>
      )}
    </div>
  );
}
