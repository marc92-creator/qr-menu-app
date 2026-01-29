import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing Supabase credentials');
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }

  try {
    const { restaurantId, language } = await request.json();

    if (!restaurantId) {
      return NextResponse.json({ error: 'Missing restaurantId' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Nur die existierenden Spalten verwenden - KEIN referrer!
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
