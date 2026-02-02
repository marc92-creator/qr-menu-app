import { MenuSchedule, Category } from '@/types/database';

/**
 * Parse time string "HH:MM" to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Get current time in minutes since midnight
 */
function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Get current day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
 */
function getCurrentDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Check if current time is within a schedule's time range
 * Handles overnight schedules (e.g., 22:00 - 02:00)
 */
function isTimeInRange(startTime: string, endTime: string, currentMinutes: number): boolean {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  // Handle overnight schedule (e.g., 22:00 - 02:00)
  if (end < start) {
    return currentMinutes >= start || currentMinutes < end;
  }

  // Normal schedule (e.g., 09:00 - 17:00)
  return currentMinutes >= start && currentMinutes < end;
}

/**
 * Find the active schedule based on current time and day
 */
export function getActiveSchedule(schedules: MenuSchedule[] | null | undefined): MenuSchedule | null {
  if (!schedules || schedules.length === 0) {
    return null;
  }

  const currentMinutes = getCurrentTimeMinutes();
  const currentDay = getCurrentDayOfWeek();

  // Find first active schedule that matches current time and day
  for (const schedule of schedules) {
    if (!schedule.isActive) continue;
    if (!schedule.daysOfWeek.includes(currentDay)) continue;
    if (!isTimeInRange(schedule.startTime, schedule.endTime, currentMinutes)) continue;

    return schedule;
  }

  return null;
}

/**
 * Filter categories based on active schedule
 * If no schedule is active or no schedules exist, return all categories
 */
export function filterCategoriesBySchedule(
  categories: Category[],
  schedules: MenuSchedule[] | null | undefined
): { filteredCategories: Category[]; activeSchedule: MenuSchedule | null } {
  const activeSchedule = getActiveSchedule(schedules);

  if (!activeSchedule) {
    // No active schedule - show all categories
    return {
      filteredCategories: categories,
      activeSchedule: null,
    };
  }

  // Filter to only show categories in the active schedule
  const filteredCategories = categories.filter(cat =>
    activeSchedule.categoryIds.includes(cat.id)
  );

  return {
    filteredCategories,
    activeSchedule,
  };
}

/**
 * Format time range for display
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}

/**
 * Get next schedule change time (for countdown/refresh)
 */
export function getNextScheduleChangeTime(schedules: MenuSchedule[] | null | undefined): Date | null {
  if (!schedules || schedules.length === 0) {
    return null;
  }

  const now = new Date();
  const currentMinutes = getCurrentTimeMinutes();
  const currentDay = getCurrentDayOfWeek();

  // Find the next schedule transition
  let nextChangeMinutes: number | null = null;

  for (const schedule of schedules) {
    if (!schedule.isActive) continue;
    if (!schedule.daysOfWeek.includes(currentDay)) continue;

    const startMinutes = timeToMinutes(schedule.startTime);
    const endMinutes = timeToMinutes(schedule.endTime);

    // Check if start time is upcoming today
    if (startMinutes > currentMinutes) {
      if (nextChangeMinutes === null || startMinutes < nextChangeMinutes) {
        nextChangeMinutes = startMinutes;
      }
    }

    // Check if end time is upcoming today (for non-overnight schedules)
    if (endMinutes > startMinutes && endMinutes > currentMinutes) {
      if (nextChangeMinutes === null || endMinutes < nextChangeMinutes) {
        nextChangeMinutes = endMinutes;
      }
    }
  }

  if (nextChangeMinutes === null) {
    return null;
  }

  // Convert back to Date
  const result = new Date(now);
  result.setHours(Math.floor(nextChangeMinutes / 60), nextChangeMinutes % 60, 0, 0);
  return result;
}
