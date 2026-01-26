import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MenuView } from './MenuView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params;
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
  const isDemo = restaurant.is_demo || false;

  return (
    <MenuView
      restaurant={restaurant}
      categories={categories || []}
      menuItems={menuItems || []}
      showWatermark={showWatermark}
      isDemo={isDemo}
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
