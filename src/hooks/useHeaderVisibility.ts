'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook for detecting scroll direction and hiding/showing elements
 * @param threshold - Minimum scroll distance before triggering visibility change (default: 100px)
 * @returns isVisible - Whether the header should be visible
 */
export function useHeaderVisibility(threshold = 100) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Scrolling down and past threshold - hide
      if (currentY > lastScrollY.current && currentY > threshold) {
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}
