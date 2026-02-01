'use client';

import { Category, MenuItem } from '@/types/database';
import { getAllergensByIds } from '@/lib/allergens';
import { formatPrice } from '@/lib/utils';
import { getCategoryIcon, MenuTemplate } from '@/lib/templates';
import { ThemeConfig } from '@/lib/themes';

interface MinimalistLayoutProps {
  categories: Category[];
  items: MenuItem[];
  template: MenuTemplate;
  language: 'de' | 'en';
  theme: ThemeConfig;
}

export function MinimalistLayout({
  categories,
  items,
  template,
  language,
  theme,
}: MinimalistLayoutProps) {
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {sortedCategories.map((category) => {
        const categoryItems = items
          .filter((item) => item.category_id === category.id)
          .sort((a, b) => a.position - b.position);

        if (categoryItems.length === 0) return null;

        const categoryIcon = getCategoryIcon(category.name);
        const categoryName = language === 'en' && category.name_en ? category.name_en : category.name;

        return (
          <div key={category.id} className="mb-12">
            {/* Category Header with Icon */}
            <div className="mb-6 pb-3 border-b-2" style={{ borderColor: theme.styles.primary }}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{categoryIcon}</span>
                <h2
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: theme.styles.primary }}
                >
                  {categoryName}
                </h2>
              </div>
            </div>

            {/* Menu Items - Minimalist Style */}
            <div className="space-y-6">
              {categoryItems.map((item) => {
                const itemName = language === 'en' && item.name_en ? item.name_en : item.name;
                const itemDescription = language === 'en' && item.description_en ? item.description_en : item.description;
                const itemAllergens = getAllergensByIds(item.allergens || []);

                return (
                  <div
                    key={item.id}
                    className="group hover:bg-gray-50/50 -mx-4 px-4 py-3 rounded-xl transition-colors"
                  >
                    {/* Name and Price Row */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3
                        className="text-xl font-semibold flex-1"
                        style={{ color: theme.styles.text }}
                      >
                        {itemName}
                        {item.is_sold_out && (
                          <span className="ml-3 text-sm font-normal text-red-600">
                            Ausverkauft
                          </span>
                        )}
                      </h3>
                      <span
                        className="text-xl font-bold whitespace-nowrap"
                        style={{ color: theme.styles.primary }}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Description */}
                    {template.density.showDescription && itemDescription && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {itemDescription}
                      </p>
                    )}

                    {/* Badges - Inline */}
                    {template.density.showBadges && (
                      <div className="flex flex-wrap gap-2">
                        {item.is_special && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                            <span>⭐</span>
                            <span>Tagesangebot</span>
                          </span>
                        )}
                        {item.is_popular && !item.is_special && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
                            <span>❤️</span>
                            <span>Beliebt</span>
                          </span>
                        )}
                        {item.is_vegan && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                            <span>🌱</span>
                            <span>Vegan</span>
                          </span>
                        )}
                        {item.is_vegetarian && !item.is_vegan && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                            <span>🥬</span>
                            <span>Vegetarisch</span>
                          </span>
                        )}
                        {/* Allergens - Only if enabled */}
                        {template.density.showAllergens && itemAllergens.length > 0 && (
                          <span className="text-xs text-gray-500">
                            Allergene: {itemAllergens.map((a) => a.name).join(', ')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
