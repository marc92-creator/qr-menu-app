'use client';

import { useState, useEffect } from 'react';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { getTheme } from '@/lib/themes';
import { getTranslation, Language } from '@/lib/translations';
import { getTemplate } from '@/lib/templates';
import { filterCategoriesBySchedule } from '@/lib/schedules';
import { MinimalistLayout } from '@/components/MenuView/MinimalistLayout';
import { TraditionalLayout } from '@/components/MenuView/TraditionalLayout';
import { ModernGridLayout } from '@/components/MenuView/ModernGridLayout';
import { CompactTableLayout } from '@/components/MenuView/CompactTableLayout';
import { FineDiningLayout } from '@/components/MenuView/FineDiningLayout';

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  showWatermark: boolean;
  isDemo?: boolean;
  isEmbedded?: boolean;
}

// Detect browser language
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'de';
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'de';
  const langCode = browserLang.split('-')[0].toLowerCase();

  // Map browser language to supported languages
  const langMap: Record<string, Language> = {
    'de': 'de',
    'en': 'en',
    'fr': 'fr',
    'it': 'it',
    'es': 'es',
    'tr': 'tr',
    'pl': 'pl',
  };

  return langMap[langCode] || 'de';
};

// Valid languages
const VALID_LANGUAGES: Language[] = ['de', 'en', 'fr', 'it', 'es', 'tr', 'pl'];

// Get saved language preference from localStorage
const getSavedLanguage = (restaurantId: string): Language | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(`menu_lang_${restaurantId}`);
  return saved && VALID_LANGUAGES.includes(saved as Language) ? (saved as Language) : null;
};

// Save language preference to localStorage
const saveLanguage = (restaurantId: string, lang: Language) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`menu_lang_${restaurantId}`, lang);
};

export function MenuView({ restaurant, categories, menuItems, showWatermark, isDemo = false, isEmbedded = false }: MenuViewProps) {
  // Get template configuration
  const templateId = restaurant.template_id || 'traditional';
  const template = getTemplate(templateId);
  const theme = getTheme(restaurant.theme);
  const [currentLang, setCurrentLang] = useState<Language>('de');

  const t = getTranslation(currentLang);
  const styles = theme.styles;

  // Auto-detect language on mount
  useEffect(() => {
    const saved = getSavedLanguage(restaurant.id);
    if (saved) {
      setCurrentLang(saved);
    } else {
      const browserLang = detectBrowserLanguage();
      setCurrentLang(browserLang);
    }
  }, [restaurant.id]);

  // Track menu view
  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantId: restaurant.id,
        eventType: 'view',
      }),
    }).catch((err) => console.error('Analytics tracking failed:', err));
  }, [restaurant.id]);

  // Track page view / scan (only once per session)
  useEffect(() => {
    if (isDemo || isEmbedded) return;

    const trackingKey = `tracked_${restaurant.id}`;
    if (typeof window !== 'undefined' && sessionStorage.getItem(trackingKey)) {
      return;
    }

    const trackScan = async () => {
      try {
        const response = await fetch('/api/track-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId: restaurant.id,
            language: currentLang,
          }),
        });

        if (response.ok && typeof window !== 'undefined') {
          sessionStorage.setItem(trackingKey, 'true');
        }
      } catch {
        // Silently fail - tracking shouldn't break the menu
      }
    };

    trackScan();
  }, [restaurant.id, isDemo, isEmbedded, currentLang]);

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.name,
    "address": restaurant.address,
    "url": `https://www.mymenuapp.de/m/${restaurant.slug}`,
    "menu": {
      "@type": "Menu",
      "hasMenuSection": categories.map(cat => ({
        "@type": "MenuSection",
        "name": cat.name,
        "hasMenuItem": menuItems
          .filter(i => i.category_id === cat.id)
          .map(item => ({
            "@type": "MenuItem",
            "name": item.name,
            "description": item.description,
            "offers": {
              "@type": "Offer",
              "price": item.price,
              "priceCurrency": "EUR"
            }
          }))
      }))
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    saveLanguage(restaurant.id, lang);
  };

  // Filter categories based on active schedule
  const { filteredCategories, activeSchedule } = filterCategoriesBySchedule(
    categories,
    restaurant.menu_schedules
  );

  // Common props for all layouts
  const layoutProps = {
    restaurant,
    categories: filteredCategories,
    items: menuItems,
    template,
    language: currentLang,
    theme,
    currentLang,
    onLanguageChange: handleLanguageChange,
    isDemo,
    isEmbedded,
    activeSchedule,
  };

  // Render the appropriate template layout
  let templateContent;
  switch (templateId) {
    case 'minimalist':
      templateContent = <MinimalistLayout {...layoutProps} />;
      break;
    case 'modern-grid':
      templateContent = <ModernGridLayout {...layoutProps} />;
      break;
    case 'compact':
      templateContent = <CompactTableLayout {...layoutProps} />;
      break;
    case 'fine-dining':
      templateContent = <FineDiningLayout {...layoutProps} />;
      break;
    case 'traditional':
    default:
      templateContent = <TraditionalLayout {...layoutProps} />;
      break;
  }

  return (
    <div className="relative min-h-screen">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }}
      />

      {/* Template Content */}
      {templateContent}

      {/* WhatsApp Floating Button - hidden in embedded mode */}
      {!isEmbedded && restaurant.whatsapp_number && (
        <a
          href={`https://wa.me/${restaurant.whatsapp_number.replace(/[^0-9+]/g, '').replace('+', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${isEmbedded ? 'absolute' : 'fixed'} z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full
            flex items-center justify-center shadow-lg shadow-green-500/30
            transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation
            ${showWatermark ? 'bottom-20 right-4' : 'bottom-6 right-4'}
          `}
          title="Per WhatsApp kontaktieren"
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}

      {/* Watermark / Footer */}
      {showWatermark && (
        <div className={`${isEmbedded ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 z-30`}>
          <div
            className="backdrop-blur-sm safe-area-bottom"
            style={{
              background: styles.footerBg,
              borderTop: `1px solid ${styles.footerBorder}`,
            }}
          >
            <div className="py-3 px-4 text-center">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors touch-manipulation hover:opacity-80"
                style={{ color: styles.footerText }}
              >
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                  style={{
                    backgroundColor: styles.primaryLight,
                    color: styles.primary,
                  }}
                >
                  {t.free}
                </span>
                <span>{t.createdWith}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
