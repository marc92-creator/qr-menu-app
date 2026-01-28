'use client';

import { Subscription, Restaurant } from '@/types/database';

// Trial duration in days
export const TRIAL_DURATION_DAYS = 14;

/**
 * Simple subscription model:
 * - 14 days free trial with ALL features
 * - After trial: Pro subscription required (9.99€/month)
 * - No feature limits during trial
 */

export type AccessStatus = 'trial' | 'pro' | 'expired';

/**
 * Check if user has Pro subscription (paid)
 */
export function isPro(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  // 'basic' is the Pro plan in the database (legacy naming)
  return subscription.plan === 'basic' && subscription.status === 'active';
}

/**
 * Check if restaurant is still in trial period
 */
export function isInTrial(restaurant: Restaurant | null): boolean {
  if (!restaurant) return false;

  // Check trial_ends_at if available
  if (restaurant.trial_ends_at) {
    return new Date(restaurant.trial_ends_at) > new Date();
  }

  // Fallback: use created_at + 14 days for legacy restaurants
  const createdAt = new Date(restaurant.created_at);
  const trialEndsAt = new Date(createdAt.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
  return trialEndsAt > new Date();
}

/**
 * Get days remaining in trial
 */
export function getTrialDaysRemaining(restaurant: Restaurant | null): number {
  if (!restaurant) return 0;

  let trialEndsAt: Date;

  if (restaurant.trial_ends_at) {
    trialEndsAt = new Date(restaurant.trial_ends_at);
  } else {
    // Fallback: use created_at + 14 days
    const createdAt = new Date(restaurant.created_at);
    trialEndsAt = new Date(createdAt.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
  }

  const now = new Date();
  const diff = trialEndsAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

/**
 * Get current access status
 */
export function getAccessStatus(
  subscription: Subscription | null,
  restaurant: Restaurant | null
): AccessStatus {
  // Pro subscription always has full access
  if (isPro(subscription)) return 'pro';

  // Check trial period
  if (isInTrial(restaurant)) return 'trial';

  // Trial expired and no Pro subscription
  return 'expired';
}

/**
 * Check if user has full access (either Pro or in trial)
 */
export function hasFullAccess(
  subscription: Subscription | null,
  restaurant: Restaurant | null
): boolean {
  const status = getAccessStatus(subscription, restaurant);
  return status === 'pro' || status === 'trial';
}

/**
 * Check if watermark should be shown
 * Only show watermark if trial expired and no Pro subscription
 */
export function shouldShowWatermark(
  subscription: Subscription | null,
  restaurant: Restaurant | null
): boolean {
  // During trial: no watermark
  // Pro: no watermark
  // Expired: show watermark
  return getAccessStatus(subscription, restaurant) === 'expired';
}

/**
 * Check if menu should show trial expiry warning
 */
export function shouldShowTrialWarning(
  subscription: Subscription | null,
  restaurant: Restaurant | null
): boolean {
  const status = getAccessStatus(subscription, restaurant);
  if (status !== 'trial') return false;

  // Show warning in last 3 days of trial
  const daysRemaining = getTrialDaysRemaining(restaurant);
  return daysRemaining <= 3;
}

// Legacy exports for backward compatibility
export const FREE_LIMITS = {
  maxRestaurants: Infinity,
  maxItems: Infinity,
  maxCategories: Infinity,
  allowedThemes: ['classic', 'modern', 'dark', 'rustic', 'oriental'] as const,
  hasLogoUpload: true,
  hasTranslation: true,
  hasTVMode: true,
  hasPDFExport: true,
  showWatermark: false,
} as const;

export const PRO_LIMITS = FREE_LIMITS;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPlanLimits(subscription: Subscription | null) {
  // All features available during trial and Pro
  return PRO_LIMITS;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isThemeAllowed(theme: string, subscription: Subscription | null): boolean {
  // All themes allowed during trial
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function canAddCategory(currentCount: number, subscription: Subscription | null): boolean {
  // No limits during trial
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function canAddItem(currentCount: number, subscription: Subscription | null): boolean {
  // No limits during trial
  return true;
}
