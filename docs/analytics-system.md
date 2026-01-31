# Analytics System Documentation

## Overview

The MenuApp analytics system tracks detailed menu views and user interactions to help restaurant owners understand their customers better.

## Database Schema

### `menu_analytics` Table

```sql
- id: UUID (Primary Key)
- restaurant_id: UUID (Foreign Key → restaurants)
- dish_id: UUID (Foreign Key → menu_items, nullable)
- event_type: VARCHAR(50) - Type of event
- event_data: JSONB - Additional event data
- device_type: VARCHAR(20) - mobile | tablet | desktop
- browser: VARCHAR(50) - Chrome | Safari | Firefox | Edge | unknown
- referrer: VARCHAR(255) - HTTP referrer
- country: VARCHAR(10) - Country code (future)
- language: VARCHAR(10) - Browser language
- session_id: VARCHAR(100) - Anonymous session identifier
- created_at: TIMESTAMP
```

**Event Types:**
- `view` - Menu page view
- `dish_view` - Specific dish viewed/clicked
- `category_view` - Category clicked
- `filter_used` - Filter applied (vegetarian, vegan, etc.)
- `language_switch` - Language changed

## API Endpoints

### Track Event

**POST** `/api/analytics/track`

Tracks a user interaction event. Automatically detects device type, browser, and language.

**Request:**
```json
{
  "restaurantId": "uuid",
  "dishId": "uuid", // optional
  "eventType": "view",
  "eventData": {} // optional JSON data
}
```

**Response:**
```json
{
  "success": true
}
```

**Auto-detected Data:**
- Device type (from User-Agent)
- Browser (from User-Agent)
- Language (from Accept-Language header)
- Session ID (cookie-based, 30 min)
- Referrer (from Referer header)

### Get Statistics

**GET** `/api/analytics/stats?restaurantId=uuid&period=30`

Returns aggregated statistics for a restaurant.

**Query Parameters:**
- `restaurantId` - Restaurant UUID (required)
- `period` - Number of days (default: 30)

**Response:**
```json
{
  "totalViews": 1234,
  "viewsByDay": [
    { "date": "2025-01-31", "views": 45 },
    { "date": "2025-01-30", "views": 38 }
  ],
  "topDishes": [
    { "dish_id": "uuid", "dish_name": "Döner im Brot", "views": 123 }
  ],
  "deviceStats": [
    { "device_type": "mobile", "count": 890, "percentage": 72.1 },
    { "device_type": "desktop", "count": 344, "percentage": 27.9 }
  ],
  "languageStats": [
    { "language": "de", "count": 980, "percentage": 79.4 },
    { "language": "en", "count": 254, "percentage": 20.6 }
  ],
  "peakHours": [
    { "hour": 12, "views": 145 },
    { "hour": 18, "views": 167 }
  ],
  "categoryStats": [
    { "category_id": "uuid", "category_name": "Döner & Wraps", "views": 456 }
  ],
  "period": 30
}
```

## Supabase RPC Functions

### `get_views_by_day(p_restaurant_id, p_start_date)`

Returns daily view counts for a date range.

### `get_top_dishes(p_restaurant_id, p_limit)`

Returns most viewed dishes with view counts.

### `get_device_stats(p_restaurant_id)`

Returns device distribution (mobile/tablet/desktop) with percentages.

### `get_language_stats(p_restaurant_id)`

Returns language distribution with percentages.

### `get_peak_hours(p_restaurant_id)`

Returns hourly view distribution (0-23).

### `get_category_stats(p_restaurant_id)`

Returns view counts per category.

## Row Level Security (RLS)

- **SELECT**: Users can only view analytics for their own restaurants
- **INSERT**: Service role can insert (for API tracking)

## Privacy & GDPR

- ✅ No personally identifiable information (PII) stored
- ✅ Session IDs are anonymous and expire after 30 minutes
- ✅ No IP addresses stored
- ✅ No cookies except anonymous session tracking
- ✅ GDPR-compliant by design

## Implementation in MenuView

Analytics tracking is automatically enabled in `/m/[slug]` routes:

```typescript
useEffect(() => {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      restaurantId: restaurant.id,
      eventType: 'view',
    }),
  }).catch((err) => console.error('Analytics tracking failed:', err));
}, [restaurant.id]);
```

## Future Enhancements

1. **Dashboard UI** - Visual charts and graphs
2. **Real-time updates** - WebSocket-based live stats
3. **Export** - CSV/PDF export of analytics data
4. **Alerts** - Notify when view count drops
5. **A/B Testing** - Test different menu layouts
6. **Heatmaps** - Visual representation of popular dishes
7. **Geo-tracking** - Country/region statistics (requires IP geolocation)

## Performance Considerations

- Analytics inserts are fire-and-forget (don't block menu rendering)
- Indexes on `restaurant_id`, `created_at`, `event_type` for fast queries
- RPC functions use aggregation at database level (fast)
- Session cookies reduce redundant tracking
