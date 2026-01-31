-- Add marketing badges and upsell text to menu_items
-- is_popular already exists from 20240128_add_menu_badges.sql

ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS upsell_text TEXT;

-- Comments for documentation
COMMENT ON COLUMN menu_items.is_recommended IS 'Chef recommendation badge - highlighted as house specialty';
COMMENT ON COLUMN menu_items.is_new IS 'New item badge - shows item is recently added';
COMMENT ON COLUMN menu_items.upsell_text IS 'Optional upsell tip text (e.g., "Dazu passt: Hausgemachte Aioli (+1,50€)")';
