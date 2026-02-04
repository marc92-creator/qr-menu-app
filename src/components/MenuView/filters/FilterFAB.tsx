'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';
import { MenuFiltersReturn } from '@/hooks/useMenuFilters';
import { haptics } from '@/lib/haptics';

interface FilterFABProps {
  filters: MenuFiltersReturn;
  theme: ThemeConfig;
  language: Language;
  onOpenSheet: () => void;
  hideOnScroll?: boolean;
}

export function FilterFAB({
  filters,
  theme,
  language,
  onOpenSheet,
  hideOnScroll = true,
}: FilterFABProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = getTranslation(language);

  const { activeFilterCount } = filters;

  // Handle scroll hiding
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  const handleClick = () => {
    haptics.tap();
    onOpenSheet();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed z-40
        w-14 h-14
        rounded-full
        shadow-lg
        flex items-center justify-center
        active:scale-95
        transition-all duration-300 ease-out
        touch-manipulation
        bottom-20 right-4 sm:bottom-6 sm:right-6
        ${!isVisible && hideOnScroll ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}
      `}
      style={{
        backgroundColor: theme.styles.primary,
        boxShadow: `0 4px 20px ${theme.styles.primary}30`,
      }}
      aria-label={t.openFilters}
    >
      {/* Filter Icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>

      {/* Badge with active filter count */}
      {activeFilterCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full text-xs font-bold shadow-md"
          style={{
            backgroundColor: theme.styles.accent,
            color: '#ffffff',
          }}
        >
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}
