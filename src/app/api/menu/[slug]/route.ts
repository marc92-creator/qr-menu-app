import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Rate limiting - relaxed for public menu (100 req/min)
  const identifier = getIdentifier(request);
  const rateLimit = checkRateLimit(identifier, RateLimitPresets.PUBLIC_RELAXED);

  if (!rateLimit.success) {
    return createRateLimitResponse(rateLimit);
  }

  const { slug } = await params;

  // Validate slug format (alphanumeric and hyphens only)
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
  }

  const supabase = await createClient();

  // 1. Restaurant laden
  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (restaurantError || !restaurant) {
    return NextResponse.json(
      { error: 'Restaurant nicht gefunden' },
      { status: 404 }
    );
  }

  // 2. Kategorien laden
  const { data: categories, error: categoriesError } = await supabase
    .from('menu_categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('position', { ascending: true });

  if (categoriesError) {
    return NextResponse.json(
      { error: 'Fehler beim Laden der Kategorien' },
      { status: 500 }
    );
  }

  // 3. Items für alle Kategorien laden
  const categoryIds = categories?.map((c) => c.id) || [];

  const { data: items, error: itemsError } = await supabase
    .from('menu_items')
    .select('*')
    .in('category_id', categoryIds)
    .eq('is_available', true)
    .order('position', { ascending: true });

  if (itemsError) {
    return NextResponse.json(
      { error: 'Fehler beim Laden der Items' },
      { status: 500 }
    );
  }

  // 4. Items den Kategorien zuordnen
  const categoriesWithItems = categories?.map((category) => ({
    ...category,
    items: items?.filter((item) => item.category_id === category.id) || [],
  })) || [];

  return NextResponse.json({
    restaurant,
    categories: categoriesWithItems,
  });
}
