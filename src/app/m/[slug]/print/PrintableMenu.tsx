'use client';

import { Restaurant, Category, MenuItem } from '@/types/database';
import { getTheme, ThemeStyles } from '@/lib/themes';
import { formatPrice, getMenuUrl } from '@/lib/utils';
import { getAllergensByIds } from '@/lib/allergens';
import { getItemImageUrl } from '@/lib/foodImages';
import { QRCodeSVG } from 'qrcode.react';

interface PrintableMenuProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  type: 'menu' | 'tent';
  format: 'a4' | 'a6';
}

export function PrintableMenu({
  restaurant,
  categories,
  menuItems,
  type,
  format,
}: PrintableMenuProps) {
  const theme = getTheme(restaurant.theme);
  const styles = theme.styles;
  const templateId = restaurant.template_id || 'traditional';
  const menuUrl = getMenuUrl(restaurant.slug);

  // QR Code size based on format
  const qrSize = format === 'a6' ? 150 : 200;

  // Sort categories by position
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

  // Get items for a category
  const getItemsForCategory = (categoryId: string) => {
    return menuItems
      .filter((item) => item.category_id === categoryId)
      .sort((a, b) => {
        if (a.is_special && !b.is_special) return -1;
        if (!a.is_special && b.is_special) return 1;
        return a.position - b.position;
      });
  };

  // Table Tent View
  if (type === 'tent') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ backgroundColor: styles.background }}
      >
        <div
          className="text-center p-12 rounded-2xl shadow-xl max-w-md w-full"
          style={{
            backgroundColor: styles.surface,
            border: `3px solid ${styles.primary}`,
          }}
        >
          {/* Restaurant Name */}
          <h1
            className="text-3xl font-bold mb-8"
            style={{ color: styles.text, fontFamily: styles.fontHeading }}
          >
            {restaurant.name}
          </h1>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <QRCodeSVG
                value={menuUrl}
                size={qrSize}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Call to Action */}
          <p
            className="text-xl font-semibold mb-2"
            style={{ color: styles.primary }}
          >
            Speisekarte scannen
          </p>
          <p className="text-sm" style={{ color: styles.textMuted }}>
            Einfach mit dem Handy scannen
          </p>

          {/* URL */}
          <p className="mt-6 text-xs" style={{ color: styles.textMuted }}>
            {menuUrl}
          </p>
        </div>
      </div>
    );
  }

  // Menu PDF View - Different layouts based on template
  return (
    <div
      className="min-h-screen print-container"
      style={{
        backgroundColor: styles.background,
        fontFamily: styles.fontFamily,
      }}
    >
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            padding: 0 !important;
          }
          .page-break {
            page-break-before: always;
          }
          .no-break {
            page-break-inside: avoid;
          }
        }

        /* Print-optimized styles */
        .print-container {
          padding: 20px;
        }
      `}</style>

      {/* Header */}
      <header
        className="py-8 px-6 mb-8 rounded-xl"
        style={{
          background: styles.headerBg,
          borderBottom: `2px solid ${styles.primary}`,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-4xl font-bold"
              style={{
                color: styles.text,
                fontFamily: styles.fontHeading,
              }}
            >
              {restaurant.name}
            </h1>
            {restaurant.address && (
              <p className="mt-2 text-lg" style={{ color: styles.textMuted }}>
                {restaurant.address}
              </p>
            )}
          </div>
          {restaurant.logo_url && (
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              className="w-20 h-20 object-contain rounded-lg"
            />
          )}
        </div>
      </header>

      {/* Categories and Items */}
      <main className="space-y-8">
        {sortedCategories.map((category) => {
          const items = getItemsForCategory(category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id} className="no-break">
              {/* Category Header */}
              <div
                className="py-4 px-6 mb-4 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${styles.primary}15, ${styles.primary}05)`,
                  borderLeft: `4px solid ${styles.primary}`,
                }}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: styles.primary,
                    fontFamily: styles.fontHeading,
                  }}
                >
                  {category.name}
                </h2>
              </div>

              {/* Items */}
              <div className="space-y-4 px-2">
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    styles={styles}
                    templateId={templateId}
                    autoImages={restaurant.auto_images}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer
        className="mt-12 py-6 text-center border-t"
        style={{ borderColor: styles.border }}
      >
        <p className="text-sm" style={{ color: styles.textMuted }}>
          Alle Preise in Euro inkl. MwSt.
        </p>
      </footer>
    </div>
  );
}

// Menu Item Card Component
function MenuItemCard({
  item,
  styles,
  templateId,
  autoImages,
}: {
  item: MenuItem;
  styles: ThemeStyles;
  templateId: string;
  autoImages: boolean;
}) {
  const imageUrl = getItemImageUrl(item, autoImages);
  const allergens = item.allergens ? getAllergensByIds(item.allergens) : [];

  return (
    <div
      className="flex gap-4 p-4 rounded-xl no-break"
      style={{
        backgroundColor: styles.surface,
        border: `1px solid ${styles.border}`,
      }}
    >
      {/* Image (if available and template supports it) */}
      {imageUrl && templateId !== 'minimalist' && templateId !== 'fine-dining' && (
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start gap-4">
          {/* Name and badges */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-lg font-semibold"
                style={{ color: styles.text }}
              >
                {item.name}
              </h3>

              {/* Badges */}
              {item.is_special && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: styles.badgeSpecialBg,
                    color: styles.badgeSpecialText,
                  }}
                >
                  Tagesempfehlung
                </span>
              )}
              {item.is_popular && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: styles.badgePopularBg,
                    color: styles.badgePopularText,
                  }}
                >
                  Beliebt
                </span>
              )}
              {item.is_vegan && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: styles.badgeVeganBg,
                    color: styles.badgeVeganText,
                  }}
                >
                  Vegan
                </span>
              )}
              {item.is_vegetarian && !item.is_vegan && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: styles.badgeVeganBg,
                    color: styles.badgeVeganText,
                  }}
                >
                  Vegetarisch
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <p
            className="text-lg font-bold whitespace-nowrap"
            style={{ color: styles.priceColor }}
          >
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Description */}
        {item.description && (
          <p
            className="mt-1 text-sm"
            style={{ color: styles.textMuted }}
          >
            {item.description}
          </p>
        )}

        {/* Allergens */}
        {allergens.length > 0 && (
          <p className="mt-2 text-xs" style={{ color: styles.textMuted }}>
            Allergene: {allergens.map((a) => a.name).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
