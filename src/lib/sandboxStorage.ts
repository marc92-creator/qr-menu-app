import { Restaurant, Category, MenuItem } from '@/types/database';
import { getDemoData, DEMO_RESTAURANT, DEMO_CATEGORIES, DEMO_MENU_ITEMS } from './demoData';

const SANDBOX_STORAGE_KEY = 'menuapp_sandbox_data';

export interface SandboxData {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  lastModified: string;
}

/**
 * Check if we're running in the browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get sandbox data from localStorage, or return default demo data
 */
export function getSandboxData(): SandboxData {
  if (!isBrowser()) {
    return {
      ...getDemoData(),
      lastModified: new Date().toISOString(),
    };
  }

  try {
    const stored = localStorage.getItem(SANDBOX_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as SandboxData;
      return data;
    }
  } catch (error) {
    console.error('Error reading sandbox data:', error);
  }

  // Return default demo data
  return {
    ...getDemoData(),
    lastModified: new Date().toISOString(),
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
export function addSandboxCategory(name: string): Category {
  const data = getSandboxData();
  const newCategory: Category = {
    id: `sandbox-cat-${Date.now()}`,
    restaurant_id: data.restaurant.id,
    name,
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
