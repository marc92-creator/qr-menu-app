import { Restaurant, Category, MenuItem } from '@/types/database';
import { getDemoData, DEMO_RESTAURANT, DEMO_CATEGORIES, DEMO_MENU_ITEMS } from './demoData';

const SANDBOX_STORAGE_KEY = 'menuapp_sandbox_data';
const SANDBOX_DATA_VERSION = 6; // Increment when demo data structure changes

export interface SandboxData {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  lastModified: string;
  version?: number;
}

/**
 * Check if we're running in the browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Migrate old sandbox data to include new features (like images)
 */
function migrateSandboxData(data: SandboxData): SandboxData {
  const currentVersion = data.version || 1;

  if (currentVersion < 2) {
    // Migration v2: Add images to demo items that don't have them
    const demoData = getDemoData();
    const migratedItems = data.menuItems.map(item => {
      // Only update items that are from the original demo and don't have images
      const demoItem = demoData.menuItems.find(d => d.id === item.id);
      if (demoItem && !item.image_url && demoItem.image_url) {
        return { ...item, image_url: demoItem.image_url };
      }
      return item;
    });

    data = {
      ...data,
      menuItems: migratedItems,
      version: 2,
    };
  }

  if (currentVersion < 3) {
    // Migration v3: Add auto_images to restaurant and image_mode to menu items
    const migratedItems = data.menuItems.map(item => ({
      ...item,
      image_mode: item.image_mode || 'auto',
      image_library_key: item.image_library_key || null,
    }));

    data = {
      ...data,
      restaurant: {
        ...data.restaurant,
        auto_images: data.restaurant.auto_images !== false,
      },
      menuItems: migratedItems,
      version: 3,
    };
  }

  if (currentVersion < 4) {
    // Migration v4: Add menu_language to restaurant
    data = {
      ...data,
      restaurant: {
        ...data.restaurant,
        menu_language: data.restaurant.menu_language || 'de',
      },
      version: 4,
    };
  }

  if (currentVersion < 5) {
    // Migration v5: Add English translations from demo data
    const demoData = getDemoData();
    const migratedItems = data.menuItems.map(item => {
      // Copy English translations from demo data for demo items
      const demoItem = demoData.menuItems.find(d => d.id === item.id);
      if (demoItem) {
        return {
          ...item,
          name_en: item.name_en || demoItem.name_en || null,
          description_en: item.description_en || demoItem.description_en || null,
        };
      }
      // For user-created items, keep existing or set null
      return {
        ...item,
        name_en: item.name_en || null,
        description_en: item.description_en || null,
      };
    });

    data = {
      ...data,
      menuItems: migratedItems,
      version: 5,
    };
  }

  if (currentVersion < 6) {
    // Migration v6: Add English translations for categories
    const demoData = getDemoData();
    const migratedCategories = data.categories.map(cat => {
      // Copy English translations from demo data for demo categories
      const demoCat = demoData.categories.find(d => d.id === cat.id);
      if (demoCat) {
        return {
          ...cat,
          name_en: cat.name_en || demoCat.name_en || null,
        };
      }
      // For user-created categories, keep existing or set null
      return {
        ...cat,
        name_en: cat.name_en || null,
      };
    });

    data = {
      ...data,
      categories: migratedCategories,
      version: 6,
    };
  }

  return data;
}

/**
 * Get sandbox data from localStorage, or return default demo data
 */
export function getSandboxData(): SandboxData {
  if (!isBrowser()) {
    return {
      ...getDemoData(),
      lastModified: new Date().toISOString(),
      version: SANDBOX_DATA_VERSION,
    };
  }

  try {
    const stored = localStorage.getItem(SANDBOX_STORAGE_KEY);
    if (stored) {
      let data = JSON.parse(stored) as SandboxData;

      // Check if data needs migration
      if (!data.version || data.version < SANDBOX_DATA_VERSION) {
        data = migrateSandboxData(data);
        // Save migrated data
        localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(data));
      }

      return data;
    }
  } catch (error) {
    console.error('Error reading sandbox data:', error);
  }

  // Return default demo data
  return {
    ...getDemoData(),
    lastModified: new Date().toISOString(),
    version: SANDBOX_DATA_VERSION,
  };
}

/**
 * Save sandbox data to localStorage
 */
export function saveSandboxData(data: Partial<SandboxData>): void {
  if (!isBrowser()) return;

  try {
    const current = getSandboxData();
    const updated: SandboxData = {
      restaurant: data.restaurant || current.restaurant,
      categories: data.categories || current.categories,
      menuItems: data.menuItems || current.menuItems,
      lastModified: new Date().toISOString(),
    };
    localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving sandbox data:', error);
  }
}

/**
 * Reset sandbox data to default demo data
 */
export function resetSandboxData(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(SANDBOX_STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting sandbox data:', error);
  }
}

/**
 * Check if sandbox has been modified from defaults
 */
export function hasSandboxModifications(): boolean {
  if (!isBrowser()) return false;

  try {
    const stored = localStorage.getItem(SANDBOX_STORAGE_KEY);
    return stored !== null;
  } catch {
    return false;
  }
}

/**
 * Add a category in sandbox mode
 */
export function addSandboxCategory(name: string, nameEn?: string): Category {
  const data = getSandboxData();
  const newCategory: Category = {
    id: `sandbox-cat-${Date.now()}`,
    restaurant_id: data.restaurant.id,
    name,
    name_en: nameEn || null,
    position: data.categories.length,
    created_at: new Date().toISOString(),
  };

  saveSandboxData({
    categories: [...data.categories, newCategory],
  });

  return newCategory;
}

/**
 * Delete a category in sandbox mode
 */
export function deleteSandboxCategory(categoryId: string): void {
  const data = getSandboxData();
  saveSandboxData({
    categories: data.categories.filter(c => c.id !== categoryId),
    menuItems: data.menuItems.filter(i => i.category_id !== categoryId),
  });
}

/**
 * Add a menu item in sandbox mode
 */
export function addSandboxMenuItem(item: Omit<MenuItem, 'id' | 'created_at'>): MenuItem {
  const data = getSandboxData();
  const newItem: MenuItem = {
    ...item,
    id: `sandbox-item-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  saveSandboxData({
    menuItems: [...data.menuItems, newItem],
  });

  return newItem;
}

/**
 * Update a menu item in sandbox mode
 */
export function updateSandboxMenuItem(itemId: string, updates: Partial<MenuItem>): void {
  const data = getSandboxData();
  saveSandboxData({
    menuItems: data.menuItems.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ),
  });
}

/**
 * Delete a menu item in sandbox mode
 */
export function deleteSandboxMenuItem(itemId: string): void {
  const data = getSandboxData();
  saveSandboxData({
    menuItems: data.menuItems.filter(i => i.id !== itemId),
  });
}

/**
 * Update restaurant info in sandbox mode
 */
export function updateSandboxRestaurant(updates: Partial<Restaurant>): void {
  const data = getSandboxData();
  saveSandboxData({
    restaurant: { ...data.restaurant, ...updates, updated_at: new Date().toISOString() },
  });
}

/**
 * Update a category in sandbox mode
 */
export function updateSandboxCategory(categoryId: string, updates: Partial<Category>): void {
  const data = getSandboxData();
  saveSandboxData({
    categories: data.categories.map(cat =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    ),
  });
}

/**
 * Reorder categories in sandbox mode
 */
export function reorderSandboxCategories(orderedIds: string[]): void {
  const data = getSandboxData();
  const reordered = orderedIds.map((id, index) => {
    const cat = data.categories.find(c => c.id === id);
    return cat ? { ...cat, position: index } : null;
  }).filter((c): c is Category => c !== null);

  saveSandboxData({ categories: reordered });
}

/**
 * Reorder menu items within a category in sandbox mode
 */
export function reorderSandboxMenuItems(categoryId: string, orderedIds: string[]): void {
  const data = getSandboxData();
  const otherItems = data.menuItems.filter(i => i.category_id !== categoryId);
  const reorderedItems = orderedIds.map((id, index) => {
    const item = data.menuItems.find(i => i.id === id);
    return item ? { ...item, position: index } : null;
  }).filter((i): i is MenuItem => i !== null);

  saveSandboxData({ menuItems: [...otherItems, ...reorderedItems] });
}

/**
 * Get the fixed demo data (for public menu view)
 * This always returns the original demo data, not user modifications
 */
export function getFixedDemoData() {
  return {
    restaurant: DEMO_RESTAURANT,
    categories: DEMO_CATEGORIES,
    menuItems: DEMO_MENU_ITEMS,
  };
}
