'use client';

import { MenuSchedule } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { formatTimeRange } from '@/lib/schedules';

interface ScheduleIndicatorProps {
  schedule: MenuSchedule;
  theme: ThemeConfig;
}

// Get icon based on schedule name
function getScheduleIcon(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('frühstück') || nameLower.includes('breakfast')) return '🌅';
  if (nameLower.includes('mittag') || nameLower.includes('lunch')) return '☀️';
  if (nameLower.includes('nachmittag') || nameLower.includes('afternoon')) return '🌤️';
  if (nameLower.includes('abend') || nameLower.includes('dinner') || nameLower.includes('evening')) return '🌙';
  if (nameLower.includes('nacht') || nameLower.includes('night')) return '🌃';
  if (nameLower.includes('brunch')) return '🥐';
  if (nameLower.includes('happy hour')) return '🍹';
  return '🕐';
}

export function ScheduleIndicator({ schedule, theme }: ScheduleIndicatorProps) {
  const styles = theme.styles;
  const icon = getScheduleIcon(schedule.name);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
      style={{
        backgroundColor: styles.primaryLight,
        color: styles.primary,
      }}
    >
      <span>{icon}</span>
      <span className="font-medium">{schedule.name}</span>
      <span className="opacity-70">
        {formatTimeRange(schedule.startTime, schedule.endTime)}
      </span>
    </div>
  );
}
