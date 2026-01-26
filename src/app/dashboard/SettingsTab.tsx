'use client';

import { useState } from 'react';
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
      <h1 className="text-2xl font-bold">Einstellungen</h1>

      {/* Restaurant Settings */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">Restaurant-Informationen</h2>

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
            <p className="text-emerald-500 text-sm">Erfolgreich gespeichert!</p>
          )}

          <Button onClick={handleSave} loading={loading}>
            Speichern
          </Button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">Abo-Plan</h2>

        {isPremium ? (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-emerald-700">Basic Plan aktiv</div>
              <div className="text-sm text-emerald-600">
                Kein Wasserzeichen auf deiner Speisekarte
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg">🆓</span>
              </div>
              <div>
                <div className="font-semibold">Free Plan</div>
                <div className="text-sm text-gray-600">
                  Mit &quot;Erstellt mit MenuApp&quot; Wasserzeichen
                </div>
              </div>
            </div>

            <div className="p-4 border-2 border-emerald-500 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-emerald-700">Basic Plan</div>
                  <div className="text-sm text-gray-600">Kein Wasserzeichen</div>
                </div>
                <div className="text-2xl font-bold">
                  9,99€<span className="text-sm font-normal text-gray-500">/Monat</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleUpgrade} loading={upgradeLoading}>
                Jetzt upgraden
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4 text-red-600">Gefahrenzone</h2>
        <p className="text-gray-600 text-sm mb-4">
          Wenn du dein Restaurant löschst, werden alle Daten unwiderruflich gelöscht.
        </p>
        <Button
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50"
          onClick={() => alert('Diese Funktion ist noch nicht verfügbar.')}
        >
          Restaurant löschen
        </Button>
      </div>
    </div>
  );
}
