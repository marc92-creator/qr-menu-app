'use client';

import { ThemeConfig } from '@/lib/themes';

interface SpiceLevelIndicatorProps {
  level: number;
  theme: ThemeConfig;
}

export function SpiceLevelIndicator({ level, theme }: SpiceLevelIndicatorProps) {
  if (!level || level === 0) return null;

  const peppers = Array.from({ length: 5 }, (_, i) => i < level);

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium mr-1" style={{ color: theme.styles.textMuted }}>
        Schärfe:
      </span>
      {peppers.map((active, index) => (
        <span
          key={index}
          className="text-sm"
          style={{ opacity: active ? 1 : 0.2 }}
        >
          🌶️
        </span>
      ))}
    </div>
  );
}
