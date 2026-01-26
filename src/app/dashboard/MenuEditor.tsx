'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';

interface MenuEditorProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  onUpdate: () => void;
}

export function MenuEditor({ restaurant, categories, menuItems, onUpdate }: MenuEditorProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSaveItem = async () => {
    if (!editingItem) return;

    setLoading(true);
    const supabase = createClient();
    const price = parseFloat(editPrice.replace(',', '.'));

    if (isNaN(price)) {
      setLoading(false);
      return;
    }

    await supabase
      .from('menu_items')
      .update({
        name: editName.trim(),
        description: editDescription.trim() || null,
        price,
        allergens: editAllergens,
      })
      .eq('id', editingItem.id);

    setEditingItem(null);
    setLoading(false);
    onUpdate();
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setLoading(true);
    const supabase = createClient();

    await supabase.from('menu_categories').insert({
      restaurant_id: restaurant.id,
      name: newCategoryName.trim(),
      position: categories.length,
    });

    setNewCategoryName('');
    setShowAddCategory(false);
    setLoading(false);
    onUpdate();
  };

  const handleAddItem = async () => {
    if (!newItemName.trim() || !newItemCategory || !newItemPrice) return;

    setLoading(true);
    const supabase = createClient();
    const price = parseFloat(newItemPrice.replace(',', '.'));

    if (isNaN(price)) {
      setLoading(false);
      return;
    }

    const categoryItems = menuItems.filter(i => i.category_id === newItemCategory);

    await supabase.from('menu_items').insert({
      category_id: newItemCategory,
      name: newItemName.trim(),
      description: newItemDescription.trim() || null,
      price,
      position: categoryItems.length,
      allergens: newItemAllergens,
    });

    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setNewItemCategory('');
    setNewItemAllergens([]);
    setShowAddItem(false);
    setLoading(false);
    onUpdate();
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Gericht wirklich löschen?')) return;

    const supabase = createClient();
    await supabase.from('menu_items').delete().eq('id', itemId);
    onUpdate();
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Kategorie und alle zugehörigen Gerichte löschen?')) return;

    const supabase = createClient();
    await supabase.from('menu_items').delete().eq('category_id', categoryId);
    await supabase.from('menu_categories').delete().eq('id', categoryId);
    onUpdate();
  };

  // Allergen Selector Component
  const AllergenSelector = ({ selected, onToggle }: { selected: string[], onToggle: (id: string) => void }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Allergene
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
        {ALLERGENS.map((allergen) => (
          <button
            key={allergen.id}
            type="button"
            onClick={() => onToggle(allergen.id)}
            className={`
              flex items-center gap-2 p-2 rounded-lg text-left text-sm
              transition-colors touch-manipulation min-h-[44px]
              ${selected.includes(allergen.id)
                ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500'
                : 'bg-gray-100 text-gray-700 active:bg-gray-200'
              }
            `}
          >
            <span className="text-lg">{allergen.icon}</span>
            <span className="truncate">{allergen.name}</span>
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-gray-500">
          {selected.length} Allergen{selected.length !== 1 ? 'e' : ''} ausgewählt
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Menü bearbeiten</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAddCategory(true)} className="text-sm">
            <span className="hidden sm:inline">+ Kategorie</span>
            <span className="sm:hidden">+ Kat.</span>
          </Button>
          <Button size="sm" onClick={() => setShowAddItem(true)} disabled={categories.length === 0} className="text-sm">
            <span className="hidden sm:inline">+ Neues Gericht</span>
            <span className="sm:hidden">+ Neu</span>
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md safe-area-bottom">
            <h2 className="text-xl font-bold mb-4">Neue Kategorie</h2>
            <div className="space-y-4">
              <Input
                id="categoryName"
                label="Kategorie-Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="z.B. Vorspeisen"
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 min-h-[48px]" onClick={() => setShowAddCategory(false)}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[48px]" onClick={handleAddCategory} loading={loading}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md max-h-[90vh] overflow-y-auto safe-area-bottom">
            <h2 className="text-xl font-bold mb-4">Neues Gericht</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
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
                <Button variant="outline" className="flex-1 min-h-[48px]" onClick={() => {
                  setShowAddItem(false);
                  setNewItemAllergens([]);
                }}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[48px]" onClick={handleAddItem} loading={loading}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md max-h-[90vh] overflow-y-auto safe-area-bottom">
            <h2 className="text-xl font-bold mb-4">Gericht bearbeiten</h2>
            <div className="space-y-4">
              <Input
                id="editName"
                label="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Input
                id="editDescription"
                label="Beschreibung (optional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <Input
                id="editPrice"
                label="Preis (€)"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
              <AllergenSelector
                selected={editAllergens}
                onToggle={(id) => toggleAllergen(id, false)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[48px]" onClick={() => setEditingItem(null)}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[48px]" onClick={handleSaveItem} loading={loading}>
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories and Items */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-gray-600 mb-4">Noch keine Kategorien vorhanden.</p>
          <Button onClick={() => setShowAddCategory(true)} className="w-full sm:w-auto">
            Erste Kategorie erstellen
          </Button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {categories.map((category) => {
            const items = menuItems.filter((i) => i.category_id === category.id);

            return (
              <div key={category.id} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-base sm:text-lg">{category.name}</h2>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 active:text-red-500 transition-colors p-2 -m-2 touch-manipulation"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="px-4 sm:px-6 py-6 sm:py-8 text-center text-gray-500 text-sm">
                    Keine Gerichte in dieser Kategorie
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => {
                      const itemAllergens = getAllergensByIds(item.allergens || []);

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleEditItem(item)}
                          className="px-4 sm:px-6 py-3 sm:py-4 flex items-start gap-3 sm:gap-4 cursor-pointer active:bg-gray-50 touch-manipulation"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm sm:text-base">{item.name}</div>
                            {item.description && (
                              <div className="text-xs sm:text-sm text-gray-500 truncate">
                                {item.description}
                              </div>
                            )}
                            {/* Allergen Icons */}
                            {itemAllergens.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {itemAllergens.map((allergen) => (
                                  <span
                                    key={allergen.id}
                                    title={allergen.name}
                                    className="text-sm"
                                  >
                                    {allergen.icon}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <span className="font-medium text-emerald-600 text-sm sm:text-base">
                              {formatPrice(item.price)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteItem(item.id);
                              }}
                              className="text-gray-400 active:text-red-500 transition-colors p-2 -m-2 touch-manipulation"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
