export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface OpeningHours {
  [key: string]: { open: string; close: string; closed?: boolean };
}

export type MenuTheme = 'classic' | 'dark' | 'rustic' | 'modern' | 'oriental' | 'italian' | 'japanese' | 'cafe' | 'finedining';
export type MenuLanguage = 'de' | 'en';
export type ImageStrategy = 'ghibli' | 'real' | 'professional' | 'mixed' | 'none';
export type CourseType = 'amuse' | 'starter' | 'main' | 'dessert' | 'cheese';
export type PhotoStyle = 'ghibli' | 'real' | 'professional' | 'user';
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';

// Menu Schedule for time-based category switching
export interface MenuSchedule {
  id: string;
  name: string; // "Frühstück", "Mittagstisch", "Abendkarte"
  categoryIds: string[];
  startTime: string; // "06:00"
  endTime: string; // "11:00"
  daysOfWeek: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  isActive: boolean;
}

// Template-specific configuration
export interface TemplateConfig {
  // Fine Dining
  showWinePairings?: boolean;
  showChefNotes?: boolean;
  showCourseTypes?: boolean;

  // Modern Grid
  enableInstagram?: boolean;
  showPhotoCredits?: boolean;

  // Compact
  showItemNumbers?: boolean;
  showSizes?: boolean;
  enableQuickOrder?: boolean;

  // Traditional
  showNutritionalInfo?: boolean;
  showSpiceLevel?: boolean;
  showPortionSizes?: boolean;

  // Minimalist
  enableFocusMode?: boolean;
  showReadingTime?: boolean;
}

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
  template_id?: string;
  menu_language: MenuLanguage;
  logo_url: string | null;
  wifi_name: string | null;
  wifi_password: string | null;
  is_active: boolean;
  is_demo: boolean;
  auto_images: boolean;
  trial_ends_at: string | null;
  created_at: string;
  updated_at: string;

  // Template configuration
  template_config?: TemplateConfig;
  image_strategy?: ImageStrategy;

  // Fine Dining specific
  chef_message?: string | null;
  philosophy?: string | null;
  awards?: string[] | null;
  dresscode?: string | null;
  reservation_required?: boolean;
  sommelier_available?: boolean;

  // Modern Grid specific
  instagram_handle?: string | null;
  instagram_hashtag?: string | null;
  photo_credits?: boolean;

  // Compact specific
  enable_search?: boolean;
  number_shortcuts?: boolean;
  quick_order?: boolean;

  // Minimalist specific
  focus_mode?: boolean;
  minimalist_quote?: string | null;

  // Menu Scheduling
  menu_schedules?: MenuSchedule[] | null;
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

// Size options for items (e.g., pizza sizes)
export interface ItemSize {
  small?: number;
  medium?: number;
  large?: number;
  [key: string]: number | undefined;
}

// Addon options (e.g., extra cheese)
export interface ItemAddon {
  name: string;
  price: number;
  name_en?: string;
}

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
  is_recommended: boolean;
  is_new: boolean;
  is_special: boolean;
  is_sold_out: boolean;
  upsell_text: string | null;
  position: number;
  allergens: string[];
  tags: string[];
  created_at: string;

  // Universal new fields
  preparation_time?: number | null;
  spice_level?: number | null;
  item_number?: number | null;
  seasonal?: boolean;
  season?: Season | null;

  // Fine Dining specific
  wine_pairings?: string[] | null;
  course_type?: CourseType | null;
  chef_note?: string | null;
  origin_region?: string | null;

  // Nutritional information
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  portion_size?: string | null;

  // Image management
  image_custom_url?: string | null;
  image_professional_url?: string | null;
  image_credit?: string | null;
  photo_style?: PhotoStyle;

  // Modern Grid specific
  instagram_url?: string | null;
  hashtags?: string[] | null;

  // Compact specific
  sizes?: ItemSize | null;
  addons?: ItemAddon[] | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  lemon_squeezy_customer_id: string | null;
  lemon_squeezy_subscription_id: string | null;
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

export interface ScanStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
}
