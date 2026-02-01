'use client';

import { ThemeConfig } from '@/lib/themes';

interface NumberBadgeProps {
  number: number;
  theme: ThemeConfig;
  large?: boolean;
}

export function NumberBadge({ number, theme, large = false }: NumberBadgeProps) {
  return (
    <div
      className={`flex-shrink-0 ${large ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'} rounded-lg flex items-center justify-center font-bold`}
      style={{
        backgroundColor: theme.styles.primaryLight,
        color: theme.styles.primary,
      }}
    >
      {number}
    </div>
  );
}
