-- Migration: Add template-specific fields to restaurants and menu_items
-- Created: 2026-02-01

-- =====================================================
-- RESTAURANTS TABLE - Template-specific configuration
-- =====================================================

-- Template configuration (JSON for flexibility)
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS template_config JSONB DEFAULT '{}'::jsonb;

-- Fine Dining specific
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS chef_message TEXT,
ADD COLUMN IF NOT EXISTS philosophy TEXT,
ADD COLUMN IF NOT EXISTS awards TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS dresscode TEXT,
ADD COLUMN IF NOT EXISTS reservation_required BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sommelier_available BOOLEAN DEFAULT false;

-- Modern Grid specific
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
ADD COLUMN IF NOT EXISTS instagram_hashtag TEXT,
ADD COLUMN IF NOT EXISTS photo_credits BOOLEAN DEFAULT false;

-- Image strategy (applies to all templates)
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS image_strategy VARCHAR(50) DEFAULT 'ghibli';

-- Compact specific
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS enable_search BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS number_shortcuts BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS quick_order BOOLEAN DEFAULT false;

-- Minimalist specific
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS focus_mode BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS minimalist_quote TEXT;

COMMENT ON COLUMN restaurants.template_config IS 'JSON configuration for template-specific settings';
COMMENT ON COLUMN restaurants.chef_message IS 'Welcome message from the chef (Fine Dining)';
COMMENT ON COLUMN restaurants.philosophy IS 'Restaurant philosophy/story';
COMMENT ON COLUMN restaurants.awards IS 'Array of awards (Michelin stars, etc.)';
COMMENT ON COLUMN restaurants.image_strategy IS 'Image strategy: ghibli, real, professional, mixed, none';

-- =====================================================
-- MENU_ITEMS TABLE - Extended item information
-- =====================================================

-- Universal fields
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS preparation_time INTEGER,
ADD COLUMN IF NOT EXISTS spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 5),
ADD COLUMN IF NOT EXISTS item_number INTEGER,
ADD COLUMN IF NOT EXISTS seasonal BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS season VARCHAR(20);

-- Fine Dining specific
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS wine_pairings TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS course_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS chef_note TEXT,
ADD COLUMN IF NOT EXISTS origin_region TEXT;

-- Nutritional information (Traditional)
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS protein DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS carbs DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS fat DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS portion_size VARCHAR(50);

-- Image management
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS image_custom_url TEXT,
ADD COLUMN IF NOT EXISTS image_professional_url TEXT,
ADD COLUMN IF NOT EXISTS image_credit TEXT,
ADD COLUMN IF NOT EXISTS photo_style VARCHAR(50) DEFAULT 'ghibli';

-- Modern Grid specific
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS hashtags TEXT[] DEFAULT '{}';

-- Compact specific (sizes and addons stored as JSON)
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS sizes JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS addons JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN menu_items.preparation_time IS 'Preparation time in minutes';
COMMENT ON COLUMN menu_items.spice_level IS 'Spice level from 0 (mild) to 5 (very hot)';
COMMENT ON COLUMN menu_items.item_number IS 'Order number for phone orders (Compact template)';
COMMENT ON COLUMN menu_items.wine_pairings IS 'Wine pairing recommendations (Fine Dining)';
COMMENT ON COLUMN menu_items.course_type IS 'Course type: amuse, starter, main, dessert, cheese';
COMMENT ON COLUMN menu_items.photo_style IS 'Photo style: ghibli, real, professional, user';
COMMENT ON COLUMN menu_items.sizes IS 'JSON: {small: 8.50, medium: 10.50, large: 12.50}';
COMMENT ON COLUMN menu_items.addons IS 'JSON: [{name: "Extra Käse", price: 1.50}]';

-- =====================================================
-- INDEXES for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_menu_items_course_type ON menu_items(course_type);
CREATE INDEX IF NOT EXISTS idx_menu_items_spice_level ON menu_items(spice_level);
CREATE INDEX IF NOT EXISTS idx_menu_items_seasonal ON menu_items(seasonal);
CREATE INDEX IF NOT EXISTS idx_menu_items_item_number ON menu_items(item_number);
CREATE INDEX IF NOT EXISTS idx_restaurants_image_strategy ON restaurants(image_strategy);

-- =====================================================
-- Update RLS policies (if needed)
-- =====================================================

-- No changes to RLS needed - new columns inherit existing policies
