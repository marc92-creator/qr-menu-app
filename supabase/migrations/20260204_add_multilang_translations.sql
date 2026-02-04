-- Add translation fields for all supported languages
-- Supported: DE (default), EN (exists), FR, IT, ES, TR, PL
-- Run this in Supabase SQL Editor

-- Add French, Italian, Spanish, Turkish, Polish translations to menu_items
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS name_fr VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_it VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_es VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_tr VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_pl VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_fr TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_it TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_es TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_tr TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_pl TEXT DEFAULT NULL;

-- Add French, Italian, Spanish, Turkish, Polish translations to menu_categories
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS name_fr VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_it VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_es VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_tr VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS name_pl VARCHAR(255) DEFAULT NULL;

-- Verify the columns were added
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name IN ('menu_items', 'menu_categories')
AND column_name LIKE 'name_%' OR column_name LIKE 'description_%'
ORDER BY table_name, column_name;
