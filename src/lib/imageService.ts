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

// Category-based fallback images for 'real' strategy
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  // Beverages
  getraenke: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  getränke: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  boissons: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  // Desserts
  desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  nachtisch: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  süßes: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  // Starters/Appetizers
  starters: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  vorspeisen: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  antipasti: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  entrées: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  appetizers: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  // Salads
  salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  salate: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  salades: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  // Pizza
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  pizzas: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  // Pasta
  pasta: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
  nudeln: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
  // Main courses
  hauptgerichte: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  main: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  mains: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  plats: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
};

const GENERIC_FALLBACK = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';

/**
 * Get a category-appropriate fallback image
 */
function getCategoryFallbackImage(categoryName?: string): string {
  if (!categoryName) return GENERIC_FALLBACK;
  const normalized = categoryName.toLowerCase().trim();
  return CATEGORY_FALLBACK_IMAGES[normalized] || GENERIC_FALLBACK;
}

/**
 * Get an auto-matched image for a dish based on the image strategy
 */
export function getAutoImageByStrategy(
  dishName: string,
  strategy: ImageStrategy = 'ghibli',
  categoryName?: string
): ImageResult | null {
  if (!dishName || dishName.trim().length === 0) {
    return null;
  }

  switch (strategy) {
    case 'none':
      return null;

    case 'real':
    case 'professional': {
      const realisticImage = getRealisticFoodImage(dishName);
      if (realisticImage) {
        return {
          url: realisticImage.imageUrl,
          style: 'real',
          label: realisticImage.label,
        };
      }
      // Fallback: Use category-appropriate image (NEVER Ghibli for 'real' strategy)
      return {
        url: getCategoryFallbackImage(categoryName),
        style: 'real',
        label: dishName,
      };
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
    image_mode?: 'auto' | 'library' | 'custom' | 'none';
  },
  imageStrategy: ImageStrategy = 'ghibli',
  autoImagesEnabled: boolean = true,
  categoryName?: string
): ImageResult | null {
  const mode = item.image_mode || 'auto';

  // If restaurant has disabled auto images, only show custom images
  if (!autoImagesEnabled && mode !== 'custom') {
    return null;
  }

  switch (mode) {
    case 'none':
      return null;

    case 'custom':
      if (item.image_url) {
        return {
          url: item.image_url,
          style: 'custom',
        };
      }
      return null;

    case 'library':
      if (item.image_library_key) {
        const entry = getImageById(item.image_library_key);
        if (entry) {
          return {
            url: entry.image,
            style: 'ghibli',
            label: entry.label,
          };
        }
      }
      return null;

    case 'auto':
    default:
      return getAutoImageByStrategy(item.name, imageStrategy, categoryName);
  }
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
