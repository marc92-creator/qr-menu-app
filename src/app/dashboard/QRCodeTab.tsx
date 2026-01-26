'use client';

import { useState, useRef } from 'react';
import { Restaurant } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getMenuUrl } from '@/lib/utils';
import { generateTableTentPDF } from '@/components/TableTentPDF';

interface QRCodeTabProps {
  restaurant: Restaurant;
}

export function QRCodeTab({ restaurant }: QRCodeTabProps) {
  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const menuUrl = getMenuUrl(restaurant.slug);

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

  const handleDownloadPDF = () => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    generateTableTentPDF({
      restaurantName: restaurant.name,
      slug: restaurant.slug,
      qrCanvas: canvas,
    });
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
            onClick={handleDownloadPDF}
            className="w-full min-h-[48px] touch-manipulation shadow-lg shadow-emerald-500/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Tischaufsteller drucken
          </Button>
        </div>

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
