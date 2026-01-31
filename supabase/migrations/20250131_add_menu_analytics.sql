-- Create menu_analytics table for detailed tracking
CREATE TABLE IF NOT EXISTS menu_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  dish_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'view', 'dish_view', 'category_view', 'filter_used', 'language_switch'
  event_data JSONB,
  device_type VARCHAR(20), -- 'mobile', 'tablet', 'desktop'
  browser VARCHAR(50),
  referrer VARCHAR(255),
  country VARCHAR(10),
  language VARCHAR(10),
  session_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_menu_analytics_restaurant ON menu_analytics(restaurant_id);
CREATE INDEX idx_menu_analytics_dish ON menu_analytics(dish_id);
CREATE INDEX idx_menu_analytics_date ON menu_analytics(created_at);
CREATE INDEX idx_menu_analytics_event ON menu_analytics(event_type);
CREATE INDEX idx_menu_analytics_session ON menu_analytics(session_id);

-- Enable RLS
ALTER TABLE menu_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only restaurant owners can see their analytics
CREATE POLICY "Users can view their own restaurant analytics"
  ON menu_analytics FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Allow insert from service role (for API tracking)
CREATE POLICY "Service role can insert analytics"
  ON menu_analytics FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE menu_analytics IS 'Detailed analytics for menu views and interactions';
COMMENT ON COLUMN menu_analytics.event_type IS 'Type of event: view, dish_view, category_view, filter_used, language_switch';
COMMENT ON COLUMN menu_analytics.device_type IS 'Device category: mobile, tablet, desktop';
COMMENT ON COLUMN menu_analytics.session_id IS 'Anonymous session identifier for tracking user journey';
