'use client';

import { Restaurant } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeCanvas } from 'qrcode.react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelect: (restaurant: Restaurant) => void;
  onAddNew: () => void;
}

export function RestaurantList({
  restaurants,
  selectedRestaurant,
  onSelect,
  onAddNew,
}: RestaurantListProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Meine Restaurants</h1>
        <Button onClick={onAddNew} size="sm" className="text-sm">
          <span className="hidden sm:inline">+ Neues Restaurant</span>
          <span className="sm:hidden">+ Neu</span>
        </Button>
      </div>

      {restaurants.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center">
          <div className="text-5xl sm:text-6xl mb-4">🍽️</div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Noch keine Restaurants</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Erstelle dein erstes Restaurant und generiere einen QR-Code.
          </p>
          <Button onClick={onAddNew} className="w-full sm:w-auto">
            Restaurant hinzufügen
          </Button>
        </div>
      ) : (
        /* Restaurant Grid - Single column on mobile */
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
          {restaurants.map((restaurant) => {
            const menuUrl = `${baseUrl}/m/${restaurant.slug}`;
            const isSelected = selectedRestaurant?.id === restaurant.id;

            return (
              <div
                key={restaurant.id}
                onClick={() => onSelect(restaurant)}
                className={`
                  bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6
                  cursor-pointer transition-all touch-manipulation
                  active:bg-gray-50 active:scale-[0.99]
                  ${isSelected ? 'ring-2 ring-emerald-500 shadow-md' : 'shadow-sm'}
                `}
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* QR Code Preview */}
                  <div className="flex-shrink-0 bg-white p-1.5 sm:p-2 rounded-lg shadow-sm border border-gray-100">
                    <QRCodeCanvas
                      value={menuUrl}
                      size={60}
                      level="M"
                      includeMargin={false}
                    />
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {restaurant.name}
                    </h3>
                    {restaurant.address && (
                      <p className="text-gray-500 text-xs sm:text-sm truncate mt-0.5">
                        {restaurant.address}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span
                        className={`
                          inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${restaurant.is_active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}
                      >
                        {restaurant.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-emerald-600 font-medium">
                          ✓ Ausgewählt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Link - Tap to open */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <a
                    href={menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      text-xs sm:text-sm text-emerald-600 font-medium
                      active:text-emerald-700 touch-manipulation
                      break-all
                    "
                  >
                    {menuUrl} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
