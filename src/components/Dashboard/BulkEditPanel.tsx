'use client';

import { useState } from 'react';
import { MenuItem, Category } from '@/types/database';
import { Button } from '@/components/Button';
import { ALLERGENS } from '@/lib/allergens';

interface BulkEditPanelProps {
  selectedItems: MenuItem[];
  categories: Category[];
  onClose: () => void;
  onPriceChange: (mode: 'percent' | 'absolute', value: number) => void;
  onToggleFlag: (flag: 'is_sold_out' | 'is_vegetarian' | 'is_vegan' | 'is_special' | 'is_popular', value: boolean) => void;
  onAddAllergens: (allergenIds: string[]) => void;
  onRemoveAllergens: (allergenIds: string[]) => void;
  onMoveToCategory: (categoryId: string) => void;
  onDelete: () => void;
}

type EditMode = 'main' | 'price' | 'flags' | 'allergens' | 'category' | 'delete';

export function BulkEditPanel({
  selectedItems,
  categories,
  onClose,
  onPriceChange,
  onToggleFlag,
  onAddAllergens,
  onRemoveAllergens,
  onMoveToCategory,
  onDelete,
}: BulkEditPanelProps) {
  const [editMode, setEditMode] = useState<EditMode>('main');
  const [priceMode, setPriceMode] = useState<'percent' | 'absolute'>('percent');
  const [priceValue, setPriceValue] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<Set<string>>(new Set());
  const [allergenAction, setAllergenAction] = useState<'add' | 'remove'>('add');
  const [selectedCategory, setSelectedCategory] = useState('');

  const count = selectedItems.length;

  const handlePriceSubmit = () => {
    const value = parseFloat(priceValue);
    if (!isNaN(value) && value !== 0) {
      onPriceChange(priceMode, value);
      setPriceValue('');
      setEditMode('main');
    }
  };

  const handleAllergenSubmit = () => {
    const allergenIds = Array.from(selectedAllergens);
    if (allergenIds.length > 0) {
      if (allergenAction === 'add') {
        onAddAllergens(allergenIds);
      } else {
        onRemoveAllergens(allergenIds);
      }
      setSelectedAllergens(new Set());
      setEditMode('main');
    }
  };

  const handleCategorySubmit = () => {
    if (selectedCategory) {
      onMoveToCategory(selectedCategory);
      setSelectedCategory('');
      setEditMode('main');
    }
  };

  const renderMainMenu = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <button
        onClick={() => setEditMode('price')}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all touch-manipulation"
      >
        <span className="text-2xl">💰</span>
        <span className="text-sm font-medium text-gray-700">Preis anpassen</span>
      </button>

      <button
        onClick={() => setEditMode('flags')}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all touch-manipulation"
      >
        <span className="text-2xl">🏷️</span>
        <span className="text-sm font-medium text-gray-700">Status ändern</span>
      </button>

      <button
        onClick={() => setEditMode('allergens')}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all touch-manipulation"
      >
        <span className="text-2xl">⚠️</span>
        <span className="text-sm font-medium text-gray-700">Allergene</span>
      </button>

      <button
        onClick={() => setEditMode('category')}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all touch-manipulation"
      >
        <span className="text-2xl">📂</span>
        <span className="text-sm font-medium text-gray-700">Verschieben</span>
      </button>

      <button
        onClick={() => setEditMode('delete')}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-red-200 hover:border-red-300 hover:bg-red-50 transition-all touch-manipulation col-span-2 sm:col-span-1"
      >
        <span className="text-2xl">🗑️</span>
        <span className="text-sm font-medium text-red-600">Löschen</span>
      </button>
    </div>
  );

  const renderPriceEdit = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setPriceMode('percent')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            priceMode === 'percent'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Prozent (%)
        </button>
        <button
          onClick={() => setPriceMode('absolute')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            priceMode === 'absolute'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Absolut (€)
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          placeholder={priceMode === 'percent' ? 'z.B. 10 oder -5' : 'z.B. 0.50 oder -1.00'}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <span className="flex items-center px-4 text-gray-500 font-medium">
          {priceMode === 'percent' ? '%' : '€'}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {priceMode === 'percent'
          ? 'Positiv = erhöhen, Negativ = senken'
          : 'Positiv = hinzufügen, Negativ = abziehen'}
      </p>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode('main')} className="flex-1 rounded-xl">
          Zurück
        </Button>
        <Button onClick={handlePriceSubmit} className="flex-1 rounded-xl">
          Anwenden
        </Button>
      </div>
    </div>
  );

  const renderFlagsEdit = () => {
    // Check common flags across selected items
    const allSoldOut = selectedItems.every(i => i.is_sold_out);
    const allVegetarian = selectedItems.every(i => i.is_vegetarian);
    const allVegan = selectedItems.every(i => i.is_vegan);
    const allSpecial = selectedItems.every(i => i.is_special);
    const allPopular = selectedItems.every(i => i.is_popular);

    const flags = [
      { key: 'is_sold_out' as const, icon: '🚫', label: 'Ausverkauft', active: allSoldOut },
      { key: 'is_vegetarian' as const, icon: '🥬', label: 'Vegetarisch', active: allVegetarian },
      { key: 'is_vegan' as const, icon: '🌱', label: 'Vegan', active: allVegan },
      { key: 'is_special' as const, icon: '⭐', label: 'Tagesangebot', active: allSpecial },
      { key: 'is_popular' as const, icon: '❤️', label: 'Beliebt', active: allPopular },
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {flags.map((flag) => (
            <div key={flag.key} className="space-y-1">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <span>{flag.icon}</span> {flag.label}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onToggleFlag(flag.key, true)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    flag.active
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                  }`}
                >
                  An
                </button>
                <button
                  onClick={() => onToggleFlag(flag.key, false)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    !flag.active
                      ? 'bg-gray-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Aus
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" onClick={() => setEditMode('main')} className="w-full rounded-xl">
          Zurück
        </Button>
      </div>
    );
  };

  const renderAllergenEdit = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setAllergenAction('add')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            allergenAction === 'add'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hinzufügen
        </button>
        <button
          onClick={() => setAllergenAction('remove')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            allergenAction === 'remove'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Entfernen
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {ALLERGENS.map((allergen) => (
          <button
            key={allergen.id}
            onClick={() => {
              const newSet = new Set(selectedAllergens);
              if (newSet.has(allergen.id)) {
                newSet.delete(allergen.id);
              } else {
                newSet.add(allergen.id);
              }
              setSelectedAllergens(newSet);
            }}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
              selectedAllergens.has(allergen.id)
                ? allergenAction === 'add'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-xl">{allergen.icon}</span>
            <span className="text-xs text-gray-600 text-center line-clamp-1">{allergen.name}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode('main')} className="flex-1 rounded-xl">
          Zurück
        </Button>
        <Button
          onClick={handleAllergenSubmit}
          disabled={selectedAllergens.size === 0}
          className="flex-1 rounded-xl"
        >
          {allergenAction === 'add' ? 'Hinzufügen' : 'Entfernen'}
        </Button>
      </div>
    </div>
  );

  const renderCategoryEdit = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Verschiebe {count} Gericht{count !== 1 ? 'e' : ''} in:</p>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              selectedCategory === category.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode('main')} className="flex-1 rounded-xl">
          Zurück
        </Button>
        <Button
          onClick={handleCategorySubmit}
          disabled={!selectedCategory}
          className="flex-1 rounded-xl"
        >
          Verschieben
        </Button>
      </div>
    </div>
  );

  const renderDeleteConfirm = () => (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-700 font-medium">
          Möchtest du {count} Gericht{count !== 1 ? 'e' : ''} wirklich löschen?
        </p>
        <p className="text-red-600 text-sm mt-1">
          Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode('main')} className="flex-1 rounded-xl">
          Abbrechen
        </Button>
        <Button
          onClick={onDelete}
          className="flex-1 rounded-xl bg-red-500 hover:bg-red-600"
        >
          Endgültig löschen
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Backdrop */}
      <div
        className="absolute inset-0 -top-screen bg-black/30"
        onClick={onClose}
        style={{ top: '-100vh' }}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-t-3xl shadow-2xl safe-area-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {count} Gericht{count !== 1 ? 'e' : ''} ausgewählt
              </h3>
              <p className="text-sm text-gray-500">
                {editMode === 'main' ? 'Wähle eine Aktion' :
                 editMode === 'price' ? 'Preis anpassen' :
                 editMode === 'flags' ? 'Status ändern' :
                 editMode === 'allergens' ? 'Allergene bearbeiten' :
                 editMode === 'category' ? 'In Kategorie verschieben' :
                 'Gerichte löschen'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {editMode === 'main' && renderMainMenu()}
          {editMode === 'price' && renderPriceEdit()}
          {editMode === 'flags' && renderFlagsEdit()}
          {editMode === 'allergens' && renderAllergenEdit()}
          {editMode === 'category' && renderCategoryEdit()}
          {editMode === 'delete' && renderDeleteConfirm()}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
