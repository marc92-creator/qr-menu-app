'use client';

import { useState } from 'react';
import { MenuItem } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { PriceRangeSlider } from './PriceRangeSlider';
import { TimeBasedFilters } from './TimeBasedFilters';

export interface SmartFilters {
  priceRange: { min: number; max: number };
  dietary: Set<string>;
  mealTime: Set<string>;
  spiceLevel: { min: number; max: number };
  preparationTime: { max: number };
  calories: { max: number };
  tags: Set<string>;
  sortBy: 'price' | 'popularity' | 'name' | 'preparation-time' | 'calories';
}

interface SmartFilterBarProps {
  items: MenuItem[];
  filters: SmartFilters;
  onFiltersChange: (filters: SmartFilters) => void;
  theme: ThemeConfig;
  variant?: 'horizontal' | 'sidebar' | 'modal';
}

export function SmartFilterBar({
  items,
  filters,
  onFiltersChange,
  theme,
  variant = 'horizontal',
}: SmartFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate price range from items
  const prices = items.map(item => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Check if items have certain features
  const hasSpiceLevel = items.some(item => item.spice_level);
  const hasPreparationTime = items.some(item => item.preparation_time);
  const hasCalories = items.some(item => item.calories);

  const updateFilters = (updates: Partial<SmartFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const activeFilterCount = [
    filters.dietary.size,
    filters.mealTime.size,
    filters.tags.size,
    filters.spiceLevel.min > 0 || filters.spiceLevel.max < 5 ? 1 : 0,
    filters.preparationTime.max < 120 ? 1 : 0,
    filters.calories.max < 2000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isExpanded ? theme.styles.primary : theme.styles.surfaceHover,
          color: isExpanded ? '#fff' : theme.styles.text,
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>Filter{activeFilterCount > 0 && ` (${activeFilterCount})`}</span>
      </button>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl shadow-lg z-50 space-y-4"
          style={{
            backgroundColor: theme.styles.cardBg,
            border: `1px solid ${theme.styles.cardBorder}`,
            maxWidth: variant === 'sidebar' ? '100%' : '600px',
          }}
        >
          {/* Price Range */}
          <PriceRangeSlider
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange}
            onChange={(range) => updateFilters({ priceRange: range })}
            theme={theme}
          />

          {/* Time-based Filters */}
          <TimeBasedFilters
            selectedTimes={filters.mealTime}
            onChange={(times) => updateFilters({ mealTime: times })}
            theme={theme}
          />

          {/* Spice Level (if available) */}
          {hasSpiceLevel && (
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
                Schärfegrad
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      const newMax = filters.spiceLevel.max === level ? 5 : level;
                      updateFilters({ spiceLevel: { min: 0, max: newMax } });
                    }}
                    className="text-lg transition-all hover:scale-110"
                    style={{ opacity: level <= filters.spiceLevel.max ? 1 : 0.3 }}
                  >
                    🌶️
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Time (if available) */}
          {hasPreparationTime && (
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
                Zubereitungszeit
              </label>
              <div className="flex gap-2">
                {[
                  { label: 'Schnell (< 15 Min)', value: 15 },
                  { label: 'Normal (< 30 Min)', value: 30 },
                  { label: 'Alle', value: 120 },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilters({ preparationTime: { max: option.value } })}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: filters.preparationTime.max === option.value ? theme.styles.primary : theme.styles.surfaceHover,
                      color: filters.preparationTime.max === option.value ? '#fff' : theme.styles.text,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calories (if available) */}
          {hasCalories && (
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
                Kalorien
              </label>
              <div className="flex gap-2">
                {[
                  { label: 'Leicht (< 300)', value: 300 },
                  { label: 'Normal (< 600)', value: 600 },
                  { label: 'Alle', value: 2000 },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilters({ calories: { max: option.value } })}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: filters.calories.max === option.value ? theme.styles.primary : theme.styles.surfaceHover,
                      color: filters.calories.max === option.value ? '#fff' : theme.styles.text,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.styles.text }}>
              Sortierung
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as SmartFilters['sortBy'] })}
              className="w-full px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: theme.styles.cardBg,
                color: theme.styles.text,
                borderColor: theme.styles.border,
              }}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price">Preis (niedrig-hoch)</option>
              <option value="popularity">Beliebtheit</option>
              {hasPreparationTime && <option value="preparation-time">Zubereitungszeit</option>}
              {hasCalories && <option value="calories">Kalorien</option>}
            </select>
          </div>

          {/* Clear Filters Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                onFiltersChange({
                  priceRange: { min: minPrice, max: maxPrice },
                  dietary: new Set(),
                  mealTime: new Set(),
                  spiceLevel: { min: 0, max: 5 },
                  preparationTime: { max: 120 },
                  calories: { max: 2000 },
                  tags: new Set(),
                  sortBy: 'name',
                });
              }}
              className="w-full py-2 text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: theme.styles.surfaceHover,
                color: theme.styles.text,
              }}
            >
              Alle Filter zurücksetzen
            </button>
          )}
        </div>
      )}
    </div>
  );
}
