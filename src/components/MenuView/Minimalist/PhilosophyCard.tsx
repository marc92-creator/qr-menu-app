'use client';

import { Restaurant } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface PhilosophyCardProps {
  restaurant: Restaurant;
  theme: ThemeConfig;
}

export function PhilosophyCard({ restaurant, theme }: PhilosophyCardProps) {
  const { philosophy, minimalist_quote } = restaurant;

  if (!philosophy && !minimalist_quote) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div
        className="rounded-xl p-6 text-center"
        style={{
          backgroundColor: theme.styles.cardBg,
          border: `1px solid ${theme.styles.cardBorder}`,
        }}
      >
        {minimalist_quote && (
          <blockquote className="mb-4">
            <p
              className="text-lg italic font-light leading-relaxed"
              style={{ color: theme.styles.text }}
            >
              &ldquo;{minimalist_quote}&rdquo;
            </p>
          </blockquote>
        )}

        {philosophy && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: theme.styles.textMuted }}
          >
            {philosophy}
          </p>
        )}
      </div>
    </div>
  );
}
