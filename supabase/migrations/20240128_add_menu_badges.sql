-- Add badge fields to menu_items for dietary and special markings

ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_vegetarian BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_vegan BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_special BOOLEAN DEFAULT false;

-- Comments for documentation
COMMENT ON COLUMN menu_items.is_vegetarian IS 'Vegetarian dish marker';
COMMENT ON COLUMN menu_items.is_vegan IS 'Vegan dish marker';
COMMENT ON COLUMN menu_items.is_popular IS 'Popular/recommended dish marker';
COMMENT ON COLUMN menu_items.is_special IS 'Daily special marker - shows at top of category';
