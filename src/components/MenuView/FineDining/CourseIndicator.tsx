'use client';

import { CourseType } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

interface CourseIndicatorProps {
  courseType: CourseType;
  theme: ThemeConfig;
}

const COURSE_LABELS: Record<CourseType, string> = {
  'amuse': 'Amuse-Bouche',
  'starter': 'Vorspeise',
  'main': 'Hauptgang',
  'dessert': 'Dessert',
  'cheese': 'Käse',
};

export function CourseIndicator({ courseType, theme }: CourseIndicatorProps) {
  return (
    <div className="text-center mb-2">
      <span
        className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
        style={{
          backgroundColor: theme.styles.primaryLight,
          color: theme.styles.primary,
        }}
      >
        {COURSE_LABELS[courseType]}
      </span>
    </div>
  );
}
