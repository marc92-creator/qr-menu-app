-- Add image mode fields to menu_items for flexible image selection
-- Modes: 'auto' (match by name), 'library' (from image library), 'custom' (uploaded), 'none' (no image)

ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS image_mode VARCHAR(20) DEFAULT 'auto',
ADD COLUMN IF NOT EXISTS image_library_key VARCHAR(100) DEFAULT NULL;

COMMENT ON COLUMN menu_items.image_mode IS 'Image display mode: auto, library, custom, or none';
COMMENT ON COLUMN menu_items.image_library_key IS 'Key for library image when image_mode is library';
