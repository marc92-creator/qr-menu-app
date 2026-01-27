'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category, MenuItem } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';
import {
  getSandboxData,
  addSandboxCategory,
  deleteSandboxCategory,
  addSandboxMenuItem,
  updateSandboxMenuItem,
  deleteSandboxMenuItem,
  resetSandboxData,
  hasSandboxModifications,
} from '@/lib/sandboxStorage';

interface SandboxMenuEditorProps {
  onDataChange?: () => void;
}

export function SandboxMenuEditor({ onDataChange }: SandboxMenuEditorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [hasModifications, setHasModifications] = useState(false);

  // New item form
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemAllergens, setNewItemAllergens] = useState<string[]>([]);

  // Edit item form
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editAllergens, setEditAllergens] = useState<string[]>([]);

  // New category form
  const [newCategoryName, setNewCategoryName] = useState('');

  // Load sandbox data on mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    const data = getSandboxData();
    setCategories(data.categories);
    setMenuItems(data.menuItems);
    setHasModifications(hasSandboxModifications());
    onDataChange?.();
  };

  const toggleAllergen = (allergenId: string, isNewItem: boolean) => {
    if (isNewItem) {
      setNewItemAllergens(prev =>
        prev.includes(allergenId)
          ? prev.filter(a => a !== allergenId)
          : [...prev, allergenId]
      );
    } else {
      setEditAllergens(prev =>
        prev.includes(allergenId)
          ? prev.filter(a => a !== allergenId)
          : [...prev, allergenId]
      );
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditDescription(item.description || '');
    setEditPrice(item.price.toFixed(2).replace('.', ','));
    setEditAllergens(item.allergens || []);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    const price = parseFloat(editPrice.replace(',', '.'));
    if (isNaN(price)) return;

    updateSandboxMenuItem(editingItem.id, {
      name: editName.trim(),
      description: editDescription.trim() || null,
      price,
      allergens: editAllergens,
    });

    setEditingItem(null);
    loadData();
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    addSandboxCategory(newCategoryName.trim());
    setNewCategoryName('');
    setShowAddCategory(false);
    loadData();
  };

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemCategory || !newItemPrice) return;

    const price = parseFloat(newItemPrice.replace(',', '.'));
    if (isNaN(price)) return;

    const categoryItems = menuItems.filter(i => i.category_id === newItemCategory);

    addSandboxMenuItem({
      category_id: newItemCategory,
      name: newItemName.trim(),
      description: newItemDescription.trim() || null,
      price,
      image_url: null,
      is_available: true,
      position: categoryItems.length,
      allergens: newItemAllergens,
      is_vegetarian: false,
      is_vegan: false,
      is_popular: false,
      is_special: false,
    });

    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setNewItemCategory('');
    setNewItemAllergens([]);
    setShowAddItem(false);
    loadData();
  };

  const handleDeleteItem = (itemId: string) => {
    if (!confirm('Gericht wirklich löschen?')) return;
    deleteSandboxMenuItem(itemId);
    loadData();
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!confirm('Kategorie und alle zugehörigen Gerichte löschen?')) return;
    deleteSandboxCategory(categoryId);
    loadData();
  };

  const handleResetSandbox = () => {
    if (!confirm('Alle Änderungen zurücksetzen? Die Demo-Daten werden wiederhergestellt.')) return;
    resetSandboxData();
    loadData();
  };

  // Allergen Selector Component
  const AllergenSelector = ({ selected, onToggle }: { selected: string[], onToggle: (id: string) => void }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          Allergene
        </label>
        {selected.length > 0 && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {selected.length} ausgewählt
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1 -m-1">
        {ALLERGENS.map((allergen) => (
          <button
            key={allergen.id}
            type="button"
            onClick={() => onToggle(allergen.id)}
            className={`
              flex items-center gap-2 p-3 rounded-xl text-left text-sm
              transition-all duration-200 touch-manipulation min-h-[48px]
              ${selected.includes(allergen.id)
                ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500 shadow-sm'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
              }
            `}
          >
            <span className="text-lg">{allergen.icon}</span>
            <span className="truncate font-medium">{allergen.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sandbox Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎮</span>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Sandbox-Modus</h3>
              <p className="text-sm text-purple-700">
                Deine Änderungen werden lokal gespeichert. Registriere dich um dauerhaft zu speichern!
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {hasModifications && (
              <button
                onClick={handleResetSandbox}
                className="px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-xl transition-colors"
              >
                Zurücksetzen
              </button>
            )}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              Jetzt registrieren
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Menü bearbeiten</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            {categories.length} Kategorie{categories.length !== 1 ? 'n' : ''} · {menuItems.length} Gericht{menuItems.length !== 1 ? 'e' : ''}
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddCategory(true)}
            className="text-sm rounded-xl hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Kategorie</span>
            <span className="sm:hidden">Kat.</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddItem(true)}
            disabled={categories.length === 0}
            className="text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Neues Gericht</span>
            <span className="sm:hidden">Gericht</span>
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddCategory(false);
          }}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md safe-area-bottom shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📂</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Neue Kategorie</h2>
              </div>
              <button
                onClick={() => setShowAddCategory(false)}
                className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-5">
              <Input
                id="categoryName"
                label="Kategorie-Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="z.B. Vorspeisen"
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => setShowAddCategory(false)}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleAddCategory}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddItem(false);
              setNewItemAllergens([]);
            }
          }}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md max-h-[90vh] overflow-y-auto safe-area-bottom shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🍽️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Neues Gericht</h2>
              </div>
              <button
                onClick={() => {
                  setShowAddItem(false);
                  setNewItemAllergens([]);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategorie
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[52px] bg-gray-50 transition-all"
                >
                  <option value="">Bitte wählen</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                id="itemName"
                label="Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="z.B. Döner im Brot"
              />
              <Input
                id="itemDescription"
                label="Beschreibung (optional)"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="z.B. Mit frischem Salat und Soße"
              />
              <Input
                id="itemPrice"
                label="Preis (€)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="z.B. 5,50"
              />
              <AllergenSelector
                selected={newItemAllergens}
                onToggle={(id) => toggleAllergen(id, true)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => {
                  setShowAddItem(false);
                  setNewItemAllergens([]);
                }}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleAddItem}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingItem(null);
          }}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md max-h-[90vh] overflow-y-auto safe-area-bottom shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">✏️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Gericht bearbeiten</h2>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-5">
              <Input
                id="editName"
                label="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="z.B. Döner im Brot"
              />
              <Input
                id="editDescription"
                label="Beschreibung (optional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="z.B. Mit frischem Salat und Soße"
              />
              <Input
                id="editPrice"
                label="Preis (€)"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                placeholder="z.B. 5,50"
              />
              <AllergenSelector
                selected={editAllergens}
                onToggle={(id) => toggleAllergen(id, false)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => setEditingItem(null)}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleSaveItem}>
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories and Items */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-gray-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Erstelle dein Menü</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Beginne mit einer Kategorie und füge dann Gerichte hinzu.
            </p>
          </div>
          <div className="text-center">
            <Button
              onClick={() => setShowAddCategory(true)}
              size="lg"
              className="shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all px-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Erste Kategorie erstellen
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => {
            const items = menuItems.filter((i) => i.category_id === category.id);

            return (
              <div key={category.id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all duration-200">
                {/* Category Header */}
                <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white text-lg">📂</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900">{category.name}</h2>
                      <p className="text-xs text-gray-500">{items.length} Gericht{items.length !== 1 ? 'e' : ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-500 active:text-red-600 transition-colors p-3 -m-2 touch-manipulation rounded-xl hover:bg-red-50"
                    title="Kategorie löschen"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="px-5 sm:px-6 py-8 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-4">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Kategorie ist leer</h4>
                    <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                      Füge dein erstes Gericht zu &quot;{category.name}&quot; hinzu.
                    </p>
                    <button
                      onClick={() => {
                        setNewItemCategory(category.id);
                        setShowAddItem(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Erstes Gericht hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => {
                      const itemAllergens = getAllergensByIds(item.allergens || []);

                      return (
                        <div
                          key={item.id}
                          className="px-5 sm:px-6 py-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900">{item.name}</div>
                            {item.description && (
                              <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                                {item.description}
                              </div>
                            )}
                            {itemAllergens.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {itemAllergens.map((allergen) => (
                                  <span
                                    key={allergen.id}
                                    title={allergen.name}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
                                  >
                                    <span>{allergen.icon}</span>
                                    <span className="hidden sm:inline">{allergen.name}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-lg font-bold text-emerald-600">
                              {formatPrice(item.price)}
                            </span>
                            <button
                              onClick={() => handleEditItem(item)}
                              className="text-gray-300 group-hover:text-emerald-600 hover:text-emerald-700 transition-colors p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-emerald-50"
                              title="Bearbeiten"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-gray-300 group-hover:text-gray-400 hover:text-red-500 transition-colors p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-red-50"
                              title="Löschen"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
