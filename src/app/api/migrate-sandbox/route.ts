import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sandboxData } = await request.json();

  if (!sandboxData || !sandboxData.restaurant) {
    return NextResponse.json({ error: 'Invalid sandbox data' }, { status: 400 });
  }

  try {
    // Generate a unique slug
    const baseSlug = sandboxData.restaurant.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;

    // Create restaurant
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name: sandboxData.restaurant.name,
        slug: uniqueSlug,
        address: sandboxData.restaurant.address,
        whatsapp_number: sandboxData.restaurant.whatsapp_number,
        opening_hours: sandboxData.restaurant.opening_hours,
        theme: sandboxData.restaurant.theme || 'classic',
        menu_language: sandboxData.restaurant.menu_language || 'de',
        wifi_name: sandboxData.restaurant.wifi_name,
        wifi_password: sandboxData.restaurant.wifi_password,
        logo_url: null, // Don't migrate base64 logos - user can upload a new one
        is_active: true,
        is_demo: false,
        auto_images: sandboxData.restaurant.auto_images !== false,
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (restaurantError) {
      console.error('Restaurant creation error:', restaurantError);
      throw restaurantError;
    }

    // Create categories with ID mapping
    const categoryIdMap = new Map<string, string>();

    for (const cat of sandboxData.categories || []) {
      const { data: newCat, error: catError } = await supabase
        .from('menu_categories')
        .insert({
          restaurant_id: restaurant.id,
          name: cat.name,
          name_en: cat.name_en,
          position: cat.position,
        })
        .select()
        .single();

      if (catError) {
        console.error('Category creation error:', catError);
        continue;
      }

      if (newCat) {
        categoryIdMap.set(cat.id, newCat.id);
      }
    }

    // Create menu items
    for (const item of sandboxData.menuItems || []) {
      const newCategoryId = categoryIdMap.get(item.category_id);
      if (!newCategoryId) continue;

      const { error: itemError } = await supabase.from('menu_items').insert({
        category_id: newCategoryId,
        name: item.name,
        name_en: item.name_en,
        description: item.description,
        description_en: item.description_en,
        price: item.price,
        position: item.position,
        allergens: item.allergens || [],
        tags: item.tags || [],
        is_vegetarian: item.is_vegetarian || false,
        is_vegan: item.is_vegan || false,
        is_popular: item.is_popular || false,
        is_special: item.is_special || false,
        is_sold_out: item.is_sold_out || false,
        is_available: true,
        image_mode: item.image_mode || 'auto',
        image_library_key: item.image_library_key,
        image_url: null, // Don't migrate sandbox images
      });

      if (itemError) {
        console.error('Menu item creation error:', itemError);
      }
    }

    // Create free subscription
    const { error: subError } = await supabase.from('subscriptions').insert({
      user_id: user.id,
      plan: 'free',
      status: 'active',
    });

    if (subError) {
      console.error('Subscription creation error:', subError);
      // Non-fatal - continue anyway
    }

    return NextResponse.json({ success: true, restaurant });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
