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
      lowerName.includes('entrée') || lowerName.includes('amuse') ||
      lowerName.includes('salat') || lowerName.includes('salad')) {
    return 'appetizer';
  }

  if (lowerName.includes('hauptger') || lowerName.includes('main') ||
      lowerName.includes('haupt') || lowerName.includes('entrées') ||
      lowerName.includes('plat') || lowerName.includes('fleisch') ||
      lowerName.includes('fisch') || lowerName.includes('meat') ||
      lowerName.includes('fish') || lowerName.includes('poultry') ||
      lowerName.includes('geflügel') || lowerName.includes('pasta') ||
      lowerName.includes('pizza') || lowerName.includes('grill')) {
    return 'main';
  }

  if (lowerName.includes('dessert') || lowerName.includes('nachspeise') ||
      lowerName.includes('süß') || lowerName.includes('sweet') ||
      lowerName.includes('kuchen') || lowerName.includes('eis') ||
      lowerName.includes('cake') || lowerName.includes('ice') ||
      lowerName.includes('dolci') || lowerName.includes('patisserie')) {
    return 'dessert';
  }

  if (lowerName.includes('getränk') || lowerName.includes('drink') ||
      lowerName.includes('wein') || lowerName.includes('wine') ||
      lowerName.includes('cocktail') || lowerName.includes('bier') ||
      lowerName.includes('beer') || lowerName.includes('beverage') ||
      lowerName.includes('coffee') || lowerName.includes('kaffee') ||
      lowerName.includes('digestif') || lowerName.includes('aperitif') ||
      lowerName.includes('tee') || lowerName.includes('tea') ||
      lowerName.includes('softdrink') || lowerName.includes('saft')) {
    return 'drinks';
  }

  return 'default';
};

// Elegant SVG Ornaments for Fine Dining - More visible and refined
function AppetizerOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 40" className="w-48 h-10 mx-auto" aria-hidden="true">
      {/* Left flourish */}
      <path
        d="M20,20 C35,10 45,25 60,20 C75,15 80,25 95,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right flourish (mirrored) */}
      <path
        d="M145,20 C160,25 165,15 180,20 C195,25 205,10 220,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center decorative leaf cluster */}
      <ellipse cx="120" cy="20" rx="12" ry="6" fill={color} opacity="0.25" />
      <ellipse cx="108" cy="18" rx="8" ry="4" fill={color} opacity="0.2" transform="rotate(-20 108 18)" />
      <ellipse cx="132" cy="18" rx="8" ry="4" fill={color} opacity="0.2" transform="rotate(20 132 18)" />
      <circle cx="120" cy="20" r="4" fill={color} />
      {/* Small accent dots */}
      <circle cx="15" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="225" cy="20" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function MainCourseOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 40" className="w-48 h-10 mx-auto" aria-hidden="true">
      {/* Left decorative line */}
      <path
        d="M15,20 L85,20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right decorative line */}
      <path
        d="M155,20 L225,20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Center cloche/dome icon */}
      <path
        d="M95,26 Q120,2 145,26"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="92" y1="26" x2="148" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Plate base */}
      <ellipse cx="120" cy="30" rx="22" ry="4" fill={color} opacity="0.2" />
      {/* Handle on cloche */}
      <circle cx="120" cy="8" r="3" fill={color} />
      {/* End flourishes */}
      <circle cx="10" cy="20" r="2.5" fill={color} opacity="0.7" />
      <circle cx="230" cy="20" r="2.5" fill={color} opacity="0.7" />
    </svg>
  );
}

function DessertOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 40" className="w-48 h-10 mx-auto" aria-hidden="true">
      {/* Elegant swirl left */}
      <path
        d="M15,20 C30,8 40,32 60,20 C80,8 90,25 100,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Elegant swirl right */}
      <path
        d="M140,20 C150,25 160,8 180,20 C200,32 210,8 225,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center dessert icon (simplified macaron/pastry) */}
      <ellipse cx="120" cy="16" rx="10" ry="6" fill={color} opacity="0.3" />
      <ellipse cx="120" cy="24" rx="10" ry="6" fill={color} opacity="0.3" />
      <ellipse cx="120" cy="20" rx="8" ry="3" fill={color} opacity="0.5" />
      <circle cx="120" cy="20" r="3" fill={color} />
      {/* Decorative stars */}
      <path d="M25,15 l1.5,3 3.5,0 -2.5,2 1,3.5 -3.5,-2 -3.5,2 1,-3.5 -2.5,-2 3.5,0 z" fill={color} opacity="0.5" />
      <path d="M215,15 l1.5,3 3.5,0 -2.5,2 1,3.5 -3.5,-2 -3.5,2 1,-3.5 -2.5,-2 3.5,0 z" fill={color} opacity="0.5" />
    </svg>
  );
}

function DrinksOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 40" className="w-48 h-10 mx-auto" aria-hidden="true">
      {/* Left line */}
      <path
        d="M15,20 L80,20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right line */}
      <path
        d="M160,20 L225,20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Elegant wine glass */}
      <path
        d="M110,32 L110,25 Q110,15 120,8 Q130,15 130,25 L130,32"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wine glass base */}
      <line x1="108" y1="32" x2="132" y2="32" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="120" y1="32" x2="120" y2="36" stroke={color} strokeWidth="1.5" />
      <line x1="112" y1="36" x2="128" y2="36" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Wine fill */}
      <path
        d="M113,22 Q113,17 120,12 Q127,17 127,22"
        fill={color}
        opacity="0.25"
      />
      {/* Decorative grapes/dots */}
      <circle cx="90" cy="18" r="2.5" fill={color} opacity="0.5" />
      <circle cx="86" cy="22" r="2" fill={color} opacity="0.4" />
      <circle cx="94" cy="22" r="2" fill={color} opacity="0.4" />
      <circle cx="150" cy="18" r="2.5" fill={color} opacity="0.5" />
      <circle cx="146" cy="22" r="2" fill={color} opacity="0.4" />
      <circle cx="154" cy="22" r="2" fill={color} opacity="0.4" />
      {/* End dots */}
      <circle cx="10" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="230" cy="20" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DefaultOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 40" className="w-48 h-10 mx-auto" aria-hidden="true">
      {/* Elegant symmetric flourish */}
      <path
        d="M15,20 C40,10 60,30 90,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M150,20 C180,30 200,10 225,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center diamond with decorative elements */}
      <path
        d="M115,20 L120,12 L125,20 L120,28 Z"
        fill={color}
        opacity="0.3"
      />
      <path
        d="M117,20 L120,15 L123,20 L120,25 Z"
        fill={color}
      />
      {/* Side diamonds */}
      <path d="M95,20 L98,17 L101,20 L98,23 Z" fill={color} opacity="0.5" />
      <path d="M139,20 L142,17 L145,20 L142,23 Z" fill={color} opacity="0.5" />
      {/* End dots */}
      <circle cx="10" cy="20" r="2.5" fill={color} opacity="0.7" />
      <circle cx="230" cy="20" r="2.5" fill={color} opacity="0.7" />
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
    <div className="text-center mb-12">
      {/* Top decorative ornament */}
      <div className="mb-5">
        {renderOrnament()}
      </div>

      {/* Category name - elegant serif typography */}
      <h2
        className="text-3xl md:text-4xl tracking-wide"
        style={{
          color: primaryColor,
          fontFamily: '"Playfair Display", "Cormorant Garamond", "Cinzel", Georgia, serif',
          letterSpacing: '0.08em',
          fontWeight: 500,
        }}
      >
        {categoryName}
      </h2>

      {/* Bottom decorative ornament (mirrored) */}
      <div className="mt-5 transform rotate-180">
        {renderOrnament()}
      </div>
    </div>
  );
}
