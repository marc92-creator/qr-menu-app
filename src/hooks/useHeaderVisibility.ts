'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook for detecting scroll direction and hiding/showing elements
 * Uses hysteresis to prevent flickering on small scroll movements
 * @param threshold - Minimum scroll position before allowing hide (default: 100px)
 * @param hysteresis - Minimum scroll distance in one direction before toggling (default: 50px)
 * @returns isVisible - Whether the header should be visible
 */
export function useHeaderVisibility(threshold = 100, hysteresis = 50) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirectionStartY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentDirection = currentY > lastScrollY.current ? 'down' : 'up';

      // Reset direction tracking when direction changes
      if (currentDirection !== lastDirection.current) {
        scrollDirectionStartY.current = currentY;
        lastDirection.current = currentDirection;
      }

      const scrolledInDirection = Math.abs(currentY - scrollDirectionStartY.current);

      // Only toggle visibility after scrolling hysteresis pixels in one direction
      if (scrolledInDirection >= hysteresis) {
        if (currentDirection === 'down' && currentY > threshold) {
          setIsVisible(false);
        } else if (currentDirection === 'up' || currentY <= threshold) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, hysteresis]);

  return isVisible;
}
