'use client';

import { Subscription } from '@/types/database';

// Plan limits
export const FREE_LIMITS = {
  maxRestaurants: 1,
  maxItems: 15,
  maxCategories: 3,
  allowedThemes: ['classic', 'modern'] as const,
  hasLogoUpload: false,
  hasTranslation: false,
  hasTVMode: false,
  hasPDFExport: false,
  showWatermark: true,
} as const;

export const PRO_LIMITS = {
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

export type PlanType = 'free' | 'pro';

export interface PlanLimits {
  maxRestaurants: number;
  maxItems: number;
  maxCategories: number;
  allowedThemes: readonly string[];
  hasLogoUpload: boolean;
  hasTranslation: boolean;
  hasTVMode: boolean;
  hasPDFExport: boolean;
  showWatermark: boolean;
}

/**
 * Check if user has Pro subscription
 */
export function isPro(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  // 'basic' is the Pro plan in the database (legacy naming)
  return subscription.plan === 'basic' && subscription.status === 'active';
}

/**
 * Get plan type from subscription
 */
export function getPlanType(subscription: Subscription | null): PlanType {
  return isPro(subscription) ? 'pro' : 'free';
}

/**
 * Get plan limits based on subscription
 */
export function getPlanLimits(subscription: Subscription | null): PlanLimits {
  return isPro(subscription) ? PRO_LIMITS : FREE_LIMITS;
}

/**
 * Check if a theme is allowed for the plan
 */
export function isThemeAllowed(theme: string, subscription: Subscription | null): boolean {
  const limits = getPlanLimits(subscription);
  return limits.allowedThemes.includes(theme);
}

/**
 * Check if user can add more restaurants
 */
export function canAddRestaurant(currentCount: number, subscription: Subscription | null): boolean {
  const limits = getPlanLimits(subscription);
  return currentCount < limits.maxRestaurants;
}

/**
 * Check if user can add more categories
 */
export function canAddCategory(currentCount: number, subscription: Subscription | null): boolean {
  const limits = getPlanLimits(subscription);
  return currentCount < limits.maxCategories;
}

/**
 * Check if user can add more items
 */
export function canAddItem(currentCount: number, subscription: Subscription | null): boolean {
  const limits = getPlanLimits(subscription);
  return currentCount < limits.maxItems;
}

/**
 * Get remaining count for a limit
 */
export function getRemainingCount(
  currentCount: number,
  limitType: 'restaurants' | 'categories' | 'items',
  subscription: Subscription | null
): number {
  const limits = getPlanLimits(subscription);
  const max = limitType === 'restaurants' ? limits.maxRestaurants
    : limitType === 'categories' ? limits.maxCategories
    : limits.maxItems;

  if (max === Infinity) return Infinity;
  return Math.max(0, max - currentCount);
}
