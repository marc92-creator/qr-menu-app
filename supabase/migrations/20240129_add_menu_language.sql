-- Add menu_language column to restaurants table
-- Allows restaurant owners to choose the language for their public menu (DE/EN)

-- Add the column with a default value of 'de' (German)
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS menu_language VARCHAR(2) DEFAULT 'de';

-- Add a check constraint to ensure only valid languages are used
ALTER TABLE restaurants
ADD CONSTRAINT valid_menu_language CHECK (menu_language IN ('de', 'en'));

-- Comment for documentation
COMMENT ON COLUMN restaurants.menu_language IS 'Language for public menu UI (de=German, en=English). Only affects UI labels, not dish names/descriptions.';
