/**
 * Unified Image Service
 *
 * Provides food images based on restaurant's image strategy:
 * - 'ghibli': Illustrated Ghibli-style images (default)
 * - 'real': Realistic photos from Unsplash
 * - 'professional': Reserved for future use
 * - 'mixed': Mix of both styles
 * - 'none': No auto images
 */

import { ImageStrategy } from '@/types/database';
import { getAutoImage, getImageById, FOOD_IMAGE_LIBRARY } from './foodImages';
import { getRealisticFoodImage, REALISTIC_FOOD_LIBRARY } from './realisticFoodImages';

export interface ImageResult {
  url: string;
  style: 'ghibli' | 'real' | 'custom' | 'none';
  label?: string;
}

/**
 * Get an auto-matched image for a dish based on the image strategy
 */
export function getAutoImageByStrategy(
  dishName: string,
  strategy: ImageStrategy = 'ghibli'
): ImageResult | null {
  if (!dishName || dishName.trim().length === 0) {
    return null;
  }

  switch (strategy) {
    case 'none':
      return null;

    case 'real':
    case 'professional': {
      console.log('[getAutoImageByStrategy] Looking for realistic image for:', dishName);
      const realisticImage = getRealisticFoodImage(dishName);
      console.log('[getAutoImageByStrategy] Found realistic image:', realisticImage?.label || 'NONE');
      if (realisticImage) {
        console.log('[getAutoImageByStrategy] Returning URL:', realisticImage.imageUrl);
        return {
          url: realisticImage.imageUrl,
          style: 'real',
          label: realisticImage.label,
        };
      }
      // No fallback to Ghibli - if user wants realistic, don't show illustrations
      console.log('[getAutoImageByStrategy] No realistic image found, returning null');
      return null;
    }

    case 'mixed': {
      // Alternate between styles based on dish name hash
      const hash = dishName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const useRealistic = hash % 2 === 0;

      if (useRealistic) {
        const realisticImage = getRealisticFoodImage(dishName);
        if (realisticImage) {
          return {
            url: realisticImage.imageUrl,
            style: 'real',
            label: realisticImage.label,
          };
        }
      }

      // Fallback or default to Ghibli
      const ghibliUrl = getAutoImage(dishName);
      if (ghibliUrl && ghibliUrl !== '/food-images/default-food.svg') {
        return {
          url: ghibliUrl,
          style: 'ghibli',
        };
      }
      return null;
    }

    case 'ghibli':
    default: {
      const ghibliUrl = getAutoImage(dishName);
      if (ghibliUrl && ghibliUrl !== '/food-images/default-food.svg') {
        return {
          url: ghibliUrl,
          style: 'ghibli',
        };
      }
      return null;
    }
  }
}

/**
 * Get an image URL for a menu item based on its settings and restaurant strategy
 */
export function getItemImageByStrategy(
  item: {
    name: string;
    image_url?: string | null;
    image_library_key?: string | null;
    image_mode?: 'auto' | 'library' | 'custom' | 'none' | null;
  },
  imageStrategy: ImageStrategy = 'ghibli',
  autoImagesEnabled: boolean = true
): ImageResult | null {
  // Handle null, undefined, or empty string as 'auto'
  const mode = (item.image_mode && item.image_mode !== '') ? item.image_mode : 'auto';

  // Debug logging
  console.log('[getItemImageByStrategy]', {
    itemName: item.name,
    rawImageMode: item.image_mode,
    resolvedMode: mode,
    imageStrategy,
    autoImagesEnabled,
  });

  // If restaurant has disabled auto images, only show custom images
  if (!autoImagesEnabled && mode !== 'custom') {
    console.log('[getItemImageByStrategy] Auto images disabled, returning null');
    return null;
  }

  let result: ImageResult | null = null;

  switch (mode) {
    case 'none':
      result = null;
      break;

    case 'custom':
      if (item.image_url) {
        result = {
          url: item.image_url,
          style: 'custom',
        };
      }
      break;

    case 'library':
      if (item.image_library_key) {
        const entry = getImageById(item.image_library_key);
        if (entry) {
          result = {
            url: entry.image,
            style: 'ghibli',
            label: entry.label,
          };
        }
      }
      break;

    case 'auto':
    default:
      result = getAutoImageByStrategy(item.name, imageStrategy);
      break;
  }

  console.log('[getItemImageByStrategy] Result:', result?.url?.substring(0, 60) || 'null');
  return result;
}

/**
 * Get all available images for browsing, filtered by strategy
 */
export function getImageLibraryByStrategy(
  strategy: ImageStrategy = 'ghibli',
  category?: string
): Array<{ id: string; url: string; label: string; style: 'ghibli' | 'real' }> {
  const results: Array<{ id: string; url: string; label: string; style: 'ghibli' | 'real' }> = [];

  if (strategy === 'ghibli' || strategy === 'mixed') {
    const ghibliImages = category
      ? FOOD_IMAGE_LIBRARY.filter(img => img.category === category)
      : FOOD_IMAGE_LIBRARY;

    for (const img of ghibliImages) {
      results.push({
        id: img.id,
        url: img.image,
        label: img.label,
        style: 'ghibli',
      });
    }
  }

  if (strategy === 'real' || strategy === 'professional' || strategy === 'mixed') {
    const realisticImages = category
      ? REALISTIC_FOOD_LIBRARY.filter(img => img.category === category)
      : REALISTIC_FOOD_LIBRARY;

    for (const img of realisticImages) {
      results.push({
        id: img.id,
        url: img.imageUrl,
        label: img.label,
        style: 'real',
      });
    }
  }

  return results;
}

/**
 * Image strategy display labels
 */
export const IMAGE_STRATEGY_LABELS: Record<ImageStrategy, { label: string; description: string }> = {
  ghibli: {
    label: 'Ghibli Illustrationen',
    description: 'Warme, illustrierte Bilder im Anime-Stil',
  },
  real: {
    label: 'Realistische Fotos',
    description: 'Professionelle Food-Fotografien',
  },
  professional: {
    label: 'Profi-Fotos',
    description: 'Hochwertige Produktfotos',
  },
  mixed: {
    label: 'Gemischt',
    description: 'Mischung aus Illustrationen und Fotos',
  },
  none: {
    label: 'Keine Bilder',
    description: 'Nur Text, keine automatischen Bilder',
  },
};
