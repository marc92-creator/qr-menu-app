'use client';

import { useState } from 'react';
import { getAllTemplates, MenuTemplate } from '@/lib/templates';
import { haptics } from '@/lib/haptics';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onSelect: (templateId: string) => void;
  disabled?: boolean;
}

// Helper to get icon for image strategy
const getImageStrategyIcon = (template: MenuTemplate) => {
  switch (template.images.strategy) {
    case 'none':
      return '📝';
    case 'category-headers':
      return '📁';
    case 'item-thumbnails':
      return '🖼️';
    case 'item-hero':
      return '🎨';
    default:
      return '🖼️';
  }
};

const getImageStrategyLabel = (template: MenuTemplate) => {
  switch (template.images.strategy) {
    case 'none':
      return 'Keine Bilder';
    case 'category-headers':
      return 'Kategorie-Icons';
    case 'item-thumbnails':
      return 'Gericht-Bilder';
    case 'item-hero':
      return 'Große Hero-Bilder';
    default:
      return 'Bilder';
  }
};

const getLayoutIcon = (template: MenuTemplate) => {
  switch (template.layout.type) {
    case 'grid':
      return '⊞';
    case 'table':
      return '☰';
    case 'single-column':
    default:
      return '▭';
  }
};

const getLayoutLabel = (template: MenuTemplate) => {
  switch (template.layout.type) {
    case 'grid':
      return '2-Spalten Grid';
    case 'table':
      return 'Kompakte Tabelle';
    case 'single-column':
    default:
      return 'Einzelspalte';
  }
};

// Check if template is new (not traditional or minimalist)
const isNewTemplate = (templateId: string) => {
  return !['traditional', 'minimalist'].includes(templateId);
};

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          const isNew = isNewTemplate(template.id);

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelect(template.id)}
              disabled={disabled}
              className={`
                relative p-5 rounded-2xl border-2 transition-all text-left
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

              {/* New Badge */}
              {isNew && !isSelected && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-full">
                    NEU
                  </span>
                </div>
              )}

              {/* Template Info */}
              <div className="mb-3">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {template.name}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">
                    {getLayoutIcon(template)}
                  </span>
                  <span>{getLayoutLabel(template)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">
                    {getImageStrategyIcon(template)}
                  </span>
                  <span>{getImageStrategyLabel(template)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">📊</span>
                  <span>
                    {template.density.level === 'minimal' && 'Minimalistisch'}
                    {template.density.level === 'standard' && 'Standard'}
                    {template.density.level === 'detailed' && 'Detailliert'}
                    {template.density.level === 'verbose' && 'Ausführlich'}
                  </span>
                </div>
              </div>

              {/* Recommended for */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-start gap-1.5">
                  <span className="text-xs text-gray-500 flex-shrink-0">🎯</span>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    {template.metadata.recommended.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-2">
                <p className="text-[10px] text-gray-400">
                  {isSelected ? '✓ Aktuell aktiv' : 'Klicken zum Aktivieren'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Enhanced Info Box with all templates */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Template-Empfehlungen</h4>
            <div className="space-y-1.5 text-sm text-blue-800">
              <p><strong>Minimalist:</strong> Ideal für Cafés, Bars mit wenigen Gerichten</p>
              <p><strong>Traditional:</strong> Bewährt für Restaurants mit Bildern</p>
              <p><strong>Modern Grid:</strong> Perfekt für visuelle Menüs (Breakfast, Bakery)</p>
              <p><strong>Compact:</strong> Große Menüs mit vielen Gerichten (40+ Items)</p>
              <p><strong>Fine Dining:</strong> Elegante Darstellung für gehobene Gastronomie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
