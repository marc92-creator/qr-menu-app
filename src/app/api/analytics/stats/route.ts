import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get('restaurantId');
    const period = parseInt(searchParams.get('period') || '30'); // Days

    if (!restaurantId) {
      return NextResponse.json(
        { error: 'restaurantId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user owns this restaurant
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', restaurantId)
      .eq('owner_id', user.id)
      .single();

    if (!restaurant) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Calculate start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    // Get total views
    const { count: totalViews } = await supabase
      .from('menu_analytics')
      .select('id', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId)
      .eq('event_type', 'view')
      .gte('created_at', startDate.toISOString());

    // Get views by day
    const { data: viewsByDay } = await supabase.rpc('get_views_by_day', {
      p_restaurant_id: restaurantId,
      p_start_date: startDate.toISOString(),
    });

    // Get top dishes
    const { data: topDishes } = await supabase.rpc('get_top_dishes', {
      p_restaurant_id: restaurantId,
      p_limit: 10,
    });

    // Get device stats
    const { data: deviceStats } = await supabase.rpc('get_device_stats', {
      p_restaurant_id: restaurantId,
    });

    // Get language stats
    const { data: languageStats } = await supabase.rpc('get_language_stats', {
      p_restaurant_id: restaurantId,
    });

    // Get peak hours
    const { data: peakHours } = await supabase.rpc('get_peak_hours', {
      p_restaurant_id: restaurantId,
    });

    // Get category stats
    const { data: categoryStats } = await supabase.rpc('get_category_stats', {
      p_restaurant_id: restaurantId,
    });

    return NextResponse.json({
      totalViews: totalViews || 0,
      viewsByDay: viewsByDay || [],
      topDishes: topDishes || [],
      deviceStats: deviceStats || [],
      languageStats: languageStats || [],
      peakHours: peakHours || [],
      categoryStats: categoryStats || [],
      period,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}
