import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MenuView } from './MenuView';
import { getFixedDemoData } from '@/lib/sandboxStorage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if this is the demo restaurant slug
  if (slug === 'demo-doener-palace') {
    // Return fixed demo data - not affected by user modifications
    const demoData = getFixedDemoData();
    return (
      <MenuView
        restaurant={demoData.restaurant}
        categories={demoData.categories}
        menuItems={demoData.menuItems}
        showWatermark={true}
        isDemo={true}
      />
    );
  }

  const supabase = await createClient();

  // Fetch restaurant
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!restaurant) {
    notFound();
  }

  // If restaurant is marked as demo, show fixed demo data
  if (restaurant.is_demo) {
    const demoData = getFixedDemoData();
    return (
      <MenuView
        restaurant={{ ...demoData.restaurant, name: restaurant.name, slug: restaurant.slug }}
        categories={demoData.categories}
        menuItems={demoData.menuItems}
        showWatermark={true}
        isDemo={true}
      />
    );
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('menu_categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('position');

  // Fetch menu items
  const categoryIds = categories?.map((c) => c.id) || [];
  const { data: menuItems } = categoryIds.length > 0
    ? await supabase
        .from('menu_items')
        .select('*')
        .in('category_id', categoryIds)
        .eq('is_available', true)
        .order('position')
    : { data: [] };

  // Fetch subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', restaurant.owner_id)
    .eq('status', 'active')
    .single();

  const showWatermark = !subscription || subscription.plan !== 'basic';

  return (
    <MenuView
      restaurant={restaurant}
      categories={categories || []}
      menuItems={menuItems || []}
      showWatermark={showWatermark}
      isDemo={false}
    />
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name')
    .eq('slug', slug)
    .single();

  return {
    title: restaurant ? `${restaurant.name} - Speisekarte` : 'Speisekarte',
    description: restaurant ? `Speisekarte von ${restaurant.name}` : 'Digitale Speisekarte',
  };
}
