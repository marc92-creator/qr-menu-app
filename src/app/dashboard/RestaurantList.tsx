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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Meine Restaurants</h1>
        <Button onClick={onAddNew}>
          + Neues Restaurant
        </Button>
      </div>

      {restaurants.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-semibold mb-2">Noch keine Restaurants</h2>
          <p className="text-gray-600 mb-6">
            Erstelle dein erstes Restaurant und generiere einen QR-Code für deine Speisekarte.
          </p>
          <Button onClick={onAddNew}>
            Restaurant hinzufügen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {restaurants.map((restaurant) => {
            const menuUrl = `${baseUrl}/m/${restaurant.slug}`;
            const isSelected = selectedRestaurant?.id === restaurant.id;

            return (
              <div
                key={restaurant.id}
                className={`bg-white rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => onSelect(restaurant)}
              >
                <div className="flex gap-4">
                  {/* QR Code Preview */}
                  <div className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm">
                    <QRCodeCanvas
                      value={menuUrl}
                      size={80}
                      level="M"
                      includeMargin={false}
                    />
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {restaurant.name}
                    </h3>
                    {restaurant.address && (
                      <p className="text-gray-600 text-sm truncate">
                        {restaurant.address}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          restaurant.is_active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {restaurant.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-emerald-600">
                          Ausgewählt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Link */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {menuUrl}
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
