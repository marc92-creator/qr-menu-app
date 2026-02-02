import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PrintableMenu } from './PrintableMenu';
import { getFixedDemoData } from '@/lib/sandboxStorage';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string; format?: string }>;
}

export default async function PrintMenuPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { type = 'menu', format = 'a4' } = await searchParams;

  // Check if this is the demo restaurant slug
  if (slug === 'demo-doener-palace') {
    const demoData = getFixedDemoData();
    return (
      <PrintableMenu
        restaurant={demoData.restaurant}
        categories={demoData.categories}
        menuItems={demoData.menuItems}
        type={type as 'menu' | 'tent'}
        format={format as 'a4' | 'a6'}
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
      <PrintableMenu
        restaurant={{ ...demoData.restaurant, name: restaurant.name, slug: restaurant.slug }}
        categories={demoData.categories}
        menuItems={demoData.menuItems}
        type={type as 'menu' | 'tent'}
        format={format as 'a4' | 'a6'}
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

  return (
    <PrintableMenu
      restaurant={restaurant}
      categories={categories || []}
      menuItems={menuItems || []}
      type={type as 'menu' | 'tent'}
      format={format as 'a4' | 'a6'}
    />
  );
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
