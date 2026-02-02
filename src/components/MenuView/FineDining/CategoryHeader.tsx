'use client';

import { ThemeConfig } from '@/lib/themes';

interface CategoryHeaderProps {
  categoryName: string;
  theme: ThemeConfig;
}

// Category-specific ornament mappings
const getCategoryOrnament = (categoryName: string): 'appetizer' | 'main' | 'dessert' | 'drinks' | 'default' => {
  const lowerName = categoryName.toLowerCase();

  // German and English keywords
  if (lowerName.includes('vorspeis') || lowerName.includes('starter') ||
      lowerName.includes('appetizer') || lowerName.includes('antipast') ||
      lowerName.includes('entrée') || lowerName.includes('amuse')) {
    return 'appetizer';
  }

  if (lowerName.includes('hauptger') || lowerName.includes('main') ||
      lowerName.includes('haupt') || lowerName.includes('entrées') ||
      lowerName.includes('plat') || lowerName.includes('fleisch') ||
      lowerName.includes('fisch') || lowerName.includes('meat') ||
      lowerName.includes('fish') || lowerName.includes('poultry') ||
      lowerName.includes('geflügel')) {
    return 'main';
  }

  if (lowerName.includes('dessert') || lowerName.includes('nachspeise') ||
      lowerName.includes('süß') || lowerName.includes('sweet') ||
      lowerName.includes('kuchen') || lowerName.includes('eis') ||
      lowerName.includes('cake') || lowerName.includes('ice')) {
    return 'dessert';
  }

  if (lowerName.includes('getränk') || lowerName.includes('drink') ||
      lowerName.includes('wein') || lowerName.includes('wine') ||
      lowerName.includes('cocktail') || lowerName.includes('bier') ||
      lowerName.includes('beer') || lowerName.includes('beverage') ||
      lowerName.includes('coffee') || lowerName.includes('kaffee') ||
      lowerName.includes('digestif') || lowerName.includes('aperitif')) {
    return 'drinks';
  }

  return 'default';
};

// SVG Ornaments for different categories
function AppetizerOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 30" className="w-40 h-8 mx-auto" aria-hidden="true">
      {/* Elegant leaf/branch pattern for appetizers */}
      <path
        d="M30,15 Q50,5 70,15 T110,15 T150,15 T190,15"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M10,15 Q30,25 50,15 T90,15 T130,15 T170,15"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Center leaf */}
      <ellipse cx="100" cy="15" rx="8" ry="4" fill={color} opacity="0.4" />
      <circle cx="100" cy="15" r="3" fill={color} />
    </svg>
  );
}

function MainCourseOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 30" className="w-40 h-8 mx-auto" aria-hidden="true">
      {/* Elegant plate silhouette */}
      <path
        d="M40,15 Q60,8 80,12 L90,12"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M110,12 L120,12 Q140,8 160,15"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Center dome/cloche */}
      <path
        d="M90,14 Q100,4 110,14"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="90" y1="14" x2="110" y2="14" stroke={color} strokeWidth="1.5" />
      {/* Decorative dots */}
      <circle cx="30" cy="15" r="2" fill={color} opacity="0.5" />
      <circle cx="170" cy="15" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DessertOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 30" className="w-40 h-8 mx-auto" aria-hidden="true">
      {/* Flourish pattern for desserts */}
      <path
        d="M20,15 C40,5 50,25 70,15 S90,5 100,15"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M100,15 C110,25 120,5 140,15 S160,25 180,15"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      {/* Center sweet icon (simplified macaron) */}
      <circle cx="100" cy="12" r="5" fill={color} opacity="0.3" />
      <circle cx="100" cy="18" r="5" fill={color} opacity="0.3" />
      <circle cx="100" cy="15" r="3" fill={color} />
    </svg>
  );
}

function DrinksOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 30" className="w-40 h-8 mx-auto" aria-hidden="true">
      {/* Elegant wine glass silhouette */}
      <path
        d="M30,15 L90,15"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M110,15 L170,15"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Wine glass */}
      <path
        d="M95,22 L95,18 Q95,10 100,6 Q105,10 105,18 L105,22"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <line x1="95" y1="22" x2="105" y2="22" stroke={color} strokeWidth="1.2" />
      <line x1="100" y1="22" x2="100" y2="26" stroke={color} strokeWidth="1" />
      <line x1="96" y1="26" x2="104" y2="26" stroke={color} strokeWidth="1" />
      {/* Side dots */}
      <circle cx="20" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="180" cy="15" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DefaultOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 20" className="w-32 h-5 mx-auto" aria-hidden="true">
      {/* Classic elegant line with center diamond */}
      <path
        d="M0,10 Q50,0 100,10 T200,10"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Center diamond */}
      <path
        d="M97,10 L100,6 L103,10 L100,14 Z"
        fill={color}
      />
    </svg>
  );
}

export function CategoryHeader({ categoryName, theme }: CategoryHeaderProps) {
  const styles = theme.styles;
  const ornamentType = getCategoryOrnament(categoryName);
  const primaryColor = styles.primary.includes('gradient')
    ? styles.primary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#d4af37'
    : styles.primary;

  const renderOrnament = () => {
    switch (ornamentType) {
      case 'appetizer':
        return <AppetizerOrnament color={primaryColor} />;
      case 'main':
        return <MainCourseOrnament color={primaryColor} />;
      case 'dessert':
        return <DessertOrnament color={primaryColor} />;
      case 'drinks':
        return <DrinksOrnament color={primaryColor} />;
      default:
        return <DefaultOrnament color={primaryColor} />;
    }
  };

  return (
    <div className="text-center mb-10">
      {/* Top decorative ornament */}
      <div className="mb-4">
        {renderOrnament()}
      </div>

      {/* Category name - elegant serif typography */}
      <h2
        className="text-3xl font-serif tracking-wide"
        style={{
          color: styles.primary,
          fontFamily: '"Playfair Display", "Cormorant Garamond", "Cinzel", Georgia, serif',
          letterSpacing: '0.05em',
        }}
      >
        {categoryName}
      </h2>

      {/* Bottom decorative ornament (mirrored) */}
      <div className="mt-4 transform rotate-180">
        {renderOrnament()}
      </div>
    </div>
  );
}
