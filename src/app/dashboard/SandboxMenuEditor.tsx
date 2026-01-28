'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category, MenuItem } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';
import { getItemImageUrl, getCategoryImage, ImageMode } from '@/lib/foodImages';
import { ImageGalleryModal } from '@/components/ImageGalleryModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  getSandboxData,
  addSandboxCategory,
  deleteSandboxCategory,
  addSandboxMenuItem,
  updateSandboxMenuItem,
  deleteSandboxMenuItem,
  resetSandboxData,
  hasSandboxModifications,
  reorderSandboxMenuItems,
  reorderSandboxCategories,
} from '@/lib/sandboxStorage';

// Sortable Category Header Component
function SortableCategoryHeader({
  category,
  itemCount,
  onDelete,
  children,
}: {
  category: Category;
  itemCount: number;
  onDelete: (categoryId: string) => void;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all duration-200 ${
        isDragging ? 'shadow-xl ring-2 ring-emerald-500' : ''
      }`}
    >
      {/* Category Header - Distinct from items with emerald accent */}
      <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-white border-b-2 border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Drag Handle for Category */}
          <button
            {...attributes}
            {...listeners}
            className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1 -ml-1 rounded hover:bg-gray-100 transition-colors touch-none"
            style={{ touchAction: 'none' }}
            title="Kategorie verschieben"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
            </svg>
          </button>
          {(() => {
            const catImage = getCategoryImage(category.name);
            return (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md overflow-hidden bg-white ring-2 ring-emerald-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={catImage.image} alt={category.name} className="w-9 h-9 object-contain" />
              </div>
            );
          })()}
          <div>
            <h2 className="font-bold text-lg text-gray-900">{category.name}</h2>
            <p className="text-xs text-emerald-600 font-medium">{itemCount} Gericht{itemCount !== 1 ? 'e' : ''}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(category.id)}
          className="text-gray-400 hover:text-red-500 active:text-red-600 transition-colors p-3 -m-2 touch-manipulation rounded-xl hover:bg-red-50"
          title="Kategorie löschen"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      {children}
    </div>
  );
}

interface SandboxMenuEditorProps {
  onDataChange?: () => void;
  onUpdate?: () => void;
}

// Sortable Menu Item Component
function SortableMenuItem({
  item,
  onEdit,
  onDelete,
}: {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    // NOTE: Do NOT add touchAction: 'none' here - it blocks scrolling!
  };

  const itemAllergens = getAllergensByIds(item.allergens || []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`px-3 sm:px-5 py-3 sm:py-4 flex items-start gap-2 sm:gap-3 hover:bg-gray-50/50 transition-colors group ${
        isDragging ? 'bg-emerald-50 shadow-lg rounded-xl ring-2 ring-emerald-500' : ''
      }`}
    >
      {/* Drag Handle - ONLY element with touch-action: none */}
      <button
        {...attributes}
        {...listeners}
        className="mt-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1 -ml-1 rounded hover:bg-gray-100 transition-colors drag-handle touch-none"
        style={{ touchAction: 'none' }}
        title="Zum Sortieren ziehen"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </button>

      {/* Thumbnail */}
      {(() => {
        const imageUrl = getItemImageUrl(item, true);
        if (!imageUrl) return null;
        return (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-200 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })()}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</div>
            {item.description && (
              <div className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-1">
                {item.description}
              </div>
            )}
          </div>
          <span className="text-sm sm:text-lg font-bold text-emerald-600 whitespace-nowrap flex-shrink-0">
            {formatPrice(item.price)}
          </span>
        </div>
        {itemAllergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {itemAllergens.map((allergen) => (
              <span
                key={allergen.id}
                title={allergen.name}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                <span>{allergen.icon}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="text-gray-300 group-hover:text-emerald-600 hover:text-emerald-700 transition-colors p-1.5 sm:p-2 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-emerald-50"
          title="Bearbeiten"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-gray-300 group-hover:text-gray-400 hover:text-red-500 transition-colors p-1.5 sm:p-2 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-red-50"
          title="Löschen"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function SandboxMenuEditor({ onDataChange, onUpdate }: SandboxMenuEditorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [hasModifications, setHasModifications] = useState(false);

  // Drag and drop sensors with touch support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Slightly more distance to prevent accidental drags
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,      // Hold for 250ms before drag activates
        tolerance: 8,    // Allow slight movement during delay
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for reordering items within a category
  const handleItemDragEnd = (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Important: sort by position to match the visual order
      const categoryItems = menuItems
        .filter(i => i.category_id === categoryId)
        .sort((a, b) => a.position - b.position);
      const oldIndex = categoryItems.findIndex(i => i.id === active.id);
      const newIndex = categoryItems.findIndex(i => i.id === over.id);

      const reorderedItems = arrayMove(categoryItems, oldIndex, newIndex);
      const orderedIds = reorderedItems.map(i => i.id);

      reorderSandboxMenuItems(categoryId, orderedIds);
      loadData();
    }
  };

  // Handle drag end for reordering categories
  const handleCategoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sortedCategories = [...categories].sort((a, b) => a.position - b.position);
      const oldIndex = sortedCategories.findIndex(c => c.id === active.id);
      const newIndex = sortedCategories.findIndex(c => c.id === over.id);

      const reorderedCategories = arrayMove(sortedCategories, oldIndex, newIndex);
      const orderedIds = reorderedCategories.map(c => c.id);

      reorderSandboxCategories(orderedIds);
      loadData();
    }
  };

  // New item form
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemAllergens, setNewItemAllergens] = useState<string[]>([]);
  const [newItemImageMode, setNewItemImageMode] = useState<ImageMode>('auto');
  const [newItemImageLibraryKey, setNewItemImageLibraryKey] = useState<string | null>(null);
  const [showNewItemImageGallery, setShowNewItemImageGallery] = useState(false);

  // Edit item form
  const [editName, setEditName] = useState('');
  const [editNameEn, setEditNameEn] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDescriptionEn, setEditDescriptionEn] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editAllergens, setEditAllergens] = useState<string[]>([]);
  const [editImageMode, setEditImageMode] = useState<ImageMode>('auto');
  const [editImageLibraryKey, setEditImageLibraryKey] = useState<string | null>(null);
  const [showImageGallery, setShowImageGallery] = useState(false);

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
    onUpdate?.();
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
    setEditNameEn(item.name_en || '');
    setEditDescription(item.description || '');
    setEditDescriptionEn(item.description_en || '');
    setEditPrice(item.price.toFixed(2).replace('.', ','));
    setEditAllergens(item.allergens || []);
    setEditImageMode(item.image_mode || 'auto');
    setEditImageLibraryKey(item.image_library_key || null);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    const price = parseFloat(editPrice.replace(',', '.'));
    if (isNaN(price)) return;

    updateSandboxMenuItem(editingItem.id, {
      name: editName.trim(),
      name_en: editNameEn.trim() || null,
      description: editDescription.trim() || null,
      description_en: editDescriptionEn.trim() || null,
      price,
      allergens: editAllergens,
      image_mode: editImageMode,
      image_library_key: editImageMode === 'library' ? editImageLibraryKey : null,
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
      image_mode: newItemImageMode,
      image_library_key: newItemImageMode === 'library' ? newItemImageLibraryKey : null,
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
    setNewItemImageMode('auto');
    setNewItemImageLibraryKey(null);
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
              setNewItemImageMode('auto');
              setNewItemImageLibraryKey(null);
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
                  setNewItemImageMode('auto');
                  setNewItemImageLibraryKey(null);
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

              {/* Image Mode Selector for New Item */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Gericht-Bild
                </label>

                <div className="flex items-start gap-4">
                  {/* Preview Box */}
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 flex-shrink-0">
                    {(() => {
                      const previewUrl = newItemImageMode === 'auto'
                        ? getItemImageUrl({ name: newItemName, image_mode: 'auto' }, true)
                        : newItemImageMode === 'library' && newItemImageLibraryKey
                          ? getItemImageUrl({ name: newItemName, image_mode: 'library', image_library_key: newItemImageLibraryKey }, true)
                          : null;
                      return previewUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={previewUrl} alt="Vorschau" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Mode Buttons */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setNewItemImageMode('auto')}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          newItemImageMode === 'auto'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🪄 Auto
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewItemImageGallery(true)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          newItemImageMode === 'library'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📚 Wählen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewItemImageMode('none');
                          setNewItemImageLibraryKey(null);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          newItemImageMode === 'none'
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Keins
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {newItemImageMode === 'auto' && 'Bild wird automatisch basierend auf dem Namen gewählt'}
                      {newItemImageMode === 'library' && (newItemImageLibraryKey ? 'Bild aus Bibliothek ausgewählt' : 'Klicke auf "Wählen"')}
                      {newItemImageMode === 'none' && 'Kein Bild wird angezeigt'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Gallery Modal for New Item */}
              {showNewItemImageGallery && (
                <ImageGalleryModal
                  selectedImage={newItemImageLibraryKey}
                  onSelect={(imageKey) => {
                    setNewItemImageMode('library');
                    setNewItemImageLibraryKey(imageKey);
                    setShowNewItemImageGallery(false);
                  }}
                  onClose={() => setShowNewItemImageGallery(false)}
                />
              )}

              <AllergenSelector
                selected={newItemAllergens}
                onToggle={(id) => toggleAllergen(id, true)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => {
                  setShowAddItem(false);
                  setNewItemAllergens([]);
                  setNewItemImageMode('auto');
                  setNewItemImageLibraryKey(null);
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

              {/* English Translation Section */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🇬🇧</span>
                  <span className="font-medium text-gray-700">Englische Übersetzung (optional)</span>
                </div>
                <div className="space-y-3 pl-1">
                  <Input
                    id="editNameEn"
                    label="Name (English)"
                    value={editNameEn}
                    onChange={(e) => setEditNameEn(e.target.value)}
                    placeholder="e.g. Döner in Bread"
                  />
                  <Input
                    id="editDescriptionEn"
                    label="Description (English)"
                    value={editDescriptionEn}
                    onChange={(e) => setEditDescriptionEn(e.target.value)}
                    placeholder="e.g. With fresh salad and sauce"
                  />
                </div>
              </div>

              {/* Image Mode Selector - Improved UI */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Gericht-Bild
                </label>

                {/* Current Image Preview + Mode Buttons */}
                <div className="flex items-start gap-4">
                  {/* Preview Box */}
                  <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 flex-shrink-0">
                    {(() => {
                      const previewUrl = editImageMode === 'auto'
                        ? getItemImageUrl({ name: editName, image_mode: 'auto' }, true)
                        : editImageMode === 'library' && editImageLibraryKey
                          ? getItemImageUrl({ name: editName, image_mode: 'library', image_library_key: editImageLibraryKey }, true)
                          : null;
                      return previewUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={previewUrl} alt="Vorschau" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Mode Buttons */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setEditImageMode('auto')}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'auto'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🪄 Automatisch
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowImageGallery(true)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'library'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📚 Auswählen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditImageMode('none');
                          setEditImageLibraryKey(null);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'none'
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Kein Bild
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {editImageMode === 'auto' && 'Bild wird automatisch basierend auf dem Namen gewählt'}
                      {editImageMode === 'library' && (editImageLibraryKey ? 'Bild aus Bibliothek ausgewählt' : 'Klicke auf "Auswählen" um ein Bild zu wählen')}
                      {editImageMode === 'none' && 'Kein Bild wird angezeigt'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Gallery Modal */}
              {showImageGallery && (
                <ImageGalleryModal
                  selectedImage={editImageLibraryKey}
                  onSelect={(imageKey) => {
                    setEditImageMode('library');
                    setEditImageLibraryKey(imageKey);
                    setShowImageGallery(false);
                  }}
                  onClose={() => setShowImageGallery(false)}
                />
              )}

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCategoryDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={categories.sort((a, b) => a.position - b.position).map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-6">
              {categories.sort((a, b) => a.position - b.position).map((category) => {
                const items = menuItems
                  .filter((i) => i.category_id === category.id)
                  .sort((a, b) => a.position - b.position);

                return (
                  <SortableCategoryHeader
                    key={category.id}
                    category={category}
                    itemCount={items.length}
                    onDelete={handleDeleteCategory}
                  >
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
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleItemDragEnd(event, category.id)}
                      >
                        <SortableContext
                          items={items.map(i => i.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="divide-y divide-gray-100">
                            {items.map((item) => (
                              <SortableMenuItem
                                key={item.id}
                                item={item}
                                onEdit={handleEditItem}
                                onDelete={handleDeleteItem}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </SortableCategoryHeader>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
