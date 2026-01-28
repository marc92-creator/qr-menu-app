'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Subscription, OpeningHours, MenuTheme, MenuLanguage } from '@/types/database';
import { LANGUAGE_OPTIONS } from '@/lib/translations';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { THEME_LIST, isGradient } from '@/lib/themes';
import { uploadRestaurantLogo, validateImageFile } from '@/lib/imageUpload';

interface SettingsTabProps {
  restaurant: Restaurant;
  subscription: Subscription | null;
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

export function SettingsTab({ restaurant, subscription, onUpdate }: SettingsTabProps) {
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address || '');
  const [whatsappNumber, setWhatsappNumber] = useState(restaurant.whatsapp_number || '');
  const [logoUrl, setLogoUrl] = useState(restaurant.logo_url || '');
  const [openingHours, setOpeningHours] = useState<OpeningHours>(
    restaurant.opening_hours || DEFAULT_HOURS
  );
  const [theme, setTheme] = useState<MenuTheme>(restaurant.theme || 'classic');
  const [menuLanguage, setMenuLanguage] = useState<MenuLanguage>(restaurant.menu_language || 'de');
  const [autoImages, setAutoImages] = useState(restaurant.auto_images !== false);
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const updateDayHours = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    setLogoLoading(true);
    try {
      const url = await uploadRestaurantLogo(file, restaurant.id);
      setLogoUrl(url);

      // Save immediately to database
      const supabase = createClient();
      await supabase
        .from('restaurants')
        .update({ logo_url: url })
        .eq('id', restaurant.id);

      onUpdate();
    } catch (error) {
      console.error('Logo upload error:', error);
      alert('Logo konnte nicht hochgeladen werden');
    } finally {
      setLogoLoading(false);
    }
  };

  const handleRemoveLogo = async () => {
    if (!confirm('Logo wirklich entfernen?')) return;

    setLogoLoading(true);
    try {
      const supabase = createClient();
      await supabase
        .from('restaurants')
        .update({ logo_url: null })
        .eq('id', restaurant.id);

      setLogoUrl('');
      onUpdate();
    } catch (error) {
      console.error('Remove logo error:', error);
    } finally {
      setLogoLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    const supabase = createClient();
    await supabase
      .from('restaurants')
      .update({
        name,
        address: address || null,
        whatsapp_number: whatsappNumber || null,
        logo_url: logoUrl || null,
        opening_hours: openingHours,
        theme,
        menu_language: menuLanguage,
        auto_images: autoImages,
      })
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
  const isDemo = restaurant.is_demo;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Demo-Modus</h3>
                <p className="text-sm text-amber-700">
                  Dies ist ein Demo-Restaurant. Änderungen werden nicht gespeichert.
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              Eigenes Restaurant erstellen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

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
            disabled={isDemo}
          />

          <Input
            id="address"
            label="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="z.B. Musterstraße 123, 12345 Berlin"
            disabled={isDemo}
          />

          <div>
            <Input
              id="whatsapp"
              label="WhatsApp-Nummer (optional)"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="z.B. +49 151 12345678"
              disabled={isDemo}
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Wird auf der Speisekarte als Kontaktbutton angezeigt
            </p>
          </div>

          {/* Restaurant Logo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Restaurant-Logo / Foto
            </label>
            <div className="flex items-center gap-4">
              {/* Logo Preview */}
              <div className="relative">
                {logoUrl ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Restaurant Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center ring-2 ring-emerald-200">
                    <span className="text-3xl">{name.charAt(0) || '🍽️'}</span>
                  </div>
                )}
                {logoLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 animate-spin text-emerald-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={isDemo}
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    disabled={isDemo || logoLoading}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {logoUrl ? 'Logo ändern' : 'Logo hochladen'}
                  </button>
                  {logoUrl && (
                    <button
                      onClick={handleRemoveLogo}
                      disabled={isDemo || logoLoading}
                      className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 disabled:bg-gray-100 disabled:text-gray-400 text-gray-600 text-sm font-medium rounded-lg transition-colors"
                    >
                      Entfernen
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG oder WebP. Max. 5MB. Wird im Menü-Header angezeigt.
                </p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Öffnungszeiten
            </label>
            <div className="space-y-2">
              {DAYS.map(({ key, label }) => {
                const dayHours = openingHours[key] || { open: '11:00', close: '22:00' };
                const isClosed = dayHours.closed;

                return (
                  <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="w-24 text-sm font-medium text-gray-700">{label}</span>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isClosed || false}
                        onChange={(e) => updateDayHours(key, 'closed', e.target.checked)}
                        disabled={isDemo}
                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-500">Ruhetag</span>
                    </label>

                    {!isClosed && (
                      <>
                        <input
                          type="time"
                          value={dayHours.open}
                          onChange={(e) => updateDayHours(key, 'open', e.target.value)}
                          disabled={isDemo}
                          className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="time"
                          value={dayHours.close}
                          onChange={(e) => updateDayHours(key, 'close', e.target.value)}
                          disabled={isDemo}
                          className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </>
                    )}

                    {isClosed && (
                      <span className="text-sm text-gray-400 italic">Geschlossen</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Wird auf der Speisekarte mit &quot;Geöffnet/Geschlossen&quot; Status angezeigt
            </p>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Menü-Design
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {THEME_LIST.map((t) => {
                const isActive = theme === t.id;
                const s = t.styles;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => !isDemo && setTheme(t.id)}
                    disabled={isDemo}
                    className={`
                      relative rounded-xl border-2 text-left transition-all overflow-hidden
                      ${isActive
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      ${isDemo ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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
            <p className="text-xs text-gray-500 mt-2">
              Wähle ein Design für deine öffentliche Speisekarte
            </p>
          </div>

          {/* Menu Language Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Menü-Sprache
            </label>
            <div className="flex gap-3">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => !isDemo && setMenuLanguage(lang.id)}
                  disabled={isDemo}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all flex-1
                    ${menuLanguage === lang.id
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                    ${isDemo ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className={`font-semibold ${menuLanguage === lang.id ? 'text-emerald-700' : 'text-gray-900'}`}>
                      {lang.label}
                    </div>
                  </div>
                  {menuLanguage === lang.id && (
                    <svg className="w-5 h-5 text-emerald-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Die Sprache für Badges, Allergene und UI-Texte auf der öffentlichen Speisekarte
            </p>
          </div>

          {/* Auto Images Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Bilder-Einstellungen
            </label>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoImages}
                      onChange={(e) => !isDemo && setAutoImages(e.target.checked)}
                      disabled={isDemo}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors ${isDemo ? 'opacity-50' : ''}`}></div>
                    <div className={`absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5 ${isDemo ? 'opacity-50' : ''}`}></div>
                  </div>
                  <div>
                    <div className={`font-semibold text-gray-900 ${isDemo ? 'opacity-50' : ''}`}>Automatische Gericht-Bilder</div>
                    <p className={`text-sm text-gray-500 mt-0.5 ${isDemo ? 'opacity-50' : ''}`}>
                      Zeigt automatisch passende Illustrationen basierend auf dem Gericht-Namen an.
                    </p>
                  </div>
                </label>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <img
                  src="/food-images/doener.svg"
                  alt="Beispiel"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>

          {success && !isDemo && (
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
            disabled={isDemo}
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
