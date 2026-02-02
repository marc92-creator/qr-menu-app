'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ThemeConfig } from '@/lib/themes';
import { Language } from '@/lib/translations';

interface UniversalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  theme: ThemeConfig;
  language: Language;
  variant?: 'inline' | 'floating';
  placeholder?: string;
  debounceMs?: number;
}

export function UniversalSearchBar({
  value,
  onChange,
  theme,
  language,
  variant = 'inline',
  placeholder,
  debounceMs = 300,
}: UniversalSearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isExpanded, setIsExpanded] = useState(variant === 'inline' || value.length > 0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const styles = theme.styles;
  const defaultPlaceholder = placeholder || (language === 'de' ? 'Gerichte suchen...' : 'Search dishes...');

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  }, [onChange, debounceMs]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  const handleToggle = () => {
    if (variant === 'floating') {
      if (isExpanded && localValue.length === 0) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
        // Focus input after animation
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  };

  // Floating variant - collapsed state
  if (variant === 'floating' && !isExpanded) {
    return (
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-200 touch-manipulation active:scale-95"
        style={{
          backgroundColor: styles.cardBg,
          color: styles.textMuted,
          border: `1px solid ${styles.border}`,
        }}
        aria-label={language === 'de' ? 'Suche öffnen' : 'Open search'}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={`relative transition-all duration-200 ${
        variant === 'floating' ? 'shadow-lg rounded-xl' : ''
      }`}
    >
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div
          className="absolute left-3 pointer-events-none transition-colors"
          style={{ color: isFocused ? styles.primary : styles.textMuted }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={defaultPlaceholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 focus:outline-none transition-all text-base"
          style={{
            borderColor: isFocused ? styles.primary : styles.border,
            backgroundColor: styles.cardBg,
            color: styles.text,
          }}
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Clear / Close Button */}
        {localValue ? (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full hover:bg-black/5 transition-colors touch-manipulation"
            style={{ color: styles.textMuted }}
            aria-label={language === 'de' ? 'Suche leeren' : 'Clear search'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : variant === 'floating' ? (
          <button
            onClick={handleToggle}
            className="absolute right-3 p-1 rounded-full hover:bg-black/5 transition-colors touch-manipulation"
            style={{ color: styles.textMuted }}
            aria-label={language === 'de' ? 'Suche schließen' : 'Close search'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      {/* Search Tip */}
      {isFocused && localValue.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 px-3 py-2 rounded-lg text-xs"
          style={{
            backgroundColor: styles.surface,
            color: styles.textMuted,
            border: `1px solid ${styles.border}`,
          }}
        >
          {language === 'de'
            ? 'Tipp: Suche nach Name, Beschreibung oder Nummer'
            : 'Tip: Search by name, description, or number'}
        </div>
      )}
    </div>
  );
}
