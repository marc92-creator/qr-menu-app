'use client';

import { ThemeConfig } from '@/lib/themes';
import { Language, getTranslation } from '@/lib/translations';

interface PrepTimeBadgeProps {
  minutes: number;
  theme: ThemeConfig;
  language: Language;
}

export function PrepTimeBadge({ minutes, theme, language }: PrepTimeBadgeProps) {
  if (!minutes || minutes <= 0) return null;

  const t = getTranslation(language);
  const styles = theme.styles;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
      style={{
        backgroundColor: styles.surfaceHover,
        color: styles.textMuted,
      }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {minutes} {t.minutes}
    </span>
  );
}
