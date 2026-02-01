import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { trackScanSchema, validate } from '@/lib/validation';

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing Supabase credentials');
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }

  try {
    // Rate limiting - allow bursts for tracking (30 req/min)
    const identifier = getIdentifier(request);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.TRACKING);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
    }

    const body = await request.json();

    // Input validation with Zod
    const validation = validate(trackScanSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { restaurantId, language } = validation.data;

    const supabase = createClient(supabaseUrl, serviceKey);

    // Verify restaurant exists before tracking
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', restaurantId)
      .single();

    if (restaurantError || !restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    // Insert scan tracking
    const { error } = await supabase.from('menu_scans').insert({
      restaurant_id: restaurantId,
      language: language || 'de',
      user_agent: request.headers.get('user-agent') || null
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Track scan error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
