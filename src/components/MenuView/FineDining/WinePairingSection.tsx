'use client';

import { ThemeConfig } from '@/lib/themes';

interface WinePairingSectionProps {
  winePairings: string[];
  theme: ThemeConfig;
}

export function WinePairingSection({ winePairings, theme }: WinePairingSectionProps) {
  if (!winePairings || winePairings.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.styles.border }}>
      <div className="flex items-start gap-2 text-center justify-center">
        <span className="text-lg">🍷</span>
        <div>
          <p
            className="text-xs font-semibold tracking-wide mb-1"
            style={{ color: theme.styles.primary }}
          >
            Weinempfehlung
          </p>
          <div className="space-y-1">
            {winePairings.map((wine, index) => (
              <p
                key={index}
                className="text-xs italic"
                style={{ color: theme.styles.textMuted }}
              >
                {wine}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
