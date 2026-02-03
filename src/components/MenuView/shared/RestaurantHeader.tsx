'use client';

import { useState, useRef, useEffect } from 'react';
import { Restaurant, OpeningHours } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation, LANGUAGE_OPTIONS } from '@/lib/translations';

interface RestaurantHeaderProps {
  restaurant: Restaurant;
  theme: ThemeConfig;
  language: Language;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'card' | 'minimal' | 'hero';
  isDemo?: boolean;
}

// Day keys for opening hours (Sunday = 0)
const DAY_KEYS = ['so', 'mo', 'di', 'mi', 'do', 'fr', 'sa'] as const;

// Check if restaurant is currently open
const getOpenStatus = (openingHours: OpeningHours | null): { isOpen: boolean; todayHours: string | null; isClosed: boolean } => {
  if (!openingHours) return { isOpen: false, todayHours: null, isClosed: false };

  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  const todaySchedule = openingHours[dayKey];

  if (!todaySchedule || todaySchedule.closed) {
    return { isOpen: false, todayHours: null, isClosed: true };
  }

  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const isOpen = currentTime >= todaySchedule.open && currentTime < todaySchedule.close;

  return {
    isOpen,
    todayHours: `${todaySchedule.open} - ${todaySchedule.close}`,
    isClosed: false
  };
};

// Language Dropdown Component
function LanguageDropdown({
  currentLang,
  onLanguageChange,
  styles,
}: {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  styles: ThemeConfig['styles'];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = LANGUAGE_OPTIONS.find(opt => opt.id === currentLang) || LANGUAGE_OPTIONS[0];

  return (
    <div className="absolute top-3 right-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: styles.surfaceHover || styles.cardBg,
          border: `1px solid ${styles.border}`,
          color: styles.text,
        }}
      >
        <span>{currentOption.flag}</span>
        <span className="uppercase">{currentLang}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 py-1 rounded-lg shadow-lg z-50 min-w-[120px]"
          style={{
            backgroundColor: styles.cardBg,
            border: `1px solid ${styles.border}`,
          }}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onLanguageChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                option.id === currentLang ? 'font-semibold' : ''
              }`}
              style={{
                backgroundColor: option.id === currentLang ? styles.primaryLight : 'transparent',
                color: styles.text,
              }}
              onMouseEnter={(e) => {
                if (option.id !== currentLang) {
                  e.currentTarget.style.backgroundColor = styles.surfaceHover || styles.primaryLight;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = option.id === currentLang ? styles.primaryLight : 'transparent';
              }}
            >
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RestaurantHeader({
  restaurant,
  theme,
  language,
  currentLang,
  onLanguageChange,
  variant = 'card',
  isDemo = false,
}: RestaurantHeaderProps) {
  const t = getTranslation(language);
  const styles = theme.styles;

  if (variant === 'minimal') {
    return (
      <div className="text-center pt-12 pb-8 px-4">
        {restaurant.logo_url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={restaurant.logo_url}
            alt={restaurant.name}
            className="w-24 h-24 mx-auto mb-4 rounded-2xl object-cover"
          />
        )}
        <h1 className="text-4xl font-bold mb-2" style={{ color: styles.primary }}>
          {restaurant.name}
        </h1>
        {restaurant.address && (
          <p className="text-gray-600">{restaurant.address}</p>
        )}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="relative py-4 sm:py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {restaurant.logo_url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-2xl object-cover shadow-lg"
              style={{ borderColor: styles.primary + '40' }}
            />
          )}
          <h1 className="text-2xl sm:text-4xl font-bold mb-2" style={{ color: styles.primary }}>
            {restaurant.name}
          </h1>
          {restaurant.address && (
            <p className="text-sm sm:text-base mb-1" style={{ color: styles.text }}>
              📍 {restaurant.address}
            </p>
          )}
          {restaurant.opening_hours && (() => {
            const { isOpen, todayHours, isClosed } = getOpenStatus(restaurant.opening_hours);
            return (
              <div className="flex items-center justify-center gap-2 mt-2">
                <span
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: isOpen ? styles.statusOpenBg : styles.statusClosedBg,
                    color: isOpen ? styles.statusOpenText : styles.statusClosedText,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: isOpen ? styles.statusOpenText : styles.statusClosedText,
                    }}
                  />
                  {isOpen ? t.openNow : (isClosed ? t.closedToday : t.closedNow)}
                </span>
                {todayHours && (
                  <span className="text-xs sm:text-sm" style={{ color: styles.textMuted }}>
                    {todayHours}
                  </span>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  // Default: card variant (compact header in a card)
  return (
    <div className="px-4 pt-4 pb-3 md:px-6">
      <div
        className="max-w-2xl mx-auto rounded-2xl p-4 shadow-sm"
        style={{
          background: styles.cardBg,
          border: `1px solid ${styles.cardBorder}`,
          boxShadow: styles.cardShadow,
        }}
      >
        <div className="flex items-center gap-4">
          {restaurant.logo_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0 ring-2"
              style={{ borderColor: styles.primary + '40' }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${styles.primary}, ${styles.accent || styles.primary})`,
              }}
            >
              <span className="text-2xl text-white font-bold">
                {restaurant.name.charAt(0)}
              </span>
            </div>
          )}
          {/* Language Selector Dropdown */}
          <LanguageDropdown
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
            styles={styles}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold truncate" style={{ color: styles.text }}>
                {restaurant.name}
              </h1>
              {isDemo && (
                <span className="flex-shrink-0 bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Demo
                </span>
              )}
            </div>
            {restaurant.address && (
              <p className="text-sm truncate mt-0.5" style={{ color: styles.textMuted }}>
                📍 {restaurant.address}
              </p>
            )}
            {restaurant.opening_hours && (() => {
              const { isOpen, todayHours, isClosed } = getOpenStatus(restaurant.opening_hours);
              return (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: isOpen ? styles.statusOpenBg : styles.statusClosedBg,
                      color: isOpen ? styles.statusOpenText : styles.statusClosedText,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: isOpen ? styles.statusOpenText : styles.statusClosedText,
                      }}
                    />
                    {isOpen ? t.openNow : (isClosed ? t.closedToday : t.closedNow)}
                  </span>
                  {todayHours && (
                    <span className="text-xs" style={{ color: styles.textMuted }}>
                      {todayHours}
                    </span>
                  )}
                </div>
              );
            })()}
            {/* WiFi Info */}
            {restaurant.wifi_name && (
              <div
                className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg text-xs"
                style={{ background: styles.primaryLight, border: `1px solid ${styles.border}` }}
              >
                <span className="text-base">📶</span>
                <span className="font-medium" style={{ color: styles.text }}>
                  {restaurant.wifi_name}
                </span>
                {restaurant.wifi_password && (
                  <>
                    <span style={{ color: styles.textMuted }}>•</span>
                    <span className="font-mono" style={{ color: styles.textMuted }}>
                      {restaurant.wifi_password}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
