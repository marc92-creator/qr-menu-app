-- RPC Function: Get views by day
CREATE OR REPLACE FUNCTION get_views_by_day(p_restaurant_id UUID, p_start_date TIMESTAMP)
RETURNS TABLE(date DATE, views BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    DATE(created_at) as date,
    COUNT(*) as views
  FROM menu_analytics
  WHERE restaurant_id = p_restaurant_id
    AND event_type = 'view'
    AND created_at >= p_start_date
  GROUP BY DATE(created_at)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get top dishes
CREATE OR REPLACE FUNCTION get_top_dishes(p_restaurant_id UUID, p_limit INT DEFAULT 10)
RETURNS TABLE(dish_id UUID, dish_name TEXT, views BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ma.dish_id,
    mi.name as dish_name,
    COUNT(*) as views
  FROM menu_analytics ma
  JOIN menu_items mi ON mi.id = ma.dish_id
  WHERE ma.restaurant_id = p_restaurant_id
    AND ma.event_type = 'dish_view'
    AND ma.dish_id IS NOT NULL
  GROUP BY ma.dish_id, mi.name
  ORDER BY views DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get device stats
CREATE OR REPLACE FUNCTION get_device_stats(p_restaurant_id UUID)
RETURNS TABLE(device_type TEXT, count BIGINT, percentage NUMERIC) AS $$
BEGIN
  RETURN QUERY
  WITH total AS (
    SELECT COUNT(*) as total_count
    FROM menu_analytics
    WHERE restaurant_id = p_restaurant_id
  )
  SELECT
    ma.device_type,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / NULLIF(t.total_count, 0), 1) as percentage
  FROM menu_analytics ma, total t
  WHERE ma.restaurant_id = p_restaurant_id
  GROUP BY ma.device_type, t.total_count
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get language stats
CREATE OR REPLACE FUNCTION get_language_stats(p_restaurant_id UUID)
RETURNS TABLE(language TEXT, count BIGINT, percentage NUMERIC) AS $$
BEGIN
  RETURN QUERY
  WITH total AS (
    SELECT COUNT(*) as total_count
    FROM menu_analytics
    WHERE restaurant_id = p_restaurant_id
      AND language IS NOT NULL
  )
  SELECT
    COALESCE(ma.language, 'unknown') as language,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / NULLIF(t.total_count, 0), 1) as percentage
  FROM menu_analytics ma, total t
  WHERE ma.restaurant_id = p_restaurant_id
    AND ma.language IS NOT NULL
  GROUP BY ma.language, t.total_count
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get peak hours
CREATE OR REPLACE FUNCTION get_peak_hours(p_restaurant_id UUID)
RETURNS TABLE(hour INT, views BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    EXTRACT(HOUR FROM created_at)::INT as hour,
    COUNT(*) as views
  FROM menu_analytics
  WHERE restaurant_id = p_restaurant_id
    AND event_type = 'view'
  GROUP BY EXTRACT(HOUR FROM created_at)
  ORDER BY hour;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get category stats
CREATE OR REPLACE FUNCTION get_category_stats(p_restaurant_id UUID)
RETURNS TABLE(category_id UUID, category_name TEXT, views BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id as category_id,
    c.name as category_name,
    COUNT(ma.id) as views
  FROM menu_categories c
  LEFT JOIN menu_items mi ON mi.category_id = c.id
  LEFT JOIN menu_analytics ma ON ma.dish_id = mi.id AND ma.event_type = 'dish_view'
  WHERE c.restaurant_id = p_restaurant_id
  GROUP BY c.id, c.name, c.position
  ORDER BY c.position;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_views_by_day TO authenticated;
GRANT EXECUTE ON FUNCTION get_top_dishes TO authenticated;
GRANT EXECUTE ON FUNCTION get_device_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_language_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_peak_hours TO authenticated;
GRANT EXECUTE ON FUNCTION get_category_stats TO authenticated;
