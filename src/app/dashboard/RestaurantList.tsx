'use client';

import { useState, useRef } from 'react';
import { Restaurant } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeCanvas } from 'qrcode.react';
import { getMenuUrl } from '@/lib/utils';
import { generateTableTentPDF } from '@/components/TableTentPDF';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const qrRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Copy link to clipboard
  const handleCopyLink = async (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    const menuUrl = getMenuUrl(restaurant.slug);

    try {
      await navigator.clipboard.writeText(menuUrl);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = menuUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setCopiedId(restaurant.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download QR code as PNG
  const handleDownloadQR = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    const qrContainer = qrRefs.current.get(restaurant.id);
    const canvas = qrContainer?.querySelector('canvas');
    if (!canvas) return;

    const menuUrl = getMenuUrl(restaurant.slug);

    // Create a new canvas with padding and text
    const exportCanvas = document.createElement('canvas');
    const padding = 40;
    const textHeight = 80;
    exportCanvas.width = canvas.width + padding * 2;
    exportCanvas.height = canvas.height + padding * 2 + textHeight;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw QR code
    ctx.drawImage(canvas, padding, padding);

    // Add restaurant name below
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      restaurant.name,
      exportCanvas.width / 2,
      canvas.height + padding + 30
    );

    // Add URL below name
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(
      menuUrl,
      exportCanvas.width / 2,
      canvas.height + padding + 50
    );

    // Add "Scan for menu" text
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText(
      '📱 Scannen für Speisekarte',
      exportCanvas.width / 2,
      canvas.height + padding + 72
    );

    // Download
    const link = document.createElement('a');
    link.download = `qr-${restaurant.slug}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  // Open menu in new tab
  const handleOpenMenu = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    window.open(getMenuUrl(restaurant.slug), '_blank');
  };

  // Generate and download PDF table tent
  const handleDownloadPDF = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    const qrContainer = qrRefs.current.get(restaurant.id);
    const canvas = qrContainer?.querySelector('canvas');
    if (!canvas) return;

    generateTableTentPDF({
      restaurantName: restaurant.name,
      slug: restaurant.slug,
      qrCanvas: canvas,
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Meine Restaurants</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} verwalten
          </p>
        </div>
        <Button
          onClick={onAddNew}
          size="sm"
          className="text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Neues Restaurant</span>
          <span className="sm:hidden">Neu</span>
        </Button>
      </div>

      {restaurants.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm ring-1 ring-gray-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🍽️</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Noch keine Restaurants</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Erstelle dein erstes Restaurant und generiere einen QR-Code für deine Speisekarte.
          </p>
          <Button
            onClick={onAddNew}
            className="shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
          >
            Restaurant hinzufügen
          </Button>
        </div>
      ) : (
        /* Restaurant Cards */
        <div className="space-y-4">
          {restaurants.map((restaurant) => {
            const menuUrl = getMenuUrl(restaurant.slug);
            const isSelected = selectedRestaurant?.id === restaurant.id;
            const isCopied = copiedId === restaurant.id;

            return (
              <div
                key={restaurant.id}
                onClick={() => onSelect(restaurant)}
                className={`
                  bg-white rounded-2xl sm:rounded-3xl overflow-hidden
                  cursor-pointer transition-all duration-200 touch-manipulation
                  hover:shadow-lg
                  ${isSelected
                    ? 'ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'shadow-sm ring-1 ring-gray-100 hover:ring-gray-200'
                  }
                `}
              >
                {/* Main Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex gap-4 sm:gap-5">
                    {/* QR Code Preview */}
                    <div
                      ref={(el) => {
                        if (el) qrRefs.current.set(restaurant.id, el);
                      }}
                      className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm ring-1 ring-gray-100"
                    >
                      <QRCodeCanvas
                        value={menuUrl}
                        size={80}
                        level="M"
                        includeMargin={false}
                      />
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
                          {restaurant.name}
                        </h3>
                        {isSelected && (
                          <span className="flex-shrink-0 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                            ✓ Ausgewählt
                          </span>
                        )}
                      </div>

                      {restaurant.address && (
                        <p className="text-gray-500 text-sm truncate mt-1 flex items-center gap-1">
                          <span>📍</span> {restaurant.address}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <span
                          className={`
                            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                            ${restaurant.is_active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                            }
                          `}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${restaurant.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                          {restaurant.is_active ? 'Aktiv' : 'Inaktiv'}
                        </span>
                        <span className="text-xs text-gray-400">
                          Aktualisiert: {formatRelativeTime(restaurant.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* URL Bar */}
                <div className="px-5 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400 flex-shrink-0">🔗</span>
                    <span className="text-gray-600 truncate font-mono text-xs sm:text-sm">
                      {menuUrl}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2 sm:gap-3">
                    {/* Copy Link */}
                    <button
                      onClick={(e) => handleCopyLink(e, restaurant)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
                        text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px]
                        ${isCopied
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200'
                        }
                      `}
                    >
                      {isCopied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="hidden sm:inline">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="hidden sm:inline">Kopieren</span>
                        </>
                      )}
                    </button>

                    {/* Open Menu */}
                    <button
                      onClick={(e) => handleOpenMenu(e, restaurant)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
                        bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200
                        text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px]"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="hidden sm:inline">Öffnen</span>
                    </button>

                    {/* Download QR */}
                    <button
                      onClick={(e) => handleDownloadQR(e, restaurant)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
                        bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200
                        text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px]"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="hidden sm:inline">QR</span>
                    </button>

                    {/* Print Table Tent PDF */}
                    <button
                      onClick={(e) => handleDownloadPDF(e, restaurant)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
                        bg-emerald-500 text-white hover:bg-emerald-600
                        text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px]
                        shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span className="hidden sm:inline">Drucken</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
