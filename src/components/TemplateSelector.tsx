'use client';

import { useState } from 'react';
import { getAllTemplates } from '@/lib/templates';
import { haptics } from '@/lib/haptics';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onSelect: (templateId: string) => void;
  disabled?: boolean;
}

export function TemplateSelector({
  currentTemplateId,
  onSelect,
  disabled = false,
}: TemplateSelectorProps) {
  const templates = getAllTemplates();
  const [selectedId, setSelectedId] = useState(currentTemplateId);

  const handleSelect = (templateId: string) => {
    if (disabled) return;

    haptics.tap();
    setSelectedId(templateId);
    onSelect(templateId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Menü-Template
        </h3>
        <p className="text-sm text-gray-500">
          Wähle ein Template-Design für deine Speisekarte. Deine Gerichte bleiben gleich,
          nur die Darstellung ändert sich.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelect(template.id)}
              disabled={disabled}
              className={`
                relative p-6 rounded-2xl border-2 transition-all text-left
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg active:scale-98
                ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Template Info */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {template.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-lg">
                    {template.images.strategy === 'category-headers' ? '📁' : '🖼️'}
                  </span>
                  <span>
                    {template.images.strategy === 'category-headers'
                      ? 'Kategorie-Icons'
                      : 'Gericht-Bilder'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-lg">📊</span>
                  <span>
                    {template.density.level === 'minimal' ? 'Minimalistisch' : 'Standard Details'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-lg">🎯</span>
                  <span className="text-xs text-gray-500">
                    Empfohlen: {template.metadata.recommended.join(', ')}
                  </span>
                </div>
              </div>

              {/* Preview Hint */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {isSelected ? '✓ Aktuell aktiv' : 'Klicken zum Aktivieren'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Tipp</h4>
            <p className="text-sm text-blue-800">
              Das <strong>Minimalist</strong>-Template ist ideal für Cafés und Bars mit wenigen Gerichten.
              Das <strong>Traditional</strong>-Template eignet sich gut für Restaurants mit vielen Bildern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
