import { MenuItem, Restaurant, ImageStrategy, PhotoStyle } from '@/types/database';
import { getAutoImage } from './foodImages';

/**
 * Get the appropriate image URL for a menu item based on template and restaurant settings
 */
export function getTemplateImage(
  item: MenuItem,
  restaurant: Restaurant
): string | null {
  const imageStrategy = restaurant.image_strategy || 'ghibli';
  const templateId = restaurant.template_id || 'traditional';

  // Fine Dining: Prefer professional/real photos or none
  if (templateId === 'fine-dining') {
    if (imageStrategy === 'none') return null;
    if (item.image_professional_url) return item.image_professional_url;
    if (item.image_custom_url) return item.image_custom_url;
    return null; // Fine dining without images
  }

  // Modern Grid: Support all image types, prefer real/professional
  if (templateId === 'modern-grid') {
    if (imageStrategy === 'real' || imageStrategy === 'professional') {
      if (item.image_professional_url) return item.image_professional_url;
      if (item.image_custom_url) return item.image_custom_url;
    }
    // Fall back to Ghibli if mixed strategy
    if (imageStrategy === 'mixed' || imageStrategy === 'ghibli') {
      if (item.image_library_key) return `/food-images/${item.image_library_key}.svg`;
      const autoImage = getAutoImage(item.name);
      return autoImage ? `/food-images/${autoImage}` : null;
    }
    return null;
  }

  // Compact: No images (icons only)
  if (templateId === 'compact') {
    return null;
  }

  // Minimalist: No item images (category icons only)
  if (templateId === 'minimalist') {
    return null;
  }

  // Traditional: Current behavior with Ghibli + optional real photos
  if (imageStrategy === 'none') return null;

  // Check for custom/professional first
  if (item.image_professional_url) return item.image_professional_url;
  if (item.image_custom_url) return item.image_custom_url;

  // Then check for user-uploaded image
  if (item.image_url) return item.image_url;

  // Finally fall back to auto-generated or library
  if (restaurant.auto_images !== false) {
    if (item.image_library_key) {
      return `/food-images/${item.image_library_key}.svg`;
    }
    const autoImage = getAutoImage(item.name);
    return autoImage ? `/food-images/${autoImage}` : null;
  }

  return null;
}

/**
 * Get recommended image strategy for a template
 */
export function getRecommendedImageStrategy(templateId: string): ImageStrategy {
  const recommendations: Record<string, ImageStrategy> = {
    'fine-dining': 'real',
    'modern-grid': 'mixed',
    'compact': 'none',
    'minimalist': 'none',
    'traditional': 'ghibli',
  };

  return recommendations[templateId] || 'ghibli';
}

/**
 * Get photo style label for display
 */
export function getPhotoStyleLabel(style: PhotoStyle): string {
  const labels: Record<PhotoStyle, string> = {
    ghibli: 'Ghibli-Stil (Illustration)',
    real: 'Echtes Foto',
    professional: 'Professionelle Fotografie',
    user: 'Nutzerbeitrag',
  };

  return labels[style] || style;
}

/**
 * Check if a template supports image uploads
 */
export function supportsImageUpload(templateId: string): boolean {
  return ['traditional', 'modern-grid', 'fine-dining'].includes(templateId);
}

/**
 * Get image upload recommendations for template
 */
export function getImageUploadGuidelines(templateId: string): {
  recommended: boolean;
  aspectRatio: string;
  minDimensions: string;
  tips: string[];
} {
  const guidelines: Record<string, {
    recommended: boolean;
    aspectRatio: string;
    minDimensions: string;
    tips: string[];
  }> = {
    'fine-dining': {
      recommended: true,
      aspectRatio: '4:3',
      minDimensions: '1200x900',
      tips: [
        'Verwende professionelle Food-Fotografie',
        'Achte auf gutes Licht und Komposition',
        'Hochauflösende Bilder bevorzugt',
        'Neutrale Hintergründe empfohlen',
      ],
    },
    'modern-grid': {
      recommended: true,
      aspectRatio: '1:1 oder 16:9',
      minDimensions: '800x800',
      tips: [
        'Instagram-Style: Quadratisch oder Querformat',
        'Lebendige Farben und gute Beleuchtung',
        'Lifestyle-Shots willkommen',
        'Ghibli-Illustrationen oder echte Fotos',
      ],
    },
    'traditional': {
      recommended: false,
      aspectRatio: '1:1',
      minDimensions: '400x400',
      tips: [
        'Ghibli-Illustrationen sind Standard',
        'Optional: Eigene Fotos hochladen',
        'Kleine Thumbnails: 400x400 ausreichend',
      ],
    },
    'compact': {
      recommended: false,
      aspectRatio: 'N/A',
      minDimensions: 'N/A',
      tips: [
        'Dieses Template nutzt keine Bilder',
        'Fokus auf schnelle Übersicht',
      ],
    },
    'minimalist': {
      recommended: false,
      aspectRatio: 'N/A',
      minDimensions: 'N/A',
      tips: [
        'Dieses Template nutzt keine Gericht-Bilder',
        'Nur Kategorie-Icons werden angezeigt',
      ],
    },
  };

  return guidelines[templateId] || guidelines['traditional'];
}
