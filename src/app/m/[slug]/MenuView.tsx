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
  };

  const activeCategoryItems = menuItems.filter((item) => item.category_id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-6">
          <div className="flex items-center gap-4">
            {restaurant.logo_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
              {restaurant.address && (
                <p className="text-gray-600 text-sm mt-1">{restaurant.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div
            ref={tabsRef}
            className="flex overflow-x-auto px-4 pb-2 gap-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Menu Items */}
      <main className="px-4 py-6 pb-24">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Keine Speisekarte verfügbar.</p>
          </div>
        ) : activeCategoryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Keine Gerichte in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeCategoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 mt-1 text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="text-lg font-bold text-emerald-500 flex-shrink-0">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Watermark */}
      {showWatermark && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 text-center text-sm">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Erstellt mit MenuApp - Kostenlos testen →
          </a>
        </div>
      )}
    </div>
  );
}
