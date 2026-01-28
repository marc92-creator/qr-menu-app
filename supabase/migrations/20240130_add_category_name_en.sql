-- Add English name field to categories for multi-language support
-- Run this in Supabase SQL Editor

ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS name_en VARCHAR(255) DEFAULT NULL;

-- Verify the column was added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'menu_categories'
AND column_name = 'name_en';
