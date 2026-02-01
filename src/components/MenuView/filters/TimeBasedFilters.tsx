'use client';

import { ThemeConfig } from '@/lib/themes';

type MealTime = 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'snack';

interface TimeBasedFiltersProps {
  selectedTimes: Set<string>;
  onChange: (times: Set<string>) => void;
  theme: ThemeConfig;
}

const MEAL_TIMES: { id: MealTime; label: string; icon: string }[] = [
  { id: 'breakfast', label: 'Frühstück', icon: '🥐' },
  { id: 'brunch', label: 'Brunch', icon: '🍳' },
  { id: 'lunch', label: 'Mittagessen', icon: '🍽️' },
  { id: 'dinner', label: 'Abendessen', icon: '🌙' },
  { id: 'snack', label: 'Snack', icon: '🍿' },
];

// Get contextual suggestions based on time of day
const getContextualSuggestions = (): MealTime[] => {
  const hour = new Date().getHours();
  if (hour < 11) return ['breakfast', 'brunch'];
  if (hour < 15) return ['lunch'];
  if (hour < 18) return ['snack'];
  return ['dinner'];
};

export function TimeBasedFilters({ selectedTimes, onChange, theme }: TimeBasedFiltersProps) {
  const suggestions = getContextualSuggestions();

  const toggleTime = (timeId: string) => {
    const newTimes = new Set(selectedTimes);
    if (newTimes.has(timeId)) {
      newTimes.delete(timeId);
    } else {
      newTimes.add(timeId);
    }
    onChange(newTimes);
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
        Tageszeit
      </label>

      <div className="flex flex-wrap gap-2">
        {MEAL_TIMES.map((time) => {
          const isSelected = selectedTimes.has(time.id);
          const isSuggested = suggestions.includes(time.id);

          return (
            <button
              key={time.id}
              onClick={() => toggleTime(time.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all relative"
              style={{
                backgroundColor: isSelected ? theme.styles.primary : theme.styles.surfaceHover,
                color: isSelected ? '#fff' : theme.styles.text,
              }}
            >
              <span>{time.icon}</span>
              <span>{time.label}</span>

              {/* Suggested indicator */}
              {isSuggested && !isSelected && (
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.styles.primary }}
                  title="Empfohlen für aktuelle Tageszeit"
                />
              )}
            </button>
          );
        })}
      </div>

      {suggestions.length > 0 && selectedTimes.size === 0 && (
        <p className="text-xs mt-2" style={{ color: theme.styles.textMuted }}>
          💡 Passend zur aktuellen Tageszeit empfohlen
        </p>
      )}
    </div>
  );
}
