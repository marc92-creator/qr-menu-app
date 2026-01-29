-- Migration: High Impact Features
-- Date: 2025-01-29
-- Features: Ausverkauft (Sold Out), WLAN, Analytics Language Tracking

-- Feature 1: Ausverkauft (Sold Out)
-- Allows marking menu items as temporarily unavailable
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_sold_out BOOLEAN DEFAULT false;

-- Feature 2: WLAN for Guests
-- Restaurant owners can display WiFi credentials on their menu
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS wifi_name VARCHAR(100) DEFAULT NULL;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS wifi_password VARCHAR(100) DEFAULT NULL;

-- Feature 3: Analytics Language Tracking
-- Track which language visitors are using when viewing menus
ALTER TABLE menu_scans ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT NULL;

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_menu_items_sold_out ON menu_items(is_sold_out) WHERE is_sold_out = true;
CREATE INDEX IF NOT EXISTS idx_menu_scans_language ON menu_scans(language);
