import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TVMenuView } from './TVMenuView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TVMenuPage({ params }: PageProps) {
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
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .in('category_id', categories?.map(c => c.id) || [])
    .order('position');

  return (
    <TVMenuView
      restaurant={restaurant}
      categories={categories || []}
      menuItems={menuItems || []}
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
    title: restaurant ? `${restaurant.name} - TV Menü` : 'Menü nicht gefunden',
    description: restaurant ? `Speisekarte von ${restaurant.name} - TV Ansicht` : undefined,
  };
}
