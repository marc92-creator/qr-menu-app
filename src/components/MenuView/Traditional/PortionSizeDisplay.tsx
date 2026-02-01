'use client';

import { ThemeConfig } from '@/lib/themes';

interface PortionSizeDisplayProps {
  portionSize: string;
  theme: ThemeConfig;
}

export function PortionSizeDisplay({ portionSize, theme }: PortionSizeDisplayProps) {
  if (!portionSize) return null;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
      style={{
        backgroundColor: theme.styles.surfaceHover,
        color: theme.styles.textMuted,
      }}
    >
      <span>📏</span>
      {portionSize}
    </span>
  );
}
