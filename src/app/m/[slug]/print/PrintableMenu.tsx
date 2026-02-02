'use client';

import { Restaurant, Category, MenuItem } from '@/types/database';
import { getTheme, ThemeStyles } from '@/lib/themes';
import { formatPrice, getMenuUrl } from '@/lib/utils';
import { getAllergensByIds } from '@/lib/allergens';
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
  const menuUrl = getMenuUrl(restaurant.slug);

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
          margin: 15mm;
          size: A4;
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

      {/* Header */}
      <header
        style={{
          background: `linear-gradient(135deg, ${styles.primary}, ${styles.primaryLight || styles.primary})`,
          padding: '32px 40px',
          marginBottom: '32px',
          borderRadius: '0 0 20px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                fontFamily: styles.fontHeading || 'Georgia, serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {restaurant.name}
            </h1>
            {restaurant.address && (
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.9)',
                  marginTop: '8px',
                  margin: '8px 0 0 0',
                }}
              >
                {restaurant.address}
              </p>
            )}
          </div>
          {restaurant.logo_url && (
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'contain',
                borderRadius: '12px',
                backgroundColor: 'white',
                padding: '8px',
              }}
            />
          )}
        </div>
      </header>

      {/* Categories and Items */}
      <main style={{ padding: '0 24px' }}>
        {sortedCategories.map((category) => {
          const items = getItemsForCategory(category.id);
          if (items.length === 0) return null;

          return (
            <section
              key={category.id}
              className="category-section"
              style={{
                marginBottom: '32px',
              }}
            >
              {/* Category Header */}
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

              {/* Menu Items */}
              <div>
                {items.map((item, index) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    styles={styles}
                    isLast={index === items.length - 1}
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
          marginTop: '40px',
          padding: '24px 40px',
          borderTop: `2px solid ${styles.border}`,
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
}: {
  item: MenuItem;
  styles: ThemeStyles;
  isLast: boolean;
}) {
  const allergens = item.allergens ? getAllergensByIds(item.allergens) : [];
  const allergenNames = allergens.map(a => a.name).join(', ');

  return (
    <div
      className="menu-item no-break"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '14px 0',
        borderBottom: isLast ? 'none' : `1px solid ${styles.border}`,
      }}
    >
      {/* Left side - Name, Description, Badges */}
      <div style={{ flex: 1, paddingRight: '20px' }}>
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
