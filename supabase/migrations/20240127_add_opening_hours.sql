-- Add opening hours field to restaurants
-- Stored as JSONB with format: { "mo": { "open": "11:00", "close": "22:00" }, ... }

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS opening_hours JSONB DEFAULT NULL;

-- Comment for documentation
COMMENT ON COLUMN restaurants.opening_hours IS 'Opening hours as JSON object with day keys (mo, di, mi, do, fr, sa, so) and open/close times';
