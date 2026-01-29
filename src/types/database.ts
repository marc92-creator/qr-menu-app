export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface OpeningHours {
  [key: string]: { open: string; close: string; closed?: boolean };
}

export type MenuTheme = 'classic' | 'dark' | 'rustic' | 'modern' | 'oriental';
export type MenuLanguage = 'de' | 'en';

export interface Restaurant {
  id: string;
  owner_id: string | null;
  slug: string;
  name: string;
  address: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  opening_hours: OpeningHours | null;
  theme: MenuTheme;
  menu_language: MenuLanguage;
  logo_url: string | null;
  wifi_name: string | null;
  wifi_password: string | null;
  is_active: boolean;
  is_demo: boolean;
  auto_images: boolean;
  trial_ends_at: string | null; // When 14-day trial expires
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  name_en?: string | null;
  position: number;
  created_at: string;
}

export type ImageMode = 'auto' | 'library' | 'custom' | 'none';

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  name_en?: string | null;
  description: string | null;
  description_en?: string | null;
  price: number;
  image_url: string | null;
  image_mode: ImageMode;
  image_library_key: string | null;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_popular: boolean;
  is_special: boolean;
  is_sold_out: boolean;
  position: number;
  allergens: string[];
  tags: string[]; // New: flexible tags like 'new', 'spicy', 'chefs_choice'
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithItems extends Category {
  items: MenuItem[];
}

export interface RestaurantWithMenu extends Restaurant {
  categories: CategoryWithItems[];
  subscription?: Subscription;
}

export interface RestaurantStats {
  categoryCount: number;
  itemCount: number;
  scanStats?: ScanStats;
}

export interface RestaurantWithStats extends Restaurant {
  stats: RestaurantStats;
}

export interface MenuScan {
  id: string;
  restaurant_id: string;
  scanned_at: string;
  user_agent: string | null;
  referrer: string | null;
  language: string | null;
}

export interface ScanStats {
  totalScans: number;
  scansToday: number;
  scansThisWeek: number;
  scansThisMonth: number;
}

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: Restaurant;
        Insert: Omit<Restaurant, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Restaurant, 'id' | 'created_at' | 'updated_at'>>;
      };
      menu_categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      menu_items: {
        Row: MenuItem;
        Insert: Omit<MenuItem, 'id' | 'created_at'>;
        Update: Partial<Omit<MenuItem, 'id' | 'created_at'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
