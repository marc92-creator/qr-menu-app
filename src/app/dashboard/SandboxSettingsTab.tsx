'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Restaurant, OpeningHours, MenuTheme, MenuLanguage } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { THEME_LIST, isGradient } from '@/lib/themes';
import { updateSandboxRestaurant } from '@/lib/sandboxStorage';
import { LANGUAGE_OPTIONS } from '@/lib/translations';

interface SandboxSettingsTabProps {
  restaurant: Restaurant;
  onUpdate: () => void;
}

const DAYS = [
  { key: 'mo', label: 'Montag' },
  { key: 'di', label: 'Dienstag' },
  { key: 'mi', label: 'Mittwoch' },
  { key: 'do', label: 'Donnerstag' },
  { key: 'fr', label: 'Freitag' },
  { key: 'sa', label: 'Samstag' },
  { key: 'so', label: 'Sonntag' },
] as const;

const DEFAULT_HOURS: OpeningHours = {
  mo: { open: '11:00', close: '22:00' },
  di: { open: '11:00', close: '22:00' },
  mi: { open: '11:00', close: '22:00' },
  do: { open: '11:00', close: '22:00' },
  fr: { open: '11:00', close: '23:00' },
  sa: { open: '12:00', close: '23:00' },
  so: { open: '12:00', close: '21:00' },
};

export function SandboxSettingsTab({ restaurant, onUpdate }: SandboxSettingsTabProps) {
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address || '');
  const [whatsappNumber, setWhatsappNumber] = useState(restaurant.whatsapp_number || '');
  const [openingHours, setOpeningHours] = useState<OpeningHours>(
    restaurant.opening_hours || DEFAULT_HOURS
  );
  const [theme, setTheme] = useState<MenuTheme>(restaurant.theme || 'classic');
  const [menuLanguage, setMenuLanguage] = useState<MenuLanguage>(restaurant.menu_language || 'de');
  const [autoImages, setAutoImages] = useState(restaurant.auto_images !== false);
  const [success, setSuccess] = useState(false);

  const updateDayHours = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setSuccess(false);

    // Save to localStorage via sandbox storage
    updateSandboxRestaurant({
      name,
      address: address || null,
      whatsapp_number: whatsappNumber || null,
      opening_hours: openingHours,
      theme,
      menu_language: menuLanguage,
      auto_images: autoImages,
    });

    setSuccess(true);
    onUpdate();

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Einstellungen</h1>
        <p className="text-gray-500 mt-1">Konfiguriere dein Restaurant</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-emerald-800 font-medium">Einstellungen gespeichert!</span>
        </div>
      )}

      {/* Restaurant Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Restaurant-Informationen</h2>
        <div className="space-y-4">
          <Input
            id="name"
            label="Restaurant-Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Döner Palace"
          />
          <Input
            id="address"
            label="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="z.B. Musterstraße 1, 12345 Berlin"
          />
          <Input
            id="whatsapp"
            label="WhatsApp-Nummer (optional)"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="z.B. +49 123 456789"
          />
          <p className="text-sm text-gray-500">
            Wenn angegeben, wird ein WhatsApp-Button auf deiner Speisekarte angezeigt.
          </p>
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Sprache der Speisekarte</h2>
        <p className="text-sm text-gray-500 mb-4">
          Wähle die Sprache für die öffentliche Speisekarte. Betrifft nur die UI-Texte (Geöffnet/Geschlossen, Badges, etc.).
        </p>
        <div className="flex gap-3">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setMenuLanguage(option.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all
                ${menuLanguage === option.id
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <span className="text-2xl">{option.flag}</span>
              <span className={`font-medium ${menuLanguage === option.id ? 'text-emerald-700' : 'text-gray-700'}`}>
                {option.label}
              </span>
              {menuLanguage === option.id && (
                <svg className="w-5 h-5 text-emerald-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Opening Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Öffnungszeiten</h2>
        <div className="space-y-3">
          {DAYS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700">{label}</span>
              {openingHours[key]?.closed ? (
                <span className="text-sm text-gray-500 flex-1">Ruhetag</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={openingHours[key]?.open || ''}
                    onChange={(e) => updateDayHours(key, 'open', e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="time"
                    value={openingHours[key]?.close || ''}
                    onChange={(e) => updateDayHours(key, 'close', e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={openingHours[key]?.closed || false}
                  onChange={(e) => updateDayHours(key, 'closed', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">Ruhetag</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Design / Theme</h2>
        <p className="text-sm text-gray-500 mb-4">
          Wähle ein Design für deine Speisekarte. Die Änderung wird sofort in der Vorschau sichtbar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEME_LIST.map((t) => {
            const isActive = theme === t.id;
            const s = t.styles;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  relative rounded-xl border-2 text-left transition-all overflow-hidden
                  ${isActive
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Mini Preview */}
                <div
                  className="p-3 h-32"
                  style={{
                    backgroundColor: s.background,
                    backgroundImage: s.backgroundPattern || 'none',
                  }}
                >
                  {/* Mini Header */}
                  <div
                    className="rounded-lg px-2 py-1 mb-2 flex items-center gap-2"
                    style={{
                      background: s.headerBg,
                      borderBottom: `1px solid ${s.headerBorder}`,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: s.primary }}
                    />
                    <div
                      className="h-2 w-12 rounded"
                      style={{ backgroundColor: s.text, opacity: 0.3 }}
                    />
                  </div>

                  {/* Mini Pills */}
                  <div className="flex gap-1 mb-2">
                    <div
                      className="h-4 w-10 rounded-full"
                      style={{ background: s.pillActiveBg }}
                    />
                    <div
                      className="h-4 w-8 rounded-full"
                      style={{
                        backgroundColor: isGradient(s.pillBg) ? undefined : s.pillBg,
                        backgroundImage: isGradient(s.pillBg) ? s.pillBg : undefined,
                        border: `1px solid ${s.border}`,
                      }}
                    />
                  </div>

                  {/* Mini Card */}
                  <div
                    className="rounded-lg p-2"
                    style={{
                      backgroundColor: s.cardBg,
                      border: `1px solid ${s.cardBorder}`,
                      boxShadow: s.cardShadow,
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 flex-1">
                        <div
                          className="h-2 w-16 rounded"
                          style={{ backgroundColor: s.text, opacity: 0.5 }}
                        />
                        <div
                          className="h-1.5 w-12 rounded"
                          style={{ backgroundColor: s.textMuted, opacity: 0.4 }}
                        />
                      </div>
                      <div
                        className="h-2 w-6 rounded"
                        style={{ backgroundColor: s.priceColor }}
                      />
                    </div>
                    {/* Mini badges */}
                    <div className="flex gap-1 mt-1">
                      <div
                        className="h-3 w-3 rounded"
                        style={{ backgroundColor: s.badgeVeganBg }}
                      />
                      <div
                        className="h-3 w-6 rounded"
                        style={{ backgroundColor: s.allergenBg, border: `1px solid ${s.allergenBorder}` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="p-3 bg-white border-t border-gray-100">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{t.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto Images Toggle */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Bilder-Einstellungen</h2>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoImages}
                  onChange={(e) => setAutoImages(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Automatische Gericht-Bilder</div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Zeigt automatisch passende Illustrationen basierend auf dem Gericht-Namen an.
                </p>
              </div>
            </label>
          </div>
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/food-images/doener.svg"
              alt="Beispiel"
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>

      {/* Locked Features */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🔒</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Nur mit kostenlosem Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Die folgenden Funktionen sind im Sandbox-Modus nicht verfügbar:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Bilder für Gerichte hochladen
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Eigene URL / Slug wählen
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                QR-Code generieren und drucken
              </li>
            </ul>
            <Link href="/register" className="inline-block mt-4">
              <Button className="shadow-lg shadow-emerald-500/20">
                Kostenlos registrieren
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="shadow-lg shadow-emerald-500/20">
          Einstellungen speichern
        </Button>
      </div>
    </div>
  );
}
