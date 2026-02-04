'use client';

import { useEffect, useRef, useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation, getAllergenName, getAllergenDescription } from '@/lib/translations';
import { ALLERGENS, AllergenId } from '@/lib/allergens';

interface AllergenFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAllergens: Set<AllergenId>;
  onToggleAllergen: (allergenId: AllergenId) => void;
  onClearAll: () => void;
  theme: ThemeConfig;
  language: Language;
}

export function AllergenFilterModal({
  isOpen,
  onClose,
  selectedAllergens,
  onToggleAllergen,
  onClearAll,
  theme,
  language,
}: AllergenFilterModalProps) {
  const t = getTranslation(language);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const styles = theme.styles;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isAnimating ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        ref={modalRef}
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          backgroundColor: styles.cardBg,
          maxHeight: '85vh',
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="w-12 h-1 rounded-full"
            style={{ backgroundColor: styles.border }}
          />
        </div>

        {/* Header */}
        <div className="px-5 pb-4 border-b" style={{ borderColor: styles.border }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ color: styles.text }}>
                {t.myAllergies}
              </h2>
              <p className="text-sm mt-1" style={{ color: styles.textMuted }}>
                {t.excludeAllergens}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors touch-manipulation"
              style={{ color: styles.textMuted }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Allergen Grid */}
        <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {ALLERGENS.map((allergen) => {
              const isSelected = selectedAllergens.has(allergen.id as AllergenId);
              const allergenName = getAllergenName(allergen.id, language);
              const allergenDesc = getAllergenDescription(allergen.id, language);

              return (
                <button
                  key={allergen.id}
                  onClick={() => onToggleAllergen(allergen.id as AllergenId)}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation active:scale-95 ${
                    isSelected ? 'ring-2 ring-offset-2 ring-emerald-500' : ''
                  }`}
                  style={{
                    backgroundColor: isSelected ? styles.primary : styles.cardBg,
                    borderColor: isSelected ? styles.primary : styles.border,
                    color: isSelected ? '#ffffff' : styles.text,
                  }}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  <span className="text-3xl mb-2" role="img" aria-label={allergenName}>
                    {allergen.icon}
                  </span>

                  {/* Name */}
                  <span className="text-sm font-medium text-center">
                    {allergenName}
                  </span>

                  {/* Description (truncated) */}
                  <span
                    className="text-xs text-center mt-1 line-clamp-2"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : styles.textMuted }}
                  >
                    {allergenDesc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 border-t flex items-center justify-between gap-3"
          style={{ borderColor: styles.border, backgroundColor: styles.surface }}
        >
          {/* Clear button */}
          {selectedAllergens.size > 0 && (
            <button
              onClick={onClearAll}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors touch-manipulation active:scale-95"
              style={{
                color: styles.primary,
                backgroundColor: 'transparent',
              }}
            >
              {t.clearFilters}
            </button>
          )}

          {/* Apply button */}
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all touch-manipulation active:scale-95"
            style={{
              backgroundColor: styles.primary,
            }}
          >
            {selectedAllergens.size > 0 ? (
              <>
                {t.apply} ({selectedAllergens.size})
              </>
            ) : (
              t.close
            )}
          </button>
        </div>
      </div>
    </>
  );
}
