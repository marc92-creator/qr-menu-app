'use client';

import { ItemSize } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { formatPrice } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ItemSize;
  theme: ThemeConfig;
}

const SIZE_LABELS: Record<string, string> = {
  small: 'S',
  medium: 'M',
  large: 'L',
  xlarge: 'XL',
};

export function SizeSelector({ sizes, theme }: SizeSelectorProps) {
  const sizeEntries = Object.entries(sizes).filter(([, price]) => price !== undefined);

  if (sizeEntries.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {sizeEntries.map(([size, price]) => (
        <div
          key={size}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs"
          style={{
            backgroundColor: theme.styles.surfaceHover,
            color: theme.styles.text,
          }}
        >
          <span className="font-bold">{SIZE_LABELS[size] || size.toUpperCase()}</span>
          <span style={{ color: theme.styles.textMuted }}>|</span>
          <span className="font-medium">{formatPrice(price!)}</span>
        </div>
      ))}
    </div>
  );
}
