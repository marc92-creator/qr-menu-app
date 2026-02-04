'use client';

import { useEffect, useRef, useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { MenuFiltersReturn, FilterType } from '@/hooks/useMenuFilters';
import { UniversalSearchBar } from '../UniversalSearchBar';
import { AllergenFilterModal } from '../AllergenFilterModal';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MenuFiltersReturn;
  theme: ThemeConfig;
  language: Language;
}

const DIETARY_FILTERS: { id: FilterType; icon: string; labelKey: keyof ReturnType<typeof getTranslation> }[] = [
  { id: 'vegetarian', icon: '🥬', labelKey: 'filterVegetarian' },
  { id: 'vegan', icon: '🌱', labelKey: 'filterVegan' },
  { id: 'glutenFree', icon: '🌾', labelKey: 'filterGlutenFree' },
  { id: 'noNuts', icon: '🥜', labelKey: 'filterNoNuts' },
];

export function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  theme,
  language,
}: FilterBottomSheetProps) {
  const t = getTranslation(language);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);

  const {
    activeFilters,
    toggleFilter,
    excludeAllergens,
    toggleAllergen,
    clearAllergens,
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    clearAll,
  } = filters;

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
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

  // Prevent body scroll when sheet is open
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

  // Drag to close handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const delta = currentY - dragStartY.current;
    if (delta > 0) {
      setDragY(delta);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 100) {
      onClose();
    }
    setDragY(0);
  };

  if (!shouldRender) return null;

  const styles = theme.styles;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isAnimating ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          backgroundColor: styles.cardBg,
          maxHeight: '70vh',
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
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
                {t.filters}
              </h2>
              <p className="text-sm mt-1" style={{ color: styles.textMuted }}>
                {t.searchTip}
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

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 180px)' }}>
          {/* Search */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block" style={{ color: styles.text }}>
              {t.search}
            </label>
            <UniversalSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              theme={theme}
              language={language}
              variant="inline"
            />
          </div>

          {/* Dietary Filters */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block" style={{ color: styles.text }}>
              {t.dietary}
            </label>
            <div className="flex flex-wrap gap-2">
              {DIETARY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95"
                  style={{
                    backgroundColor: activeFilters.has(filter.id) ? styles.primary : styles.pillBg,
                    color: activeFilters.has(filter.id) ? '#fff' : styles.text,
                    border: `1px solid ${activeFilters.has(filter.id) ? styles.primary : styles.border}`,
                  }}
                >
                  <span>{filter.icon}</span>
                  {t[filter.labelKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Allergen Button */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-3 block" style={{ color: styles.text }}>
              {t.excludeAllergens}
            </label>
            <button
              onClick={() => setIsAllergenModalOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all touch-manipulation active:scale-[0.99]"
              style={{
                backgroundColor: excludeAllergens.size > 0 ? styles.primaryLight : styles.surface,
                borderColor: excludeAllergens.size > 0 ? styles.primary : styles.border,
              }}
            >
              <span className="flex items-center gap-2" style={{ color: styles.text }}>
                <span>⚠️</span>
                <span>
                  {excludeAllergens.size > 0
                    ? t.nFilters.replace('{n}', String(excludeAllergens.size))
                    : t.allergens}
                </span>
              </span>
              <svg className="w-5 h-5" style={{ color: styles.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 border-t flex items-center justify-between gap-3 safe-area-bottom"
          style={{ borderColor: styles.border, backgroundColor: styles.surface }}
        >
          {/* Clear button */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
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
            {activeFilterCount > 0 ? (
              <>
                {t.apply} ({activeFilterCount})
              </>
            ) : (
              t.close
            )}
          </button>
        </div>
      </div>

      {/* Allergen Modal */}
      <AllergenFilterModal
        isOpen={isAllergenModalOpen}
        onClose={() => setIsAllergenModalOpen(false)}
        selectedAllergens={excludeAllergens}
        onToggleAllergen={toggleAllergen}
        onClearAll={clearAllergens}
        theme={theme}
        language={language}
      />
    </>
  );
}
