export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Restaurant {
  id: string;
  owner_id: string | null;
  slug: string;
  name: string;
  address: string | null;
  phone: string | null;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  position: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  position: number;
  allergens: string[];
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
}

export interface RestaurantWithStats extends Restaurant {
  stats: RestaurantStats;
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
