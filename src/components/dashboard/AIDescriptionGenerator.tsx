'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AIDescriptionGeneratorProps {
  dishName: string;
  category?: string;
  language?: 'de' | 'en';
  onGenerate: (description: string) => void;
  disabled?: boolean;
}

export function AIDescriptionGenerator({
  dishName,
  category,
  language = 'de',
  onGenerate,
  disabled = false,
}: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!dishName.trim()) {
      setError('Bitte zuerst einen Namen eingeben');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const res = await fetch('/api/ai/describe-dish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName,
          category,
          language,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fehler bei der KI-Generierung');
      }

      const data = await res.json();
      if (data.description) {
        onGenerate(data.description);
        setError('');
      }
    } catch (err) {
      console.error('AI generation error:', err);
      setError(err instanceof Error ? err.message : 'Fehler bei der KI-Generierung');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          Beschreibung {language === 'en' ? '(English)' : ''} (optional)
        </label>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || disabled || !dishName.trim()}
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          title={!dishName.trim() ? 'Zuerst einen Namen eingeben' : 'Mit KI erstellen'}
        >
          <Sparkles size={16} className={isGenerating ? 'animate-spin' : ''} />
          {isGenerating ? 'Generiert...' : 'Mit KI erstellen'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
