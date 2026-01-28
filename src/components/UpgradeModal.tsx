'use client';

import { useState } from 'react';
import { Button } from './Button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description?: string;
  isSandbox?: boolean; // True if user is in sandbox mode (not logged in)
}

export function UpgradeModal({ isOpen, onClose, feature, description, isSandbox = false }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    // If in sandbox mode, redirect to register first
    if (isSandbox) {
      window.location.href = '/register?upgrade=true';
      return;
    }

    setLoading(true);
    try {
      // Try to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      // If user is not logged in, redirect to register
      if (response.status === 401) {
        window.location.href = '/register?upgrade=true';
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('No checkout URL');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Show contact info as fallback
      alert('Für Upgrade-Anfragen kontaktiere uns bitte unter:\n\ninfo@menuapp.de\n\nOder registriere dich zuerst unter /register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pro Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Pro Feature
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {feature}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          {description || 'Dieses Feature ist nur für Pro-Nutzer verfügbar.'}
        </p>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <p className="text-sm font-medium text-gray-900 mb-3">Pro beinhaltet:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unbegrenzte Restaurants, Kategorien & Gerichte
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Alle 5 Premium-Themes
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Eigenes Logo-Upload
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mehrsprachige Speisekarte (DE/EN)
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              TV-Modus & PDF-Export
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Kein Wasserzeichen
            </li>
          </ul>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">9,99€</span>
          <span className="text-gray-500">/Monat</span>
        </div>

        {/* Sandbox note */}
        {isSandbox && (
          <div className="bg-blue-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm text-blue-800">
              Registriere dich kostenlos, um Pro freizuschalten.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 min-h-[52px] rounded-xl"
            onClick={onClose}
          >
            Später
          </Button>
          <Button
            className="flex-1 min-h-[52px] rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/20"
            onClick={handleUpgrade}
            loading={loading}
          >
            {isSandbox ? 'Jetzt registrieren' : 'Jetzt upgraden'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Pro Badge component for locked features
 */
export function ProBadge({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full hover:from-amber-500 hover:to-orange-600 transition-all"
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      Pro
    </button>
  );
}

/**
 * Limit reached message component
 */
export function LimitReachedMessage({
  type,
  max,
  onUpgrade
}: {
  type: 'restaurants' | 'categories' | 'items';
  max: number;
  onUpgrade: () => void;
}) {
  const labels = {
    restaurants: { singular: 'Restaurant', plural: 'Restaurants' },
    categories: { singular: 'Kategorie', plural: 'Kategorien' },
    items: { singular: 'Gericht', plural: 'Gerichte' },
  };

  const label = labels[type];

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
      <p className="text-amber-800 font-medium mb-2">
        Du hast das Maximum von {max} {max === 1 ? label.singular : label.plural} erreicht.
      </p>
      <button
        onClick={onUpgrade}
        className="text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-2"
      >
        Upgrade auf Pro für unbegrenzte {label.plural}
      </button>
    </div>
  );
}
