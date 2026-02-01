-- Add template support to restaurants table
-- This allows restaurants to choose different layout templates

-- Add template_id column to restaurants
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS template_id VARCHAR(50) DEFAULT 'traditional';

-- Add comment
COMMENT ON COLUMN restaurants.template_id IS 'Menu template ID (minimalist, traditional, premium, etc.)';

-- Update existing restaurants to use traditional template (current style)
UPDATE restaurants
SET template_id = 'traditional'
WHERE template_id IS NULL;

-- Create index for template lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_template_id ON restaurants(template_id);

-- Optional: Create templates table for future custom templates
CREATE TABLE IF NOT EXISTS menu_templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  config JSONB NOT NULL,
  is_custom BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE menu_templates IS 'Available menu templates (built-in and custom)';

-- Insert built-in templates
INSERT INTO menu_templates (id, name, description, config, is_custom, is_active)
VALUES
  ('minimalist', 'Minimalist', 'Clean, text-focused design with category icons only', '{"layout": "single-column", "images": "category-headers"}', false, true),
  ('traditional', 'Traditional', 'Current style with item images and full details', '{"layout": "single-column", "images": "item-thumbnails"}', false, true)
ON CONFLICT (id) DO NOTHING;
