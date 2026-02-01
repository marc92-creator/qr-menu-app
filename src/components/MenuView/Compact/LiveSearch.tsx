'use client';

import { useState } from 'react';
import { ThemeConfig } from '@/lib/themes';

interface LiveSearchProps {
  onSearch: (query: string) => void;
  theme: ThemeConfig;
  placeholder?: string;
}

export function LiveSearch({ onSearch, theme, placeholder = 'Suche nach Gerichten...' }: LiveSearchProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            borderColor: query ? theme.styles.primary : theme.styles.border,
            backgroundColor: theme.styles.cardBg,
            color: theme.styles.text,
          }}
        />

        {/* Search Icon */}
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: theme.styles.textMuted }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: theme.styles.textMuted }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Tips */}
      {query && (
        <div className="mt-2 text-xs" style={{ color: theme.styles.textMuted }}>
          <span>💡 Tipp: Nummer, Name oder Kategorie eingeben</span>
        </div>
      )}
    </div>
  );
}
