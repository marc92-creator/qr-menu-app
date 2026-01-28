-- Add tags field to menu_items for flexible tagging
-- Tags like: new, spicy, chefs_choice, etc.

ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add index for tag searches
CREATE INDEX IF NOT EXISTS idx_menu_items_tags ON menu_items USING GIN (tags);

COMMENT ON COLUMN menu_items.tags IS 'Array of tag identifiers: new, spicy, chefs_choice, etc.';
