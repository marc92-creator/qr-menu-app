'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation, getAllergenName, getAllergenDescription } from '@/lib/translations';
import { ALLERGENS } from '@/lib/allergens';

type Allergen = typeof ALLERGENS[number];

interface AllergenLegendProps {
  allergens: Allergen[];
  theme: ThemeConfig;
  language: Language;
  variant?: 'collapsible' | 'modal' | 'inline';
  selectedAllergen?: string | null;
}

export function AllergenLegend({
  allergens,
  theme,
  language,
  variant = 'collapsible',
  selectedAllergen,
}: AllergenLegendProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = getTranslation(language);
  const styles = theme.styles;

  if (allergens.length === 0) return null;

  // Modal variant (bottom-fixed button → full overlay)
  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 px-4 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-102 active:scale-95"
          style={{
            backgroundColor: styles.primary,
            color: '#fff',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <span>ℹ️</span>
            <span>{t.allergens}</span>
          </div>
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="max-w-2xl w-full rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
              style={{
                backgroundColor: styles.cardBg,
                border: `1px solid ${styles.cardBorder}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: styles.text }}>
                  {t.allergens}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allergens.map((allergen) => {
                  const isSelected = selectedAllergen === allergen.id;
                  return (
                    <div
                      key={allergen.id}
                      className="flex items-center gap-3 p-3 rounded-lg transition-all"
                      style={isSelected ? {
                        background: styles.allergenSelectedBg,
                        color: styles.allergenSelectedText,
                      } : {
                        backgroundColor: styles.surfaceHover,
                      }}
                    >
                      <span className="text-xl">{allergen.icon}</span>
                      <div>
                        <div
                          className="font-medium text-sm"
                          style={{ color: isSelected ? styles.allergenSelectedText : styles.text }}
                        >
                          {getAllergenName(allergen.id, language)}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: isSelected ? styles.allergenSelectedText : styles.textMuted, opacity: isSelected ? 0.8 : 1 }}
                        >
                          {getAllergenDescription(allergen.id, language)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: styles.textMuted }}>
                {t.allergenInfo}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  // Inline variant (always visible, no interaction)
  if (variant === 'inline') {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: styles.text }}>
          <span>ℹ️</span>
          {t.allergens}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allergens.map((allergen) => (
            <div
              key={allergen.id}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{ backgroundColor: styles.surfaceHover }}
            >
              <span className="text-base">{allergen.icon}</span>
              <div className="text-xs">
                <div className="font-medium" style={{ color: styles.text }}>
                  {getAllergenName(allergen.id, language)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: collapsible variant
  return (
    <section
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: styles.cardBg,
        border: `1px solid ${styles.cardBorder}`,
        boxShadow: styles.cardShadow,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left touch-manipulation transition-colors"
        style={{ color: styles.text }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">ℹ️</span>
          <span className="font-medium text-sm">
            {t.allergens}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: styles.textMuted }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allergens.map((allergen) => {
              const isSelected = selectedAllergen === allergen.id;
              return (
                <div
                  key={allergen.id}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
                  style={isSelected ? {
                    background: styles.allergenSelectedBg,
                    color: styles.allergenSelectedText,
                  } : {
                    backgroundColor: styles.surfaceHover,
                  }}
                >
                  <span className="text-xl">{allergen.icon}</span>
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: isSelected ? styles.allergenSelectedText : styles.text }}
                    >
                      {getAllergenName(allergen.id, language)}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: isSelected ? styles.allergenSelectedText : styles.textMuted, opacity: isSelected ? 0.8 : 1 }}
                    >
                      {getAllergenDescription(allergen.id, language)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p
            className="text-xs mt-3 text-center"
            style={{ color: styles.textMuted }}
          >
            {t.allergenInfo}
          </p>
        </div>
      )}
    </section>
  );
}
