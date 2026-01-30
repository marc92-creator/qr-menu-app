import { createClient } from '@/lib/supabase/server';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('slug, updated_at')
    .eq('is_active', true)
    .eq('is_demo', false);

  const menuUrls = (restaurants || []).map(r => ({
    url: `https://www.mymenuapp.de/m/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.mymenuapp.de',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...menuUrls,
  ];
}
