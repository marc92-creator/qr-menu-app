-- Add theme field to restaurants for menu styling

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'classic';

-- Comment for documentation
COMMENT ON COLUMN restaurants.theme IS 'Menu theme: classic, dark, rustic, modern, oriental';
