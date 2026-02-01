'use client';

import { Category } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface QuickJumpProps {
  categories: Category[];
  onJump: (categoryId: string) => void;
  theme: ThemeConfig;
}

export function QuickJump({ categories, onJump, theme }: QuickJumpProps) {
  if (categories.length === 0) return null;

  return (
    <div className="sticky top-20 z-10 py-3 backdrop-blur-sm" style={{ backgroundColor: theme.styles.headerBg + 'E6' }}>
      <div className="flex items-center gap-2 px-4">
        <span className="text-xs font-medium flex-shrink-0" style={{ color: theme.styles.textMuted }}>
          Schnellzugriff:
        </span>
        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onJump(category.id)}
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: theme.styles.primary,
                color: '#fff',
              }}
              title={category.name}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
