-- Add is_demo column to restaurants table
-- Demo restaurants are read-only and cannot be edited by users

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT false;

-- Mark any existing demo restaurants (optional - adjust the slug pattern as needed)
-- UPDATE restaurants SET is_demo = true WHERE slug LIKE 'demo-%';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_is_demo ON restaurants(is_demo) WHERE is_demo = true;
