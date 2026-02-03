'use client';

import { Restaurant, Category, MenuItem } from '@/types/database';
import { getTheme, ThemeStyles } from '@/lib/themes';
import { formatPrice, getMenuUrl } from '@/lib/utils';
import { getAllergensByIds } from '@/lib/allergens';
import { getItemImageUrl } from '@/lib/foodImages';
import { QRCodeSVG } from 'qrcode.react';

// Category header images for fine dining / premium templates
// High-quality Unsplash photos mapped to common category keywords
const CATEGORY_HEADER_IMAGES: Record<string, string> = {
  // German category names
  'vorspeisen': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  'hauptgerichte': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  'hauptgericht': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  'desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  'dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  'nachspeisen': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  'getränke': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  'getranke': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  'weine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
  'wein': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
  'salate': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'salat': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'suppen': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  'suppe': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  'fisch': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
  'meeresfrüchte': 'https://images.unsplash.com/photo-1565680018093-ebb6b9abcf95?w=800&q=80',
  'fleisch': 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
  'steak': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  'pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
  'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  'frühstück': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  'brunch': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  'aperitif': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
  'cocktails': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  'beilagen': 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800&q=80',
  'vegetarisch': 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80',
  'vegan': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  // Default elegant food image
  'default': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
};

// Get category header image based on category name
function getCategoryHeaderImage(categoryName: string): string {
  const normalizedName = categoryName.toLowerCase().trim();

  // Check for exact match
  if (CATEGORY_HEADER_IMAGES[normalizedName]) {
    return CATEGORY_HEADER_IMAGES[normalizedName];
  }

  // Check for partial match
  for (const [keyword, imageUrl] of Object.entries(CATEGORY_HEADER_IMAGES)) {
    if (normalizedName.includes(keyword) || keyword.includes(normalizedName)) {
      return imageUrl;
    }
  }

  return CATEGORY_HEADER_IMAGES['default'];
}

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
  const menuUrl = getMenuUrl(restaurant.slug);
  const templateId = restaurant.template_id || 'traditional';
  const showImages = restaurant.auto_images && templateId !== 'minimalist' && templateId !== 'fine-dining';
  const isFineDining = templateId === 'fine-dining';
  const showCategoryImages = isFineDining; // Show elegant category header images for fine dining

  // Sort categories by position
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

  // Get items for a category
  const getItemsForCategory = (categoryId: string) => {
    return menuItems
      .filter((item) => item.category_id === categoryId && item.is_available !== false)
      .sort((a, b) => {
        if (a.is_special && !b.is_special) return -1;
        if (!a.is_special && b.is_special) return 1;
        return a.position - b.position;
      });
  };

  // Table Tent / QR Code View
  if (type === 'tent') {
    return (
      <div
        style={{
          width: format === 'a6' ? '105mm' : '210mm',
          height: format === 'a6' ? '148mm' : '297mm',
          backgroundColor: styles.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20mm',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: styles.surface,
            border: `3px solid ${styles.primary}`,
            borderRadius: '16px',
            padding: format === 'a6' ? '24px' : '40px',
            textAlign: 'center',
            width: '100%',
            maxWidth: format === 'a6' ? '70mm' : '140mm',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Restaurant Name */}
          <h1
            style={{
              fontSize: format === 'a6' ? '18px' : '28px',
              fontWeight: 'bold',
              color: styles.text,
              marginBottom: format === 'a6' ? '16px' : '24px',
              fontFamily: styles.fontHeading || 'Georgia, serif',
              lineHeight: 1.2,
            }}
          >
            {restaurant.name}
          </h1>

          {/* QR Code */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: format === 'a6' ? '16px' : '24px',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: format === 'a6' ? '12px' : '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <QRCodeSVG
                value={menuUrl}
                size={format === 'a6' ? 100 : 160}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Call to Action */}
          <p
            style={{
              fontSize: format === 'a6' ? '14px' : '20px',
              fontWeight: '600',
              color: styles.primary,
              marginBottom: '4px',
            }}
          >
            Speisekarte scannen
          </p>
          <p
            style={{
              fontSize: format === 'a6' ? '11px' : '14px',
              color: styles.textMuted,
            }}
          >
            Einfach mit dem Handy scannen
          </p>

          {/* URL */}
          <p
            style={{
              fontSize: format === 'a6' ? '8px' : '10px',
              color: styles.textMuted,
              marginTop: format === 'a6' ? '12px' : '20px',
              wordBreak: 'break-all',
            }}
          >
            {menuUrl}
          </p>
        </div>
      </div>
    );
  }

  // Menu PDF View
  return (
    <div
      style={{
        backgroundColor: styles.background,
        fontFamily: styles.fontFamily || 'system-ui, -apple-system, sans-serif',
        color: styles.text,
        padding: '0',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @page {
          margin: 0;
          size: A4;
        }

        html, body {
          background-color: ${styles.background} !important;
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .page-break {
          page-break-before: always;
        }

        .no-break {
          page-break-inside: avoid;
        }

        .category-section {
          page-break-inside: avoid;
        }

        .menu-item {
          page-break-inside: avoid;
        }
      `}</style>

      {/* Header - Ultra compact */}
      <header
        style={{
          background: styles.primary,
          padding: '8px 12px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {restaurant.logo_url && (
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '2px',
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                fontFamily: styles.fontHeading || 'Georgia, serif',
                lineHeight: 1.2,
              }}
            >
              {restaurant.name}
            </h1>
          </div>
        </div>
      </header>

      {/* Categories and Items */}
      <main style={{ padding: '0 16px' }}>
        {sortedCategories.map((category) => {
          const items = getItemsForCategory(category.id);
          if (items.length === 0) return null;

          const categoryImage = showCategoryImages ? getCategoryHeaderImage(category.name) : null;

          return (
            <section
              key={category.id}
              className="category-section"
              style={{
                marginBottom: '40px',
              }}
            >
              {/* Category Header - Fine Dining with Image */}
              {showCategoryImages && categoryImage ? (
                <div
                  style={{
                    marginBottom: '16px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '70px',
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={categoryImage}
                    alt={category.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.55)',
                    }}
                  />
                  {/* Overlay with Category Name */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'white',
                        margin: 0,
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {category.name}
                    </h2>
                  </div>
                </div>
              ) : (
                /* Standard Category Header */
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: `2px solid ${styles.primary}`,
                  }}
                >
                  <h2
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: styles.primary,
                      margin: 0,
                      fontFamily: styles.fontHeading || 'Georgia, serif',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {category.name}
                  </h2>
                </div>
              )}

              {/* Menu Items */}
              <div>
                {items.map((item, index) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    styles={styles}
                    isLast={index === items.length - 1}
                    showImage={showImages}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: '24px',
          padding: '16px',
          borderTop: `1px solid ${styles.border}`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: styles.textMuted,
            margin: 0,
          }}
        >
          Alle Preise in Euro inkl. MwSt. | Allergene und Zusatzstoffe erfragen Sie bitte bei unserem Personal.
        </p>
        <p
          style={{
            fontSize: '10px',
            color: styles.textMuted,
            marginTop: '8px',
            opacity: 0.7,
          }}
        >
          {menuUrl}
        </p>
      </footer>
    </div>
  );
}

// Professional Menu Item Row Component
function MenuItemRow({
  item,
  styles,
  isLast,
  showImage,
}: {
  item: MenuItem;
  styles: ThemeStyles;
  isLast: boolean;
  showImage: boolean;
}) {
  const allergens = item.allergens ? getAllergensByIds(item.allergens) : [];
  const allergenNames = allergens.map(a => a.name).join(', ');
  const imageUrl = showImage ? getItemImageUrl(item, true) : null;

  return (
    <div
      className="menu-item no-break"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '14px 0',
        borderBottom: isLast ? 'none' : `1px solid ${styles.border}`,
        gap: '16px',
      }}
    >
      {/* Food Image */}
      {imageUrl && (
        <div
          style={{
            flexShrink: 0,
            width: '60px',
            height: '60px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: styles.surface,
            border: `1px solid ${styles.border}`,
          }}
        >
          <img
            src={imageUrl}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Item Name and Badges */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: styles.text,
              margin: 0,
            }}
          >
            {item.item_number ? `${item.item_number}. ` : ''}{item.name}
          </h3>

          {/* Badges */}
          {item.is_special && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: '600',
                color: '#92400e',
                backgroundColor: '#fef3c7',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Empfehlung
            </span>
          )}
          {item.is_popular && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: '600',
                color: '#dc2626',
                backgroundColor: '#fee2e2',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Beliebt
            </span>
          )}
          {item.is_vegan && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: '600',
                color: '#15803d',
                backgroundColor: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase',
              }}
            >
              Vegan
            </span>
          )}
          {item.is_vegetarian && !item.is_vegan && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: '600',
                color: '#15803d',
                backgroundColor: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase',
              }}
            >
              Vegetarisch
            </span>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p
            style={{
              fontSize: '13px',
              color: styles.textMuted,
              margin: '6px 0 0 0',
              lineHeight: 1.4,
            }}
          >
            {item.description}
          </p>
        )}

        {/* Allergen codes - small and subtle */}
        {allergenNames && (
          <p
            style={{
              fontSize: '10px',
              color: styles.textMuted,
              margin: '4px 0 0 0',
              opacity: 0.7,
            }}
          >
            Allergene: {allergenNames}
          </p>
        )}
      </div>

      {/* Right side - Price */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexShrink: 0,
        }}
      >
        {/* Dotted line filler */}
        <div
          style={{
            borderBottom: `1px dotted ${styles.border}`,
            flex: 1,
            minWidth: '30px',
            marginRight: '12px',
            marginTop: '10px',
          }}
        />

        {/* Price */}
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: styles.priceColor,
            whiteSpace: 'nowrap',
          }}
        >
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
}
