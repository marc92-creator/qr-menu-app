import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Use service role key for inserting scans (bypasses RLS for insert)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { restaurantId } = await request.json();

    if (!restaurantId) {
      return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });
    }

    // Get user agent and referrer from headers
    const userAgent = request.headers.get('user-agent') || null;
    const referrer = request.headers.get('referer') || null;

    // Insert the scan record
    const { error } = await supabase
      .from('menu_scans')
      .insert({
        restaurant_id: restaurantId,
        user_agent: userAgent,
        referrer: referrer,
      });

    if (error) {
      console.error('Error tracking scan:', error);
      // Don't fail the request if tracking fails
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track scan error:', error);
    return NextResponse.json({ success: false });
  }
}
