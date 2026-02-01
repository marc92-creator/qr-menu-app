'use client';

import { Restaurant } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface ChefMessageCardProps {
  restaurant: Restaurant;
  theme: ThemeConfig;
}

export function ChefMessageCard({ restaurant, theme }: ChefMessageCardProps) {
  const { chef_message, philosophy } = restaurant;

  if (!chef_message && !philosophy) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          backgroundColor: theme.styles.cardBg,
          border: `1px solid ${theme.styles.cardBorder}`,
        }}
      >
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
          <span className="text-2xl">👨‍🍳</span>
          <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
        </div>

        {chef_message && (
          <div className="mb-6">
            <h3
              className="text-2xl font-serif mb-4"
              style={{
                color: theme.styles.primary,
                fontFamily: '"Playfair Display", "Cormorant", serif',
              }}
            >
              Grußwort des Küchenchefs
            </h3>
            <p
              className="text-base leading-relaxed italic"
              style={{ color: theme.styles.text }}
            >
              {chef_message}
            </p>
          </div>
        )}

        {philosophy && (
          <div>
            <h3
              className="text-xl font-serif mb-4"
              style={{
                color: theme.styles.primary,
                fontFamily: '"Playfair Display", "Cormorant", serif',
              }}
            >
              Unsere Philosophie
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: theme.styles.textMuted }}
            >
              {philosophy}
            </p>
          </div>
        )}

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
          <span className="text-xs tracking-widest" style={{ color: theme.styles.textMuted }}>
            ✦
          </span>
          <div className="h-px flex-1 max-w-20" style={{ backgroundColor: theme.styles.border }} />
        </div>
      </div>
    </div>
  );
}
