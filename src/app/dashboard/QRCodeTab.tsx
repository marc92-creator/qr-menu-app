'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getMenuUrl } from '@/lib/utils';
import { generateTableTentPDF, generateA6TableTent } from '@/components/TableTentPDF';
import { markQrStepCompleted } from '@/components/OnboardingChecklist';

interface QRCodeTabProps {
  restaurant: Restaurant;
}

type PDFFormat = 'a4' | 'a6';

export function QRCodeTab({ restaurant }: QRCodeTabProps) {
  const [copied, setCopied] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const menuUrl = getMenuUrl(restaurant.slug);

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
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">QR-Code</h1>

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8">
        {/* QR Code - Centered, max width on mobile */}
        <div className="flex justify-center" ref={qrContainerRef}>
          <QRCodeGenerator
            slug={restaurant.slug}
            restaurantName={restaurant.name}
            size={200}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="w-full min-h-[48px] touch-manipulation"
          >
            {copied ? '✓ Kopiert!' : 'Link kopieren'}
          </Button>
          <Button
            onClick={() => setShowFormatModal(true)}
            className="w-full min-h-[48px] touch-manipulation shadow-lg shadow-emerald-500/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Tischaufsteller drucken
          </Button>
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

        {/* Preview Link */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Menü-Link:</p>
          <a
            href={menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-600 font-medium break-all active:text-emerald-700"
          >
            {menuUrl}
          </a>
        </div>

        {/* Tip Box */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="font-semibold text-emerald-900 mb-1 text-sm sm:text-base">
            💡 Tipp
          </h3>
          <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
            Drucke den QR-Code aus und lege ihn auf jeden Tisch. Gäste scannen
            einfach mit dem Handy und sehen sofort dein Menü.
          </p>
        </div>
      </div>
    </div>
  );
}
