'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook for managing menu category navigation with Intersection Observer
 * Tracks active category while scrolling and provides scroll-to functionality
 */
export function useMenuNavigation(
  categories: Array<{ id: string }>,
  isEmbedded: boolean = false
) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize active category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // Intersection Observer to track active category while scrolling
  useEffect(() => {
    if (categories.length === 0 || isEmbedded) return; // Skip for embedded mode

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: [0, 0.1, 0.25],
    };

    const observer = new IntersectionObserver((entries) => {
      // Skip if we're programmatically scrolling
      if (isScrollingProgrammatically.current) return;

      // Find the most visible category
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const categoryId = mostVisible.target.getAttribute('data-category-id');
        if (categoryId && categoryId !== activeCategory) {
          setActiveCategory(categoryId);
          // Debounce pill scrolling to avoid jank
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            requestAnimationFrame(() => {
              if (tabsRef.current) {
                const tab = tabsRef.current.querySelector(`[data-category="${categoryId}"]`);
                if (tab) {
                  tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }
            });
          }, 100);
        }
      }
    }, observerOptions);

    // Observe all category sections
    categoryRefs.current.forEach((element, categoryId) => {
      element.setAttribute('data-category-id', categoryId);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [categories, isEmbedded, activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);

    // For embedded mode: use filtering instead of scrolling
    if (isEmbedded) {
      setFilterCategory(prev => prev === categoryId ? null : categoryId);
      return;
    }

    // Set flag to prevent intersection observer from interfering
    isScrollingProgrammatically.current = true;

    // Scroll tab pill into view
    requestAnimationFrame(() => {
      if (tabsRef.current) {
        const tab = tabsRef.current.querySelector(`[data-category="${categoryId}"]`);
        if (tab) {
          tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });

    // Find the category element using our ref map
    const targetElement = categoryRefs.current.get(categoryId) || document.getElementById(`category-${categoryId}`);
    if (!targetElement) {
      isScrollingProgrammatically.current = false;
      return;
    }

    // Scroll to category with offset for sticky header
    requestAnimationFrame(() => {
      const headerHeight = 180;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Clear programmatic scroll flag after animation completes
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 600);
    });
  };

  return {
    activeCategory,
    filterCategory,
    setFilterCategory,
    tabsRef,
    categoryRefs,
    scrollToCategory,
  };
}
