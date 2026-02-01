'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { formatPrice } from '@/lib/utils';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (range: { min: number; max: number }) => void;
  theme: ThemeConfig;
}

export function PriceRangeSlider({ min, max, value, onChange, theme }: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleMinChange = (newMin: number) => {
    const updated = { min: Math.min(newMin, localValue.max), max: localValue.max };
    setLocalValue(updated);
    onChange(updated);
  };

  const handleMaxChange = (newMax: number) => {
    const updated = { min: localValue.min, max: Math.max(newMax, localValue.min) };
    setLocalValue(updated);
    onChange(updated);
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
        Preisspanne: {formatPrice(localValue.min)} - {formatPrice(localValue.max)}
      </label>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs flex-shrink-0" style={{ color: theme.styles.textMuted }}>
            {formatPrice(min)}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={localValue.min}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="flex-1"
            style={{
              accentColor: theme.styles.primary,
            }}
          />
          <span className="text-xs flex-shrink-0" style={{ color: theme.styles.textMuted }}>
            {formatPrice(max)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs flex-shrink-0" style={{ color: theme.styles.textMuted }}>
            {formatPrice(min)}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={localValue.max}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="flex-1"
            style={{
              accentColor: theme.styles.primary,
            }}
          />
          <span className="text-xs flex-shrink-0" style={{ color: theme.styles.textMuted }}>
            {formatPrice(max)}
          </span>
        </div>
      </div>
    </div>
  );
}
