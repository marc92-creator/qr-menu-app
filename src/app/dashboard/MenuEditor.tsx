'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { formatPrice } from '@/lib/utils';

interface MenuEditorProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  onUpdate: () => void;
}

export function MenuEditor({ restaurant, categories, menuItems, onUpdate }: MenuEditorProps) {
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  // New item form
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  // New category form
  const [newCategoryName, setNewCategoryName] = useState('');

  const handlePriceClick = (item: MenuItem) => {
    setEditingPrice(item.id);
    setPriceValue(item.price.toFixed(2).replace('.', ','));
  };

  const handlePriceSave = async (itemId: string) => {
    const supabase = createClient();
    const price = parseFloat(priceValue.replace(',', '.'));

    if (isNaN(price)) {
      setEditingPrice(null);
      return;
    }

    await supabase
      .from('menu_items')
      .update({ price })
      .eq('id', itemId);

    setEditingPrice(null);
    onUpdate();
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setLoading(true);
    const supabase = createClient();

    await supabase.from('categories').insert({
      restaurant_id: restaurant.id,
      name: newCategoryName.trim(),
      sort_order: categories.length,
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
      sort_order: categoryItems.length,
    });

    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setNewItemCategory('');
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
    await supabase.from('categories').delete().eq('id', categoryId);
    onUpdate();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Menü bearbeiten</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAddCategory(true)}>
            + Kategorie
          </Button>
          <Button size="sm" onClick={() => setShowAddItem(true)} disabled={categories.length === 0}>
            + Neues Gericht
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
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
                <Button variant="outline" className="flex-1" onClick={() => setShowAddCategory(false)}>
                  Abbrechen
                </Button>
                <Button className="flex-1" onClick={handleAddCategory} loading={loading}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Neues Gericht</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddItem(false)}>
                  Abbrechen
                </Button>
                <Button className="flex-1" onClick={handleAddItem} loading={loading}>
                  Hinzufügen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories and Items */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-gray-600 mb-4">Noch keine Kategorien vorhanden.</p>
          <Button onClick={() => setShowAddCategory(true)}>
            Erste Kategorie erstellen
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => {
            const items = menuItems.filter((i) => i.category_id === category.id);

            return (
              <div key={category.id} className="bg-white rounded-2xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{category.name}</h2>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Keine Gerichte in dieser Kategorie
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={item.id} className="px-6 py-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 truncate">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {editingPrice === item.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={priceValue}
                                onChange={(e) => setPriceValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handlePriceSave(item.id);
                                  if (e.key === 'Escape') setEditingPrice(null);
                                }}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                                autoFocus
                              />
                              <span className="text-gray-500">€</span>
                              <Button size="sm" onClick={() => handlePriceSave(item.id)}>
                                ✓
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handlePriceClick(item)}
                              className="font-medium text-emerald-500 hover:underline min-w-[60px] text-right"
                            >
                              {formatPrice(item.price)}
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
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
