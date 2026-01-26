'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Subscription } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface SettingsTabProps {
  restaurant: Restaurant;
  subscription: Subscription | null;
  onUpdate: () => void;
}

export function SettingsTab({ restaurant, subscription, onUpdate }: SettingsTabProps) {
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address || '');
  const [loading, setLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    const supabase = createClient();
    await supabase
      .from('restaurants')
      .update({ name, address: address || null })
      .eq('id', restaurant.id);

    setLoading(false);
    setSuccess(true);
    onUpdate();
  };

  const handleUpgrade = async () => {
    setUpgradeLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      alert('Fehler beim Erstellen der Checkout-Session');
    }

    setUpgradeLoading(false);
  };

  const isPremium = subscription?.plan === 'basic' && subscription?.status === 'active';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Einstellungen</h1>
        <p className="text-gray-500 mt-1">Verwalte dein Restaurant und Abo</p>
      </div>

      {/* Current Plan Badge */}
      <div className={`rounded-2xl p-5 text-white ${isPremium ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{isPremium ? '👑' : '🎁'}</span>
            </div>
            <div>
              <div className="font-bold text-lg">
                {isPremium ? 'Pro' : 'Demo-Version'}
              </div>
              <div className="text-white/80 text-sm">
                {isPremium ? 'Kein Wasserzeichen' : 'Testen Sie alle Features'}
              </div>
            </div>
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {isPremium ? 'Aktiv' : 'Demo'}
          </span>
        </div>
      </div>

      {/* Restaurant Settings */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
          <h2 className="font-bold text-lg text-gray-900">Restaurant-Informationen</h2>
        </div>

        <div className="space-y-4">
          <Input
            id="name"
            label="Restaurant-Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="address"
            label="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="z.B. Musterstraße 123, 12345 Berlin"
          />

          {success && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Erfolgreich gespeichert!</span>
            </div>
          )}

          <Button
            onClick={handleSave}
            loading={loading}
            className="rounded-xl shadow-lg shadow-emerald-500/20"
          >
            Änderungen speichern
          </Button>
        </div>
      </div>

      {/* Subscription - Only show upgrade if not premium */}
      {!isPremium && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
            <h2 className="font-bold text-lg text-gray-900">Upgrade auf Pro</h2>
          </div>

          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold text-gray-900">Pro</div>
                <div className="text-sm text-gray-500">Für professionelle Restaurants</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">9,99€</div>
                <div className="text-sm text-gray-500">/Monat</div>
              </div>
            </div>

            <ul className="space-y-2 mb-5">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kein Wasserzeichen auf der Speisekarte
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eigenes Logo hochladen
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority E-Mail Support
              </li>
            </ul>

            <Button
              className="w-full rounded-xl shadow-lg shadow-emerald-500/20"
              onClick={handleUpgrade}
              loading={upgradeLoading}
            >
              Jetzt upgraden
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Demo-Version aktiv · Upgrade für volle Funktionen ohne Wasserzeichen
            </p>
          </div>
        </div>
      )}

      {/* Trust & Support Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">🛡️</span>
          </div>
          <h2 className="font-bold text-lg text-gray-900">Sicherheit & Support</h2>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-2xl">🇩🇪</span>
            <div>
              <div className="font-semibold text-sm text-gray-900">Server in Deutschland</div>
              <div className="text-xs text-gray-500">Frankfurt am Main</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-2xl">🔒</span>
            <div>
              <div className="font-semibold text-sm text-gray-900">DSGVO-konform</div>
              <div className="text-xs text-gray-500">Datenschutz garantiert</div>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="p-4 bg-blue-50 rounded-xl mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <div className="font-semibold text-gray-900">Brauchst du Hilfe?</div>
              <a
                href="mailto:support@menuapp.de"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                support@menuapp.de
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/datenschutz" className="text-gray-500 hover:text-gray-900 transition-colors">
            Datenschutz
          </Link>
          <Link href="/impressum" className="text-gray-500 hover:text-gray-900 transition-colors">
            Impressum
          </Link>
          <Link href="/agb" className="text-gray-500 hover:text-gray-900 transition-colors">
            AGB
          </Link>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-sm ring-1 ring-red-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">⚠️</span>
          </div>
          <h2 className="font-bold text-lg text-red-600">Gefahrenzone</h2>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          Wenn du dein Restaurant löschst, werden alle Daten (Kategorien, Gerichte, QR-Codes) unwiderruflich gelöscht.
        </p>

        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl"
          onClick={() => alert('Diese Funktion ist noch nicht verfügbar.')}
        >
          Restaurant löschen
        </Button>
      </div>
    </div>
  );
}
