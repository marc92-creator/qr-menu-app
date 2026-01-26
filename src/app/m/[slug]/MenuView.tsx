'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { formatPrice } from '@/lib/utils';

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  showWatermark: boolean;
}

export function MenuView({ restaurant, categories, menuItems, showWatermark }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
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
      const headerHeight = 140; // Approximate sticky header height
      const top = categorySection.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    category,
    items: menuItems.filter(item => item.category_id === category.id)
  }));

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
                    {items.map((item) => (
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
                          </div>
                          <div className="text-base font-bold text-emerald-600 flex-shrink-0 pl-2">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

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
