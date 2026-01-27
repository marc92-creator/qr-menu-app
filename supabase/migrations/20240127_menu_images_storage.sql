-- Menu Images Storage Bucket
-- This migration documents the storage bucket setup required in Supabase

-- NOTE: Storage bucket creation is typically done via the Supabase dashboard or CLI
-- The following commands are for reference/documentation

-- 1. Create the storage bucket (via Supabase Dashboard or CLI):
--    Bucket name: menu-images
--    Public: Yes
--    File size limit: 5MB
--    Allowed MIME types: image/jpeg, image/png, image/webp

-- 2. Create RLS policies for the bucket:

-- Policy: Allow authenticated users to upload images for their restaurants
-- INSERT policy (upload):
-- ((bucket_id = 'menu-images'::text) AND (auth.role() = 'authenticated'::text))

-- Policy: Allow authenticated users to delete their own images
-- DELETE policy:
-- ((bucket_id = 'menu-images'::text) AND (auth.role() = 'authenticated'::text))

-- Policy: Allow public read access to all images
-- SELECT policy:
-- (bucket_id = 'menu-images'::text)

-- The image_url column already exists in menu_items table (see database.ts types)
-- This column stores the public URL of the uploaded image

-- Verify the column exists (no-op if already present):
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN image_url TEXT DEFAULT NULL;
  END IF;
END $$;
