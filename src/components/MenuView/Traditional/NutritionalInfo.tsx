'use client';

import { MenuItem } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface NutritionalInfoProps {
  item: MenuItem;
  theme: ThemeConfig;
}

export function NutritionalInfo({ item, theme }: NutritionalInfoProps) {
  const { calories, protein, carbs, fat } = item;

  if (!calories && !protein && !carbs && !fat) return null;

  return (
    <div
      className="mt-3 pt-3 border-t grid grid-cols-4 gap-2 text-center"
      style={{ borderColor: theme.styles.border }}
    >
      {calories && (
        <div>
          <div className="text-xs font-bold" style={{ color: theme.styles.text }}>
            {calories}
          </div>
          <div className="text-[10px]" style={{ color: theme.styles.textMuted }}>
            kcal
          </div>
        </div>
      )}
      {protein && (
        <div>
          <div className="text-xs font-bold" style={{ color: theme.styles.text }}>
            {protein}g
          </div>
          <div className="text-[10px]" style={{ color: theme.styles.textMuted }}>
            Protein
          </div>
        </div>
      )}
      {carbs && (
        <div>
          <div className="text-xs font-bold" style={{ color: theme.styles.text }}>
            {carbs}g
          </div>
          <div className="text-[10px]" style={{ color: theme.styles.textMuted }}>
            Kohlenhydrate
          </div>
        </div>
      )}
      {fat && (
        <div>
          <div className="text-xs font-bold" style={{ color: theme.styles.text }}>
            {fat}g
          </div>
          <div className="text-[10px]" style={{ color: theme.styles.textMuted }}>
            Fett
          </div>
        </div>
      )}
    </div>
  );
}
