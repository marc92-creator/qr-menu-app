'use client';

import { useState, useRef } from 'react';
import { Restaurant, RestaurantStats } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeCanvas } from 'qrcode.react';
import { getMenuUrl } from '@/lib/utils';
import { generateTableTentPDF } from '@/components/TableTentPDF';

interface RestaurantListProps {
  restaurants: Restaurant[];
  restaurantStats: Record<string, RestaurantStats>;
  selectedRestaurant: Restaurant | null;
  onSelect: (restaurant: Restaurant) => void;
  onAddNew: () => void;
}

export function RestaurantList({
  restaurants,
  restaurantStats,
  selectedRestaurant,
  onSelect,
  onAddNew,
}: RestaurantListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const qrRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Copy link to clipboard
  const handleCopyLink = async (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    const menuUrl = getMenuUrl(restaurant.slug);

    try {
      await navigator.clipboard.writeText(menuUrl);
    } catch {
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
    const exportCanvas = document.createElement('canvas');
    const padding = 40;
    const textHeight = 80;
    exportCanvas.width = canvas.width + padding * 2;
    exportCanvas.height = canvas.height + padding * 2 + textHeight;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, padding, padding);

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(restaurant.name, exportCanvas.width / 2, canvas.height + padding + 30);

    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(menuUrl, exportCanvas.width / 2, canvas.height + padding + 50);

    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText('Scannen für Speisekarte', exportCanvas.width / 2, canvas.height + padding + 72);

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

  // Toggle expanded state
  const toggleExpanded = (e: React.MouseEvent, restaurantId: string) => {
    e.stopPropagation();
    setExpandedId(expandedId === restaurantId ? null : restaurantId);
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

  // Calculate setup progress
  const getSetupProgress = (stats: RestaurantStats | undefined) => {
    if (!stats) return { percent: 0, label: 'Einrichtung starten' };
    const hasCategories = stats.categoryCount > 0;
    const hasItems = stats.itemCount > 0;

    if (hasCategories && hasItems) return { percent: 100, label: 'Bereit' };
    if (hasCategories) return { percent: 50, label: 'Gerichte hinzufügen' };
    return { percent: 0, label: 'Kategorien erstellen' };
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
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
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
            const isExpanded = expandedId === restaurant.id;
            const stats = restaurantStats[restaurant.id];
            const progress = getSetupProgress(stats);

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
                      className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-white p-2.5 rounded-xl shadow-sm ring-1 ring-gray-100"
                    >
                      <QRCodeCanvas
                        value={menuUrl}
                        size={72}
                        level="M"
                        includeMargin={false}
                      />
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
                            {restaurant.name}
                          </h3>
                          {restaurant.address && (
                            <p className="text-gray-500 text-sm truncate mt-0.5 flex items-center gap-1">
                              <span className="text-gray-400">📍</span> {restaurant.address}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <span className="flex-shrink-0 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            Aktiv
                          </span>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="mt-3 flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">📁</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">{stats?.categoryCount || 0}</span>
                              <span className="text-gray-500 text-sm ml-1 hidden sm:inline">Kategorien</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">🍽️</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">{stats?.itemCount || 0}</span>
                              <span className="text-gray-500 text-sm ml-1 hidden sm:inline">Gerichte</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`
                            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                            ${restaurant.is_active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                            }
                          `}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${restaurant.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                          {restaurant.is_active ? 'Online' : 'Offline'}
                        </span>
                      </div>

                      {/* Progress Bar (if not complete) */}
                      {progress.percent < 100 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500">Setup</span>
                            <span className="text-emerald-600 font-medium">{progress.label}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                              style={{ width: `${progress.percent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">🔗</span>
                      <span className="text-gray-600 truncate font-mono text-xs">
                        {menuUrl.replace('https://', '')}
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleExpanded(e, restaurant.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-white transition-colors"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expandable Action Buttons */}
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-4 gap-2 sm:gap-3">
                      {/* Copy Link */}
                      <button
                        onClick={(e) => handleCopyLink(e, restaurant)}
                        className={`
                          flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
                          text-xs font-medium transition-all duration-200 touch-manipulation
                          ${isCopied
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200'
                          }
                        `}
                      >
                        {isCopied ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                        <span>{isCopied ? 'Kopiert!' : 'Link'}</span>
                      </button>

                      {/* Open Menu */}
                      <button
                        onClick={(e) => handleOpenMenu(e, restaurant)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
                          bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200
                          text-xs font-medium transition-all duration-200 touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Öffnen</span>
                      </button>

                      {/* Download QR */}
                      <button
                        onClick={(e) => handleDownloadQR(e, restaurant)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
                          bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200
                          text-xs font-medium transition-all duration-200 touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>QR-Code</span>
                      </button>

                      {/* Print Table Tent PDF */}
                      <button
                        onClick={(e) => handleDownloadPDF(e, restaurant)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
                          bg-gradient-to-br from-emerald-500 to-teal-500 text-white
                          text-xs font-medium transition-all duration-200 touch-manipulation
                          shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Drucken</span>
                      </button>
                    </div>

                    {/* Updated timestamp */}
                    <p className="text-center text-xs text-gray-400 mt-3">
                      Zuletzt aktualisiert: {formatRelativeTime(restaurant.updated_at)}
                    </p>
                  </div>
                </div>

                {/* Default Action - Collapsed state shows one-line actions */}
                {!isExpanded && (
                  <div className="px-5 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleCopyLink(e, restaurant)}
                        className={`
                          flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                          text-xs font-medium transition-all duration-200 touch-manipulation
                          ${isCopied
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-white text-gray-600 hover:bg-gray-100 ring-1 ring-gray-200'
                          }
                        `}
                      >
                        {isCopied ? '✓ Kopiert' : 'Link kopieren'}
                      </button>
                      <button
                        onClick={(e) => handleDownloadPDF(e, restaurant)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                          bg-emerald-500 text-white hover:bg-emerald-600
                          text-xs font-medium transition-all duration-200 touch-manipulation"
                      >
                        Tischaufsteller
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Tip */}
      {restaurants.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm">Tipp</h3>
              <p className="text-blue-700 text-sm mt-0.5">
                Klicke auf ein Restaurant um das Menü zu bearbeiten. Erweitere die Karte für mehr Aktionen.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
