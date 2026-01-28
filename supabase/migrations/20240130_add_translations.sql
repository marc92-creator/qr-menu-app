-- Add translation fields for multi-language support
-- Run this in Supabase SQL Editor

-- Add English name and description to menu_items (if not exists)
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS name_en VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT NULL;

-- Add English name to categories (if not exists)
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS name_en VARCHAR(255) DEFAULT NULL;

-- Verify the columns were added
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name IN ('menu_items', 'menu_categories')
AND column_name IN ('name_en', 'description_en')
ORDER BY table_name, column_name;
