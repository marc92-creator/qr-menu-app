'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Category, MenuItem, Subscription } from '@/types/database';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
// ImageUpload component available for custom uploads if needed
// import { ImageUpload } from '@/components/ImageUpload';
import { ImageGalleryModal } from '@/components/ImageGalleryModal';
import { formatPrice } from '@/lib/utils';
import { ALLERGENS, getAllergensByIds } from '@/lib/allergens';
import { uploadMenuItemImage, deleteMenuItemImage } from '@/lib/imageUpload';
import { ITEM_TAGS } from '@/lib/itemTags';
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
import { getCategoryImage, getItemImageUrl, ImageMode } from '@/lib/foodImages';

// Sortable Category Wrapper
function SortableCategory({
  category,
  children,
  isDragDisabled
}: {
  category: Category;
  children: React.ReactNode;
  isDragDisabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id, disabled: isDragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="relative">
        {!isDragDisabled && (
          <div
            {...listeners}
            className="absolute left-2 top-4 cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 z-10 touch-none"
            style={{ touchAction: 'none' }}
            title="Kategorie verschieben"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
            </svg>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Sortable Menu Item Wrapper
function SortableMenuItem({
  item,
  children,
  isDragDisabled
}: {
  item: MenuItem;
  children: React.ReactNode;
  isDragDisabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: isDragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? '#f9fafb' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      {!isDragDisabled && (
        <div
          {...listeners}
          className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-2 text-gray-300 hover:text-gray-500 z-10 touch-none"
          style={{ touchAction: 'none' }}
          title="Gericht verschieben"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </div>
      )}
      {children}
    </div>
  );
}

interface MenuEditorProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  subscription: Subscription | null;
  onUpdate: () => void;
  onItemsChange?: (items: MenuItem[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MenuEditor({ restaurant, categories, menuItems, subscription, onUpdate, onItemsChange }: MenuEditorProps) {
  const isDemo = restaurant.is_demo;

  // Local state for optimistic UI updates
  const [localMenuItems, setLocalMenuItems] = useState<MenuItem[]>(menuItems);

  // Sync local state when props change (e.g., after full reload)
  useEffect(() => {
    setLocalMenuItems(menuItems);
  }, [menuItems]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  // All features available for everyone (Trial + Pro)
  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  const handleAddItemClick = () => {
    setShowAddItem(true);
  };

  // New item form
  const [newItemName, setNewItemName] = useState('');
  const [newItemNameEn, setNewItemNameEn] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemDescriptionEn, setNewItemDescriptionEn] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemAllergens, setNewItemAllergens] = useState<string[]>([]);
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [newItemImagePreview, setNewItemImagePreview] = useState<string | null>(null);
  const [newItemImageFile, setNewItemImageFile] = useState<File | null>(null);
  const [newItemImageMode, setNewItemImageMode] = useState<ImageMode>('auto');
  const [newItemImageLibraryKey, setNewItemImageLibraryKey] = useState<string | null>(null);
  const [showNewItemImageGallery, setShowNewItemImageGallery] = useState(false);
  const [newItemVegetarian, setNewItemVegetarian] = useState(false);
  const [newItemVegan, setNewItemVegan] = useState(false);
  const [newItemPopular, setNewItemPopular] = useState(false);
  const [newItemSpecial, setNewItemSpecial] = useState(false);
  const [newItemSoldOut, setNewItemSoldOut] = useState(false);

  // Edit item form
  const [editName, setEditName] = useState('');
  const [editNameEn, setEditNameEn] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDescriptionEn, setEditDescriptionEn] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editAllergens, setEditAllergens] = useState<string[]>([]);
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageRemoved, setEditImageRemoved] = useState(false);
  const [editImageMode, setEditImageMode] = useState<ImageMode>('auto');
  const [editImageLibraryKey, setEditImageLibraryKey] = useState<string | null>(null);
  const [showEditImageGallery, setShowEditImageGallery] = useState(false);
  const [editVegetarian, setEditVegetarian] = useState(false);
  const [editVegan, setEditVegan] = useState(false);
  const [editPopular, setEditPopular] = useState(false);
  const [editSpecial, setEditSpecial] = useState(false);
  const [editSoldOut, setEditSoldOut] = useState(false);

  // New category form
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryNameEn, setNewCategoryNameEn] = useState('');

  // Drag & Drop sensors with touch support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update the restaurant's updated_at timestamp when menu changes
  const updateRestaurantTimestamp = async () => {
    const supabase = createClient();
    await supabase
      .from('restaurants')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', restaurant.id);
  };

  // Handle category reordering
  const handleCategoryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sortedCategories = [...categories].sort((a, b) => a.position - b.position);
    const oldIndex = sortedCategories.findIndex(c => c.id === active.id);
    const newIndex = sortedCategories.findIndex(c => c.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(sortedCategories, oldIndex, newIndex);

    try {
      const supabase = createClient();
      // Update positions in database sequentially to avoid race conditions
      for (let index = 0; index < reordered.length; index++) {
        const cat = reordered[index];
        const { error } = await supabase
          .from('menu_categories')
          .update({ position: index })
          .eq('id', cat.id);

        if (error) {
          console.error(`Error updating category ${cat.id}:`, error);
          throw error;
        }
      }

      await updateRestaurantTimestamp();
      onUpdate();
    } catch (error) {
      console.error('Error reordering categories:', error);
      alert('Fehler beim Speichern der Reihenfolge. Bitte versuche es erneut.');
    }
  };

  // Handle menu item reordering within a category
  const handleItemDragEnd = async (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const categoryItems = localMenuItems
      .filter(i => i.category_id === categoryId)
      .sort((a, b) => a.position - b.position);

    const oldIndex = categoryItems.findIndex(i => i.id === active.id);
    const newIndex = categoryItems.findIndex(i => i.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(categoryItems, oldIndex, newIndex);

    // 1. Calculate new positions
    const updatedCategoryItems = reordered.map((item, index) => ({
      ...item,
      position: index
    }));

    // 2. Optimistically update UI immediately
    const previousItems = localMenuItems;
    setLocalMenuItems(prev => {
      // Replace items in this category with reordered ones
      const otherItems = prev.filter(i => i.category_id !== categoryId);
      return [...otherItems, ...updatedCategoryItems];
    });

    // 3. Save to Supabase
    try {
      const supabase = createClient();
      // Update positions in database sequentially to avoid race conditions
      for (const item of updatedCategoryItems) {
        const { error } = await supabase
          .from('menu_items')
          .update({ position: item.position })
          .eq('id', item.id);

        if (error) {
          console.error(`Error updating item ${item.id}:`, error);
          throw error;
        }
      }

      await updateRestaurantTimestamp();
      console.log('Sort order saved successfully');

      // Notify parent of the change so preview updates
      const newItems = [...localMenuItems.filter(i => i.category_id !== categoryId), ...updatedCategoryItems];
      onItemsChange?.(newItems);
    } catch (error) {
      console.error('Error reordering items:', error);
      // Revert to previous order on error
      setLocalMenuItems(previousItems);
      alert('Fehler beim Speichern der Reihenfolge. Bitte versuche es erneut.');
    }
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

  const toggleTag = (tagId: string, isNewItem: boolean) => {
    if (isNewItem) {
      setNewItemTags(prev =>
        prev.includes(tagId)
          ? prev.filter(t => t !== tagId)
          : [...prev, tagId]
      );
    } else {
      setEditTags(prev =>
        prev.includes(tagId)
          ? prev.filter(t => t !== tagId)
          : [...prev, tagId]
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
    setEditTags(item.tags || []);
    // Set image mode from item (default to 'auto' if not set)
    setEditImageMode(item.image_mode || 'auto');
    setEditImageLibraryKey(item.image_library_key || null);
    // Only show preview for custom uploaded images
    setEditImagePreview(item.image_mode === 'custom' ? item.image_url : null);
    setEditImageFile(null);
    setEditImageRemoved(false);
    setEditVegetarian(item.is_vegetarian || false);
    setEditVegan(item.is_vegan || false);
    setEditPopular(item.is_popular || false);
    setEditSpecial(item.is_special || false);
    setEditSoldOut(item.is_sold_out || false);
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

    try {
      let imageUrl: string | null = null;

      // Handle image based on mode
      if (editImageMode === 'custom') {
        if (editImageFile) {
          // Delete old custom image if exists
          if (editingItem.image_url && editingItem.image_mode === 'custom') {
            await deleteMenuItemImage(editingItem.image_url);
          }
          // Upload new custom image
          imageUrl = await uploadMenuItemImage(editImageFile, restaurant.id, editingItem.id);
        } else if (!editImageRemoved && editingItem.image_url) {
          // Keep existing custom image
          imageUrl = editingItem.image_url;
        }
      } else {
        // For auto, library, or none modes - delete any existing custom image
        if (editingItem.image_url && editingItem.image_mode === 'custom') {
          await deleteMenuItemImage(editingItem.image_url);
        }
      }

      await supabase
        .from('menu_items')
        .update({
          name: editName.trim(),
          name_en: editNameEn.trim() || null,
          description: editDescription.trim() || null,
          description_en: editDescriptionEn.trim() || null,
          price,
          allergens: editAllergens,
          tags: editTags,
          image_url: imageUrl,
          image_mode: editImageMode,
          image_library_key: editImageMode === 'library' ? editImageLibraryKey : null,
          is_vegetarian: editVegetarian,
          is_vegan: editVegan,
          is_popular: editPopular,
          is_special: editSpecial,
          is_sold_out: editSoldOut,
        })
        .eq('id', editingItem.id);

      await updateRestaurantTimestamp();
      setEditingItem(null);
      setEditImageFile(null);
      setEditImagePreview(null);
      setEditImageRemoved(false);
      onUpdate();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Fehler beim Speichern. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setLoading(true);
    const supabase = createClient();

    await supabase.from('menu_categories').insert({
      restaurant_id: restaurant.id,
      name: newCategoryName.trim(),
      name_en: newCategoryNameEn.trim() || null,
      position: categories.length,
    });

    await updateRestaurantTimestamp();
    setNewCategoryName('');
    setNewCategoryNameEn('');
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

    try {
      const categoryItems = localMenuItems.filter(i => i.category_id === newItemCategory);

      // Build item data - only include fields that exist in database
      const itemData = {
        category_id: newItemCategory,
        name: newItemName.trim(),
        description: newItemDescription.trim() || null,
        price,
        position: categoryItems.length,
        allergens: newItemAllergens,
        is_vegetarian: newItemVegetarian,
        is_vegan: newItemVegan,
        is_popular: newItemPopular,
        is_special: newItemSpecial,
        is_sold_out: newItemSoldOut,
        // Optional fields - only include if they have values
        ...(newItemNameEn.trim() ? { name_en: newItemNameEn.trim() } : {}),
        ...(newItemDescriptionEn.trim() ? { description_en: newItemDescriptionEn.trim() } : {}),
        ...(newItemTags.length > 0 ? { tags: newItemTags } : {}),
        ...(newItemImageMode !== 'auto' ? { image_mode: newItemImageMode } : {}),
        ...(newItemImageMode === 'library' && newItemImageLibraryKey ? { image_library_key: newItemImageLibraryKey } : {}),
      };

      console.log('Adding item with data:', itemData);

      // Create the item first to get its ID
      const { data: newItem, error: insertError } = await supabase
        .from('menu_items')
        .insert(itemData)
        .select()
        .single();

      console.log('Insert result:', { newItem, insertError });

      if (insertError || !newItem) {
        console.error('Insert error details:', insertError);
        throw insertError || new Error('Failed to create item');
      }

      // Upload custom image if provided
      if (newItemImageFile && newItemImageMode === 'custom') {
        const imageUrl = await uploadMenuItemImage(newItemImageFile, restaurant.id, newItem.id);
        await supabase
          .from('menu_items')
          .update({ image_url: imageUrl, image_mode: 'custom' })
          .eq('id', newItem.id);
      }

      await updateRestaurantTimestamp();
      setNewItemName('');
      setNewItemNameEn('');
      setNewItemDescription('');
      setNewItemDescriptionEn('');
      setNewItemPrice('');
      setNewItemCategory('');
      setNewItemAllergens([]);
      setNewItemTags([]);
      setNewItemImagePreview(null);
      setNewItemImageFile(null);
      setNewItemImageMode('auto');
      setNewItemImageLibraryKey(null);
      setNewItemVegetarian(false);
      setNewItemVegan(false);
      setNewItemPopular(false);
      setNewItemSpecial(false);
      setNewItemSoldOut(false);
      setShowAddItem(false);
      onUpdate();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Fehler beim Hinzufügen. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Gericht wirklich löschen?')) return;

    const supabase = createClient();
    await supabase.from('menu_items').delete().eq('id', itemId);
    await updateRestaurantTimestamp();
    onUpdate();
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Kategorie und alle zugehörigen Gerichte löschen?')) return;

    const supabase = createClient();
    await supabase.from('menu_items').delete().eq('category_id', categoryId);
    await supabase.from('menu_categories').delete().eq('id', categoryId);
    await updateRestaurantTimestamp();
    onUpdate();
  };

  // Quick toggle sold out status
  const handleToggleSoldOut = async (item: MenuItem) => {
    const newSoldOutStatus = !item.is_sold_out;

    // Optimistic update
    setLocalMenuItems(prev =>
      prev.map(i => i.id === item.id ? { ...i, is_sold_out: newSoldOutStatus } : i)
    );

    try {
      const supabase = createClient();
      await supabase
        .from('menu_items')
        .update({ is_sold_out: newSoldOutStatus })
        .eq('id', item.id);

      await updateRestaurantTimestamp();
      onUpdate();
    } catch (error) {
      console.error('Error toggling sold out:', error);
      // Revert optimistic update on error
      setLocalMenuItems(prev =>
        prev.map(i => i.id === item.id ? { ...i, is_sold_out: !newSoldOutStatus } : i)
      );
    }
  };

  // Badge Selector Component
  const BadgeSelector = ({
    vegetarian,
    vegan,
    popular,
    special,
    soldOut,
    onVegetarianChange,
    onVeganChange,
    onPopularChange,
    onSpecialChange,
    onSoldOutChange,
  }: {
    vegetarian: boolean;
    vegan: boolean;
    popular: boolean;
    special: boolean;
    soldOut: boolean;
    onVegetarianChange: (v: boolean) => void;
    onVeganChange: (v: boolean) => void;
    onPopularChange: (v: boolean) => void;
    onSpecialChange: (v: boolean) => void;
    onSoldOutChange: (v: boolean) => void;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        Badges & Kennzeichnungen
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onVeganChange(!vegan)}
          className={`
            flex items-center gap-2 p-3 rounded-xl text-left text-sm
            transition-all duration-200 touch-manipulation min-h-[48px]
            ${vegan
              ? 'bg-green-100 text-green-800 ring-2 ring-green-500 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            }
          `}
        >
          <span className="text-lg">🌱</span>
          <span className="font-medium">Vegan</span>
        </button>
        <button
          type="button"
          onClick={() => onVegetarianChange(!vegetarian)}
          className={`
            flex items-center gap-2 p-3 rounded-xl text-left text-sm
            transition-all duration-200 touch-manipulation min-h-[48px]
            ${vegetarian
              ? 'bg-green-100 text-green-800 ring-2 ring-green-500 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            }
          `}
        >
          <span className="text-lg">🥬</span>
          <span className="font-medium">Vegetarisch</span>
        </button>
        <button
          type="button"
          onClick={() => onPopularChange(!popular)}
          className={`
            flex items-center gap-2 p-3 rounded-xl text-left text-sm
            transition-all duration-200 touch-manipulation min-h-[48px]
            ${popular
              ? 'bg-red-100 text-red-800 ring-2 ring-red-500 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            }
          `}
        >
          <span className="text-lg">❤️</span>
          <span className="font-medium">Beliebt</span>
        </button>
        <button
          type="button"
          onClick={() => onSpecialChange(!special)}
          className={`
            flex items-center gap-2 p-3 rounded-xl text-left text-sm
            transition-all duration-200 touch-manipulation min-h-[48px]
            ${special
              ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-500 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            }
          `}
        >
          <span className="text-lg">⭐</span>
          <span className="font-medium">Tagesangebot</span>
        </button>
      </div>
      {/* Sold Out Toggle - Separate section for visibility */}
      <div className="pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onSoldOutChange(!soldOut)}
          className={`
            w-full flex items-center gap-2 p-3 rounded-xl text-left text-sm
            transition-all duration-200 touch-manipulation min-h-[48px]
            ${soldOut
              ? 'bg-red-100 text-red-800 ring-2 ring-red-500 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            }
          `}
        >
          <span className="text-lg">🚫</span>
          <span className="font-medium">Ausverkauft</span>
          {soldOut && <span className="ml-auto text-xs bg-red-200 px-2 py-0.5 rounded-full">Aktiv</span>}
        </button>
      </div>
    </div>
  );

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

  // Tag Selector Component
  const TagSelector = ({ selected, onToggle }: { selected: string[], onToggle: (id: string) => void }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          Tags & Klassifizierung
        </label>
        {selected.length > 0 && (
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {selected.length} ausgewählt
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ITEM_TAGS.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => onToggle(tag.id)}
            className={`
              flex items-center gap-2 p-3 rounded-xl text-left text-sm
              transition-all duration-200 touch-manipulation min-h-[48px]
              ${selected.includes(tag.id)
                ? `${tag.bgColor} ${tag.textColor} ring-2 ring-current shadow-sm`
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
              }
            `}
          >
            <span className="text-lg">{tag.icon}</span>
            <span className="truncate font-medium">{tag.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Demo-Modus</h3>
                <p className="text-sm text-amber-700">
                  Dies ist ein Demo-Restaurant. Änderungen werden nicht gespeichert.
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              Eigenes Restaurant erstellen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Menü bearbeiten</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            {categories.length} Kategorie{categories.length !== 1 ? 'n' : ''} · {localMenuItems.length} Gericht{localMenuItems.length !== 1 ? 'e' : ''}
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddCategoryClick}
            disabled={isDemo}
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
            onClick={handleAddItemClick}
            disabled={categories.length === 0 || isDemo}
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
              <Input
                id="categoryNameEn"
                label="Name auf Englisch (optional)"
                value={newCategoryNameEn}
                onChange={(e) => setNewCategoryNameEn(e.target.value)}
                placeholder="e.g. Starters"
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => { setShowAddCategory(false); setNewCategoryNameEn(''); }}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleAddCategory} loading={loading}>
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
      setNewItemTags([]);
              setNewItemImagePreview(null);
              setNewItemImageFile(null);
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
      setNewItemTags([]);
                  setNewItemImagePreview(null);
                  setNewItemImageFile(null);
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
              {/* English Translation Section - Available for all */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🇬🇧</span>
                  <span className="font-medium text-gray-700">Englische Übersetzung (optional)</span>
                </div>
                <div className="space-y-3 pl-1">
                  <Input
                    id="itemNameEn"
                    label="Name (English)"
                    value={newItemNameEn}
                    onChange={(e) => setNewItemNameEn(e.target.value)}
                    placeholder="e.g. Döner in Bread"
                  />
                  <Input
                    id="itemDescriptionEn"
                    label="Description (English)"
                    value={newItemDescriptionEn}
                    onChange={(e) => setNewItemDescriptionEn(e.target.value)}
                    placeholder="e.g. With fresh salad and sauce"
                  />
                </div>
              </div>
              <Input
                id="itemPrice"
                label="Preis (€)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="z.B. 5,50"
              />
              {/* Image Mode Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Gericht-Bild
                </label>

                <div className="flex items-start gap-4">
                  {/* Preview Box */}
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 flex-shrink-0">
                    {(() => {
                      // Show custom upload preview if available
                      if (newItemImagePreview) {
                        /* eslint-disable-next-line @next/next/no-img-element */
                        return <img src={newItemImagePreview} alt="Vorschau" className="w-full h-full object-cover" />;
                      }
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
                        onClick={() => {
                          setNewItemImageMode('auto');
                          setNewItemImageLibraryKey(null);
                          setNewItemImagePreview(null);
                          setNewItemImageFile(null);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          newItemImageMode === 'auto' && !newItemImagePreview
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
                        📚 Bibliothek
                      </button>
                      <label
                        className={`px-3 py-1.5 text-sm rounded-full transition-all cursor-pointer ${
                          newItemImagePreview
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📷 Hochladen
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewItemImagePreview(reader.result as string);
                                setNewItemImageFile(file);
                                setNewItemImageMode('custom');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setNewItemImageMode('none');
                          setNewItemImageLibraryKey(null);
                          setNewItemImagePreview(null);
                          setNewItemImageFile(null);
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
                      {newItemImageMode === 'auto' && !newItemImagePreview && 'Bild wird automatisch basierend auf dem Namen gewählt'}
                      {newItemImageMode === 'library' && (newItemImageLibraryKey ? 'Bild aus Bibliothek ausgewählt' : 'Klicke auf "Bibliothek"')}
                      {newItemImagePreview && 'Eigenes Bild ausgewählt'}
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
                    setNewItemImagePreview(null);
                    setNewItemImageFile(null);
                    setShowNewItemImageGallery(false);
                  }}
                  onClose={() => setShowNewItemImageGallery(false)}
                />
              )}
              <AllergenSelector
                selected={newItemAllergens}
                onToggle={(id) => toggleAllergen(id, true)}
              />
              <BadgeSelector
                vegetarian={newItemVegetarian}
                vegan={newItemVegan}
                popular={newItemPopular}
                special={newItemSpecial}
                soldOut={newItemSoldOut}
                onVegetarianChange={setNewItemVegetarian}
                onVeganChange={setNewItemVegan}
                onPopularChange={setNewItemPopular}
                onSpecialChange={setNewItemSpecial}
                onSoldOutChange={setNewItemSoldOut}
              />
              <TagSelector
                selected={newItemTags}
                onToggle={(id) => toggleTag(id, true)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => {
                  setShowAddItem(false);
                  setNewItemAllergens([]);
      setNewItemTags([]);
                  setNewItemImagePreview(null);
                  setNewItemImageFile(null);
                  setNewItemVegetarian(false);
                  setNewItemVegan(false);
                  setNewItemPopular(false);
                  setNewItemSpecial(false);
                }}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleAddItem} loading={loading}>
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
            if (e.target === e.currentTarget) {
              setEditingItem(null);
              setEditImagePreview(null);
              setEditImageFile(null);
              setEditImageRemoved(false);
            }
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
                onClick={() => {
                  setEditingItem(null);
                  setEditImagePreview(null);
                  setEditImageFile(null);
                  setEditImageRemoved(false);
                }}
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

              {/* English Translation Section - Available for all */}
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
              {/* Image Mode Selector for Edit */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Gericht-Bild
                </label>

                <div className="flex items-start gap-4">
                  {/* Preview Box */}
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 flex-shrink-0">
                    {(() => {
                      // Show custom upload preview if available
                      if (editImagePreview) {
                        /* eslint-disable-next-line @next/next/no-img-element */
                        return <img src={editImagePreview} alt="Vorschau" className="w-full h-full object-cover" />;
                      }
                      const previewUrl = editImageMode === 'auto'
                        ? getItemImageUrl({ name: editName, image_mode: 'auto' }, true)
                        : editImageMode === 'library' && editImageLibraryKey
                          ? getItemImageUrl({ name: editName, image_mode: 'library', image_library_key: editImageLibraryKey }, true)
                          : editImageMode === 'custom' && editingItem?.image_url
                            ? editingItem.image_url
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
                        onClick={() => {
                          setEditImageMode('auto');
                          setEditImageLibraryKey(null);
                          setEditImagePreview(null);
                          setEditImageFile(null);
                          setEditImageRemoved(true);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'auto' && !editImagePreview
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🪄 Auto
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditImageGallery(true)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'library'
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📚 Bibliothek
                      </button>
                      <label
                        className={`px-3 py-1.5 text-sm rounded-full transition-all cursor-pointer ${
                          editImagePreview || (editImageMode === 'custom' && editingItem?.image_url)
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📷 Hochladen
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditImagePreview(reader.result as string);
                                setEditImageFile(file);
                                setEditImageMode('custom');
                                setEditImageRemoved(false);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setEditImageMode('none');
                          setEditImageLibraryKey(null);
                          setEditImagePreview(null);
                          setEditImageFile(null);
                          setEditImageRemoved(true);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editImageMode === 'none'
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Keins
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {editImageMode === 'auto' && !editImagePreview && 'Bild wird automatisch basierend auf dem Namen gewählt'}
                      {editImageMode === 'library' && (editImageLibraryKey ? 'Bild aus Bibliothek ausgewählt' : 'Klicke auf "Bibliothek"')}
                      {(editImagePreview || (editImageMode === 'custom' && editingItem?.image_url)) && 'Eigenes Bild'}
                      {editImageMode === 'none' && 'Kein Bild wird angezeigt'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Gallery Modal for Edit */}
              {showEditImageGallery && (
                <ImageGalleryModal
                  selectedImage={editImageLibraryKey}
                  onSelect={(imageKey) => {
                    setEditImageMode('library');
                    setEditImageLibraryKey(imageKey);
                    setEditImagePreview(null);
                    setEditImageFile(null);
                    setEditImageRemoved(true);
                    setShowEditImageGallery(false);
                  }}
                  onClose={() => setShowEditImageGallery(false)}
                />
              )}
              <AllergenSelector
                selected={editAllergens}
                onToggle={(id) => toggleAllergen(id, false)}
              />
              <BadgeSelector
                vegetarian={editVegetarian}
                vegan={editVegan}
                popular={editPopular}
                special={editSpecial}
                soldOut={editSoldOut}
                onVegetarianChange={setEditVegetarian}
                onVeganChange={setEditVegan}
                onPopularChange={setEditPopular}
                onSpecialChange={setEditSpecial}
                onSoldOutChange={setEditSoldOut}
              />
              <TagSelector
                selected={editTags}
                onToggle={(id) => toggleTag(id, false)}
              />
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 min-h-[52px] rounded-xl" onClick={() => {
                  setEditingItem(null);
                  setEditImagePreview(null);
                  setEditImageFile(null);
                  setEditImageRemoved(false);
                }}>
                  Abbrechen
                </Button>
                <Button className="flex-1 min-h-[52px] rounded-xl shadow-lg shadow-emerald-500/20" onClick={handleSaveItem} loading={loading}>
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
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Erstelle dein Menü</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              In nur 3 Schritten ist deine digitale Speisekarte bereit für deine Gäste.
            </p>
          </div>

          {/* Steps Guide */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="relative p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                1
              </div>
              <div className="pt-2">
                <div className="text-2xl mb-2">📂</div>
                <h4 className="font-semibold text-gray-900 mb-1">Kategorien anlegen</h4>
                <p className="text-sm text-gray-600">z.B. Vorspeisen, Hauptgerichte, Getränke</p>
              </div>
            </div>

            <div className="relative p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div className="pt-2">
                <div className="text-2xl mb-2 grayscale opacity-50">🍽️</div>
                <h4 className="font-semibold text-gray-400 mb-1">Gerichte hinzufügen</h4>
                <p className="text-sm text-gray-400">Name, Preis, Beschreibung & Allergene</p>
              </div>
            </div>

            <div className="relative p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div className="pt-2">
                <div className="text-2xl mb-2 grayscale opacity-50">📱</div>
                <h4 className="font-semibold text-gray-400 mb-1">QR-Code teilen</h4>
                <p className="text-sm text-gray-400">Drucken und auf die Tische legen</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={handleAddCategoryClick}
              size="lg"
              className="shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all px-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Erste Kategorie erstellen
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Tipp: Beginne mit deinen beliebtesten Kategorien
            </p>
          </div>
        </div>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleCategoryDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={[...categories].sort((a, b) => a.position - b.position).map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
              {[...categories].sort((a, b) => a.position - b.position).map((category) => {
                const items = localMenuItems
                  .filter((i) => i.category_id === category.id)
                  .sort((a, b) => a.position - b.position);

                return (
                  <SortableCategory key={category.id} category={category} isDragDisabled={isDemo}>
                    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all duration-200">
                      {/* Category Header - Distinct from items with emerald accent */}
                      <div className={`px-5 sm:px-6 py-4 bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-white border-b-2 border-emerald-200 flex items-center justify-between ${!isDemo ? 'pl-12' : ''}`}>
                        <div className="flex items-center gap-3">
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
                            <p className="text-xs text-emerald-600 font-medium">{items.length} Gericht{items.length !== 1 ? 'e' : ''}</p>
                          </div>
                        </div>
                        {!isDemo && (
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-gray-400 hover:text-red-500 active:text-red-600 transition-colors p-3 -m-2 touch-manipulation rounded-xl hover:bg-red-50"
                            title="Kategorie löschen"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
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
                    {!isDemo && (
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
                    )}
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
                              {items.map((item) => {
                                const itemAllergens = getAllergensByIds(item.allergens || []);

                                return (
                                  <SortableMenuItem key={item.id} item={item} isDragDisabled={isDemo}>
                                    <div
                                      className={`px-5 sm:px-6 py-4 flex items-start gap-3 hover:bg-gray-50/50 transition-colors group ${!isDemo ? 'pl-12' : ''}`}
                                    >
                          {/* Thumbnail */}
                          {(() => {
                            const imageUrl = getItemImageUrl(item, true);
                            if (!imageUrl) return null;
                            return (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-200 bg-gray-50">
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
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900">{item.name}</span>
                              {/* Item Badges */}
                              {item.is_special && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 rounded-full text-xs text-amber-700 font-medium">
                                  <span>⭐</span>
                                  <span className="hidden sm:inline">Tagesangebot</span>
                                </span>
                              )}
                              {item.is_popular && !item.is_special && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 rounded-full text-xs text-red-700 font-medium">
                                  <span>❤️</span>
                                  <span className="hidden sm:inline">Beliebt</span>
                                </span>
                              )}
                              {item.is_vegan && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full text-xs text-green-700 font-medium">
                                  <span>🌱</span>
                                  <span className="hidden sm:inline">Vegan</span>
                                </span>
                              )}
                              {item.is_vegetarian && !item.is_vegan && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full text-xs text-green-700 font-medium">
                                  <span>🥬</span>
                                  <span className="hidden sm:inline">Vegetarisch</span>
                                </span>
                              )}
                              {item.is_sold_out && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 rounded-full text-xs text-red-700 font-medium">
                                  <span>🚫</span>
                                  <span>Ausverkauft</span>
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                                {item.description}
                              </div>
                            )}
                            {/* Allergen Badges */}
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
                            {!isDemo && (
                              <>
                                {/* Quick Sold Out Toggle */}
                                <button
                                  onClick={() => handleToggleSoldOut(item)}
                                  className={`p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors ${
                                    item.is_sold_out
                                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                                      : 'text-gray-300 group-hover:text-gray-400 hover:text-red-500 hover:bg-red-50'
                                  }`}
                                  title={item.is_sold_out ? 'Als verfügbar markieren' : 'Als ausverkauft markieren'}
                                >
                                  <span className="text-base">{item.is_sold_out ? '🚫' : '✅'}</span>
                                </button>
                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="text-gray-300 group-hover:text-emerald-600 hover:text-emerald-700 transition-colors p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-emerald-50"
                                  title="Bearbeiten"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="text-gray-300 group-hover:text-gray-400 hover:text-red-500 transition-colors p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-red-50"
                                  title="Löschen"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </SortableMenuItem>
                              );
                            })}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </SortableCategory>
              );
              })}
              </div>
            </SortableContext>
          </DndContext>

          {/* Quick Add Section - Hide in demo mode */}
          {!isDemo && (
            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900">Menü erweitern</h4>
                    <p className="text-sm text-emerald-700">
                      {localMenuItems.length === 0
                        ? 'Füge Gerichte hinzu, damit Gäste bestellen können'
                        : `${localMenuItems.length} Gericht${localMenuItems.length !== 1 ? 'e' : ''} online • Weiter so!`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCategoryClick}
                    className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  >
                    + Kategorie
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddItemClick}
                    disabled={categories.length === 0}
                    className="rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    + Gericht
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tip for completed menus */}
          {localMenuItems.length >= 5 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm">Tipp</h4>
                  <p className="text-blue-700 text-sm mt-0.5">
                    Dein Menü sieht gut aus! Vergiss nicht, den QR-Code zu drucken und auf die Tische zu legen.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
