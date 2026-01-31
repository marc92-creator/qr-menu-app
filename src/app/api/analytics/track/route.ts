import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { restaurantId, dishId, eventType, eventData } = await req.json();

    if (!restaurantId || !eventType) {
      return NextResponse.json(
        { error: 'restaurantId and eventType are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Parse User Agent
    const userAgent = req.headers.get('user-agent') || '';
    let deviceType = 'desktop';
    if (/Mobile|Android|iPhone/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/Tablet|iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    }

    // Extract browser
    let browser = 'unknown';
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) {
      browser = 'Chrome';
    } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      browser = 'Safari';
    } else if (/Firefox/i.test(userAgent)) {
      browser = 'Firefox';
    } else if (/Edge/i.test(userAgent)) {
      browser = 'Edge';
    }

    // Get or generate session ID from cookie
    let sessionId = req.cookies.get('analytics_session_id')?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    // Get language from Accept-Language header
    const acceptLanguage = req.headers.get('accept-language') || '';
    const language = acceptLanguage.split(',')[0]?.split('-')[0] || 'unknown';

    // Insert analytics event
    const { error } = await supabase.from('menu_analytics').insert({
      restaurant_id: restaurantId,
      dish_id: dishId || null,
      event_type: eventType,
      event_data: eventData || null,
      device_type: deviceType,
      browser: browser,
      referrer: req.headers.get('referer') || null,
      language: language,
      session_id: sessionId,
    });

    if (error) {
      console.error('Analytics insert error:', error);
      // Don't fail the request if analytics fails
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Set session cookie (30 minutes)
    const response = NextResponse.json({ success: true });
    response.cookies.set('analytics_session_id', sessionId, {
      maxAge: 60 * 30, // 30 minutes
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
