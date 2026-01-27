import { createClient } from '@/lib/supabase/client';

const MAX_IMAGE_SIZE = 1024; // Max width/height in pixels
const JPEG_QUALITY = 0.8;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit for uploads

/**
 * Compress and resize an image file using canvas
 */
export async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;

      if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
        if (width > height) {
          height = Math.round((height * MAX_IMAGE_SIZE) / width);
          width = MAX_IMAGE_SIZE;
        } else {
          width = Math.round((width * MAX_IMAGE_SIZE) / height);
          height = MAX_IMAGE_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image on canvas with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Upload a menu item image to Supabase storage
 */
export async function uploadMenuItemImage(
  file: File,
  restaurantId: string,
  itemId: string
): Promise<string> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Datei ist zu groß. Maximum: 5MB');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Nur Bilder sind erlaubt');
  }

  // Compress the image
  const compressedBlob = await compressImage(file);

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `${restaurantId}/${itemId}_${timestamp}.jpg`;

  const supabase = createClient();

  // Upload to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from('menu-images')
    .upload(filename, compressedBlob, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error('Bild konnte nicht hochgeladen werden');
  }

  // Get public URL
  const { data } = supabase.storage.from('menu-images').getPublicUrl(filename);

  return data.publicUrl;
}

/**
 * Delete a menu item image from Supabase storage
 */
export async function deleteMenuItemImage(imageUrl: string): Promise<void> {
  // Extract path from URL
  const match = imageUrl.match(/menu-images\/(.+)/);
  if (!match) return;

  const path = match[1];
  const supabase = createClient();

  await supabase.storage.from('menu-images').remove([path]);
}

/**
 * Upload a restaurant logo to Supabase storage
 */
export async function uploadRestaurantLogo(
  file: File,
  restaurantId: string
): Promise<string> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Datei ist zu groß. Maximum: 5MB');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Nur Bilder sind erlaubt');
  }

  // Compress the image
  const compressedBlob = await compressImage(file);

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `logos/${restaurantId}_${timestamp}.jpg`;

  const supabase = createClient();

  // Upload to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from('menu-images')
    .upload(filename, compressedBlob, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error('Logo konnte nicht hochgeladen werden');
  }

  // Get public URL
  const { data } = supabase.storage.from('menu-images').getPublicUrl(filename);

  return data.publicUrl;
}

/**
 * Delete a restaurant logo from Supabase storage
 */
export async function deleteRestaurantLogo(logoUrl: string): Promise<void> {
  // Extract path from URL
  const match = logoUrl.match(/menu-images\/(.+)/);
  if (!match) return;

  const path = match[1];
  const supabase = createClient();

  await supabase.storage.from('menu-images').remove([path]);
}

/**
 * Validate an image file before upload
 */
export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith('image/')) {
    return 'Nur Bilder sind erlaubt (JPG, PNG, WebP)';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'Datei ist zu groß. Maximum: 5MB';
  }

  return null;
}
