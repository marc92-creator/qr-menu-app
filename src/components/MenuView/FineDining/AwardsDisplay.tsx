'use client';

import { Restaurant } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface AwardsDisplayProps {
  restaurant: Restaurant;
  theme: ThemeConfig;
}

const AWARD_ICONS: Record<string, string> = {
  'michelin': '⭐',
  'gault millau': '🎩',
  'guide': '📖',
  'bib gourmand': '🍴',
  'stern': '⭐',
  'hauben': '🎩',
  'default': '🏆',
};

const getAwardIcon = (award: string): string => {
  const lowerAward = award.toLowerCase();
  for (const [key, icon] of Object.entries(AWARD_ICONS)) {
    if (lowerAward.includes(key)) return icon;
  }
  return AWARD_ICONS.default;
};

export function AwardsDisplay({ restaurant, theme }: AwardsDisplayProps) {
  const { awards } = restaurant;

  if (!awards || awards.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="text-center">
        <h3
          className="text-lg font-serif mb-6 tracking-wide"
          style={{
            color: theme.styles.textMuted,
            fontFamily: '"Playfair Display", "Cormorant", serif',
          }}
        >
          Auszeichnungen
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{getAwardIcon(award)}</span>
              <span
                className="text-xs tracking-wide"
                style={{ color: theme.styles.textMuted }}
              >
                {award}
              </span>
            </div>
          ))}
        </div>

        {restaurant.dresscode && (
          <div className="mt-8 pt-6 border-t" style={{ borderColor: theme.styles.border }}>
            <p className="text-xs tracking-wide" style={{ color: theme.styles.textMuted }}>
              Dresscode: {restaurant.dresscode}
            </p>
          </div>
        )}

        {restaurant.reservation_required && (
          <div className="mt-4">
            <p className="text-xs tracking-wide" style={{ color: theme.styles.textMuted }}>
              ⚠️ Reservierung erforderlich
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
