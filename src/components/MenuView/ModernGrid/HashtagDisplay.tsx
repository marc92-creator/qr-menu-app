'use client';

import { ThemeConfig } from '@/lib/themes';

interface HashtagDisplayProps {
  hashtags: string[];
  theme: ThemeConfig;
}

export function HashtagDisplay({ hashtags, theme }: HashtagDisplayProps) {
  if (!hashtags || hashtags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {hashtags.map((tag, index) => (
        <span
          key={index}
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: theme.styles.primaryLight,
            color: theme.styles.primary,
          }}
        >
          {tag.startsWith('#') ? tag : `#${tag}`}
        </span>
      ))}
    </div>
  );
}
