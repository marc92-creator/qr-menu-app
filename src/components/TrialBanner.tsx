'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Restaurant, Subscription } from '@/types/database';
import { getAccessStatus, getTrialDaysRemaining, isPro } from '@/hooks/useSubscription';
import { Button } from './Button';

interface TrialBannerProps {
  restaurant: Restaurant;
  subscription: Subscription | null;
}

export function TrialBanner({ restaurant, subscription }: TrialBannerProps) {
  const [loading, setLoading] = useState(false);
  const status = getAccessStatus(subscription, restaurant);
  const daysRemaining = getTrialDaysRemaining(restaurant);

  // Don't show banner for Pro users
  if (isPro(subscription)) return null;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = '/register?upgrade=true';
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Fehler beim Upgrade. Bitte kontaktiere info@menuapp.de');
    } finally {
      setLoading(false);
    }
  };

  // Trial expired
  if (status === 'expired') {
    return (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <h3 className="font-semibold">Testphase abgelaufen</h3>
              <p className="text-sm text-white/90">
                Upgrade auf Pro um alle Features weiterhin zu nutzen
              </p>
            </div>
          </div>
          <Button
            onClick={handleUpgrade}
            loading={loading}
            className="bg-white text-red-600 hover:bg-gray-100 shadow-lg whitespace-nowrap"
          >
            Jetzt upgraden - 9,99€/Monat
          </Button>
        </div>
      </div>
    );
  }

  // Trial active - show remaining days
  if (status === 'trial') {
    // Only show prominent banner in last 5 days
    if (daysRemaining > 5) {
      return (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 px-4 py-3 rounded-xl mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <span className="text-lg">✨</span>
              <span className="text-sm font-medium">
                Testphase: noch {daysRemaining} {daysRemaining === 1 ? 'Tag' : 'Tage'} kostenlos
              </span>
            </div>
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); handleUpgrade(); }}
              className="text-sm text-emerald-700 hover:text-emerald-900 font-medium underline underline-offset-2"
            >
              Pro-Vorteile ansehen
            </Link>
          </div>
        </div>
      );
    }

    // Last 5 days - more prominent
    const urgencyColor = daysRemaining <= 2 ? 'amber' : 'blue';
    return (
      <div className={`bg-gradient-to-r from-${urgencyColor}-50 to-orange-50 border border-${urgencyColor}-200 px-4 py-3 rounded-xl mb-6`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-${urgencyColor}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <span className="text-xl">{daysRemaining <= 2 ? '⚠️' : '⏳'}</span>
            </div>
            <div>
              <h3 className={`font-semibold text-${urgencyColor}-900`}>
                {daysRemaining === 0 ? 'Letzter Tag!' : daysRemaining === 1 ? 'Noch 1 Tag!' : `Noch ${daysRemaining} Tage`}
              </h3>
              <p className={`text-sm text-${urgencyColor}-700`}>
                Deine kostenlose Testphase endet bald
              </p>
            </div>
          </div>
          <Button
            onClick={handleUpgrade}
            loading={loading}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-lg whitespace-nowrap"
          >
            Jetzt Pro sichern
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Simple trial badge for header/sidebar
 */
export function TrialBadge({ restaurant, subscription }: TrialBannerProps) {
  const status = getAccessStatus(subscription, restaurant);
  const daysRemaining = getTrialDaysRemaining(restaurant);

  if (isPro(subscription)) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Pro
      </span>
    );
  }

  if (status === 'trial') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
        <span>✨</span>
        Test: {daysRemaining}d
      </span>
    );
  }

  if (status === 'expired') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
        <span>⏰</span>
        Abgelaufen
      </span>
    );
  }

  return null;
}
