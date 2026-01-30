import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MenuView } from './MenuView';
import { getFixedDemoData } from '@/lib/sandboxStorage';
import { Subscription, Restaurant } from '@/types/database';

// Trial duration in days (duplicated from useSubscription.ts for server-side use)
const TRIAL_DURATION_DAYS = 14;

// Check if restaurant is still in trial period (server-side compatible)
function isInTrial(restaurant: Restaurant | null): boolean {
  if (!restaurant) return false;
  if (restaurant.trial_ends_at) {
    return new Date(restaurant.trial_ends_at) > new Date();
  }
  // Fallback: use created_at + 14 days for legacy restaurants
  const createdAt = new Date(restaurant.created_at);
  const trialEndsAt = new Date(createdAt.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
  return trialEndsAt > new Date();
}

// Check if watermark should be shown (server-side compatible)
function shouldShowWatermark(subscription: Subscription | null, restaurant: Restaurant | null): boolean {
  // Pro subscription: no watermark
  if (subscription?.plan === 'basic' && subscription?.status === 'active') {
    return false;
  }
  // During trial: no watermark
  if (isInTrial(restaurant)) {
    return false;
  }
  // Trial expired and no Pro: show watermark
  return true;
}

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

  // Watermark logic: Show only if trial expired AND no Pro subscription
  // - During trial (day 1-14): NO watermark
  // - Trial expired + no Pro: SHOW watermark
  // - Pro subscription active: NO watermark
  const showWatermarkFlag = shouldShowWatermark(subscription, restaurant);

  return (
    <MenuView
      restaurant={restaurant}
      categories={categories || []}
      menuItems={menuItems || []}
      showWatermark={showWatermarkFlag}
      isDemo={false}
    />
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, address, logo_url')
    .eq('slug', slug)
    .single();

  if (!restaurant) {
    return { title: 'Speisekarte nicht gefunden' };
  }

  const title = `${restaurant.name} - Speisekarte`;
  const description = restaurant.address
    ? `Digitale Speisekarte von ${restaurant.name} in ${restaurant.address}. Jetzt online ansehen!`
    : `Digitale Speisekarte von ${restaurant.name}. Jetzt online ansehen!`;

  return {
    title,
    description,
    keywords: [restaurant.name, 'Speisekarte', 'Menü', 'Restaurant', restaurant.address].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://qr-menu-app-beta.vercel.app/m/${slug}`,
      images: restaurant.logo_url ? [{ url: restaurant.logo_url }] : [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
