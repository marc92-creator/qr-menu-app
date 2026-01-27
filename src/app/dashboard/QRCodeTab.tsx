'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getMenuUrl } from '@/lib/utils';
import { generateTableTentPDF, generateA6TableTent } from '@/components/TableTentPDF';
import { markQrStepCompleted } from '@/components/OnboardingChecklist';
import { generateMenuPDF } from '@/components/MenuPDFExport';

interface QRCodeTabProps {
  restaurant: Restaurant;
  categories?: Category[];
  menuItems?: MenuItem[];
}

type PDFFormat = 'a4' | 'a6';

export function QRCodeTab({ restaurant, categories = [], menuItems = [] }: QRCodeTabProps) {
  const [copied, setCopied] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const menuUrl = getMenuUrl(restaurant.slug);

  const handleDownloadMenuPDF = () => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    generateMenuPDF({
      restaurant,
      categories,
      menuItems,
      includeAllergens: true,
      includeQRCode: true,
      qrCanvas: canvas,
    });
  };

  // Check if Web Share API is available
  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  // Mark QR step as completed when user visits QR tab
  useEffect(() => {
    markQrStepCompleted();
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = menuUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${restaurant.name} - Speisekarte`,
          text: `Schau dir die Speisekarte von ${restaurant.name} an:`,
          url: menuUrl,
        });
      } catch (error) {
        // User cancelled or share failed - fall back to copy
        if ((error as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQRCode = () => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `qr-code-${restaurant.slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadPDF = (format: PDFFormat) => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    const options = {
      restaurantName: restaurant.name,
      slug: restaurant.slug,
      qrCanvas: canvas,
    };

    if (format === 'a6') {
      generateA6TableTent(options);
    } else {
      generateTableTentPDF(options);
    }

    setShowFormatModal(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">QR-Code & Link teilen</h1>

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm ring-1 ring-gray-100">
        {/* QR Code - Centered, max width on mobile */}
        <div className="flex justify-center" ref={qrContainerRef}>
          <QRCodeGenerator
            slug={restaurant.slug}
            restaurantName={restaurant.name}
            size={200}
          />
        </div>

        {/* Link Section */}
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <p className="text-xs text-gray-500 mb-2 font-medium">Dein Menü-Link:</p>
          <div className="flex items-center gap-2">
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-sm text-emerald-600 font-medium break-all hover:text-emerald-700 transition-colors"
            >
              {menuUrl}
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all flex-shrink-0"
              title="Link kopieren"
            >
              {copied ? (
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Primary Action - Share or Copy */}
        <div className="mt-6 space-y-3">
          {canShare ? (
            <Button
              onClick={handleShareLink}
              className="w-full min-h-[52px] touch-manipulation shadow-lg shadow-emerald-500/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Link teilen
            </Button>
          ) : (
            <Button
              onClick={handleCopyLink}
              className="w-full min-h-[52px] touch-manipulation shadow-lg shadow-emerald-500/20"
            >
              {copied ? '✓ Link kopiert!' : 'Link kopieren'}
            </Button>
          )}
        </div>

        {/* Download Options */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Drucken & Download</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowFormatModal(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all group"
            >
              <div className="w-10 h-14 bg-white rounded-lg border border-gray-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Tischaufsteller</span>
              <span className="text-xs text-gray-500">PDF mit QR-Code</span>
            </button>

            <button
              onClick={handleDownloadQRCode}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all group"
            >
              <div className="w-10 h-14 bg-white rounded-lg border border-gray-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v1h-1v-1zm-1 1h1v1h-1v-1zm2 0h1v1h-1v-1zm1 1h1v1h-1v-1zm-2 0h1v1h-1v-1zm3 0h1v1h-1v-1zm-1 1h1v1h-1v-1zm-2 0h1v1h-1v-1zm1 1h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 1h1v1h-1v-1zm2 0h1v1h-1v-1z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Nur QR-Code</span>
              <span className="text-xs text-gray-500">PNG zum Aufkleben</span>
            </button>

            {categories.length > 0 && (
              <button
                onClick={handleDownloadMenuPDF}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all group col-span-2"
              >
                <div className="w-10 h-14 bg-white rounded-lg border border-gray-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Komplette Speisekarte</span>
                <span className="text-xs text-gray-500">PDF mit allen Gerichten, Preisen & Allergenen</span>
              </button>
            )}
          </div>
        </div>

        {/* Format Selection Modal */}
        {showFormatModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFormatModal(false);
            }}
          >
            <div
              className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md safe-area-bottom shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📄</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Format wählen</h2>
                </div>
                <button
                  onClick={() => setShowFormatModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleDownloadPDF('a6')}
                  className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl border-2 border-emerald-200 hover:border-emerald-300 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-white rounded-lg border border-emerald-300 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-emerald-600">A6</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        Kompakt (A6)
                        <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Empfohlen</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Klein & handlich, ideal für kleine Tische
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDownloadPDF('a4')}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-white rounded-lg border border-gray-300 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-gray-600">A4</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Standard (A4)</div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Mit Faltanleitung, gut sichtbar
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-400 text-center">
                Drucke auf festem Papier (mind. 200g/m²) für beste Ergebnisse
              </p>
            </div>
          </div>
        )}

        {/* Tip Box */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="font-semibold text-emerald-900 mb-2 text-sm sm:text-base flex items-center gap-2">
            <span>💡</span> Mehrere Möglichkeiten
          </h3>
          <ul className="text-emerald-800 text-xs sm:text-sm leading-relaxed space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span><strong>Link teilen</strong> – Per WhatsApp, Social Media oder E-Mail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span><strong>Tischaufsteller</strong> – PDF ausdrucken und auf Tische stellen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span><strong>Nur QR-Code</strong> – Auf Flyer, Visitenkarten oder Wände kleben</span>
            </li>
          </ul>
        </div>

        {/* TV Mode Box */}
        <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📺</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 text-sm sm:text-base">
                TV-Modus für Fernseher
              </h3>
              <p className="text-purple-700 text-xs sm:text-sm mt-1">
                Perfekt für Dönerläden mit Bildschirm-Anzeige. Auto-Scroll durch alle Kategorien.
              </p>
              <a
                href={`${menuUrl}/tv`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium mt-2"
              >
                TV-Modus öffnen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
