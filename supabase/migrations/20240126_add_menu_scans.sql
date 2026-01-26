-- Create menu_scans table for tracking QR code scans
CREATE TABLE IF NOT EXISTS menu_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_scans_restaurant_id ON menu_scans(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_scans_scanned_at ON menu_scans(scanned_at);

-- Enable RLS
ALTER TABLE menu_scans ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for tracking)
CREATE POLICY "Anyone can insert scans" ON menu_scans
  FOR INSERT
  WITH CHECK (true);

-- Policy: Restaurant owners can view their scans
CREATE POLICY "Owners can view their restaurant scans" ON menu_scans
  FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Create a view for daily scan counts (for dashboard)
CREATE OR REPLACE VIEW restaurant_scan_stats AS
SELECT
  restaurant_id,
  COUNT(*) as total_scans,
  COUNT(*) FILTER (WHERE scanned_at > NOW() - INTERVAL '24 hours') as scans_today,
  COUNT(*) FILTER (WHERE scanned_at > NOW() - INTERVAL '7 days') as scans_this_week,
  COUNT(*) FILTER (WHERE scanned_at > NOW() - INTERVAL '30 days') as scans_this_month
FROM menu_scans
GROUP BY restaurant_id;
