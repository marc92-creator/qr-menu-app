/**
 * Shared validation schemas using Zod
 */

import { z } from 'zod';

// UUID validation
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Language validation
export const languageSchema = z.enum(['de', 'en'], {
  message: 'Language must be "de" or "en"'
});

// Slug validation (alphanumeric and hyphens)
export const slugSchema = z.string().regex(
  /^[a-z0-9-]+$/i,
  'Slug must contain only letters, numbers, and hyphens'
);

// Email validation
export const emailSchema = z.string().email('Invalid email format');

// Restaurant ID validation
export const restaurantIdSchema = uuidSchema;

// Dish ID validation
export const dishIdSchema = uuidSchema;

// Event type validation for analytics
export const eventTypeSchema = z.enum(['menu_view', 'dish_view', 'category_click', 'search', 'filter']);

// AI API validation schemas
export const aiDescribeDishSchema = z.object({
  dishName: z.string()
    .min(1, 'Dish name is required')
    .max(200, 'Dish name too long (max 200 characters)'),
  ingredients: z.string()
    .max(500, 'Ingredients too long (max 500 characters)')
    .optional(),
  category: z.string()
    .max(100, 'Category too long (max 100 characters)')
    .optional(),
  language: languageSchema.default('de'),
});

export const aiTranslateSchema = z.object({
  texts: z.array(z.string().max(500, 'Text too long (max 500 characters)'))
    .min(1, 'At least one text is required')
    .max(50, 'Too many texts (max 50)'),
  fromLang: languageSchema.default('de'),
  toLang: languageSchema.default('en'),
});

// Track scan validation
export const trackScanSchema = z.object({
  restaurantId: restaurantIdSchema,
  language: languageSchema.optional(),
});

// Analytics track validation
export const analyticsTrackSchema = z.object({
  restaurantId: restaurantIdSchema,
  dishId: dishIdSchema.optional(),
  eventType: eventTypeSchema,
  eventData: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Validate data against schema
 * Returns validation result with typed data or error
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Format Zod errors into a readable message
  const errorMessage = result.error.issues
    .map(err => `${err.path.join('.')}: ${err.message}`)
    .join(', ');

  return { success: false, error: errorMessage };
}
