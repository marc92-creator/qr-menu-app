/**
 * Haptic Feedback Utility
 * Provides native-feeling tactile feedback for mobile interactions
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning';

/**
 * Trigger haptic feedback
 * Falls back gracefully if vibration API is not supported
 */
export function triggerHaptic(pattern: HapticPattern = 'light') {
  // Check if vibration API is available
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  // Define vibration patterns (in milliseconds)
  const patterns: Record<HapticPattern, number | number[]> = {
    light: [10],           // Subtle tap
    medium: [20],          // Normal tap
    heavy: [30],           // Strong tap
    success: [10, 50, 10], // Double tap (success)
    error: [20, 100, 20],  // Strong double tap (error)
    warning: [15, 30, 15], // Quick double tap (warning)
  };

  try {
    navigator.vibrate(patterns[pattern]);
  } catch (error) {
    // Silently fail if vibration is not supported or blocked
    console.debug('Haptic feedback not available:', error);
  }
}

/**
 * Haptic feedback for common UI interactions
 */
export const haptics = {
  /** Light tap - for button presses, selections */
  tap: () => triggerHaptic('light'),

  /** Medium tap - for toggles, confirmations */
  toggle: () => triggerHaptic('medium'),

  /** Heavy tap - for important actions */
  impact: () => triggerHaptic('heavy'),

  /** Success pattern - for successful operations */
  success: () => triggerHaptic('success'),

  /** Error pattern - for errors, failed operations */
  error: () => triggerHaptic('error'),

  /** Warning pattern - for warnings, confirmations */
  warning: () => triggerHaptic('warning'),

  /** Selection change - for drag & drop, reordering */
  selection: () => triggerHaptic('light'),

  /** Delete action - for deletions */
  delete: () => triggerHaptic('warning'),
};

/**
 * Hook for haptic feedback in React components
 */
export function useHaptic() {
  return haptics;
}
