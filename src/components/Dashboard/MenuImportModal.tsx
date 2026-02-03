'use client';

import { useState, useRef } from 'react';
import { Category, ExtractedMenuCategory, ExtractedMenuItem } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

interface MenuImportModalProps {
  categories: Category[];
  restaurantId: string;
  onClose: () => void;
  onImportComplete: () => void;
}

type ImportStep = 'upload' | 'extracting' | 'preview' | 'importing' | 'done';

export function MenuImportModal({
  categories,
  restaurantId,
  onClose,
  onImportComplete,
}: MenuImportModalProps) {
  const [step, setStep] = useState<ImportStep>('upload');
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedCategories, setExtractedCategories] = useState<ExtractedMenuCategory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [targetCategory, setTargetCategory] = useState<string>('');
  const [createNewCategories, setCreateNewCategories] = useState(true);
  const [importProgress, setImportProgress] = useState(0);
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError('Bitte waehle ein Bild oder PDF aus');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Datei ist zu gross (max 10MB)');
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setStep('extracting');
    setError(null);

    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', 'de');

      const response = await fetch('/api/menu/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import fehlgeschlagen');
      }

      setExtractedCategories(data.categories);
      setTotalItems(data.totalItems);
      setConfidence(data.confidence);

      // Select all items by default
      const allItemIds = new Set<string>();
      data.categories.forEach((cat: ExtractedMenuCategory, catIdx: number) => {
        cat.items.forEach((_item: ExtractedMenuItem, itemIdx: number) => {
          allItemIds.add(`${catIdx}-${itemIdx}`);
        });
      });
      setSelectedItems(allItemIds);

      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      setStep('upload');
    }
  };

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const id = `${catIdx}-${itemIdx}`;
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleCategory = (catIdx: number, items: ExtractedMenuItem[]) => {
    const newSelected = new Set(selectedItems);
    const allSelected = items.every((_, itemIdx) => newSelected.has(`${catIdx}-${itemIdx}`));

    items.forEach((_, itemIdx) => {
      const id = `${catIdx}-${itemIdx}`;
      if (allSelected) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    });
    setSelectedItems(newSelected);
  };

  const handleImport = async () => {
    if (selectedItems.size === 0) {
      setError('Bitte waehle mindestens ein Gericht aus');
      return;
    }

    setStep('importing');
    setError(null);
    setImportProgress(0);
    setImportedCount(0);

    try {
      // Map extracted categories to existing or new categories
      const categoryMap = new Map<string, string>(); // extracted name -> category id

      // Get selected items grouped by extracted category
      const itemsByCategory = new Map<number, ExtractedMenuItem[]>();
      extractedCategories.forEach((cat, catIdx) => {
        const selectedForCategory = cat.items.filter((_, itemIdx) =>
          selectedItems.has(`${catIdx}-${itemIdx}`)
        );
        if (selectedForCategory.length > 0) {
          itemsByCategory.set(catIdx, selectedForCategory);
        }
      });

      const totalToImport = selectedItems.size;
      let imported = 0;

      for (const [catIdx, items] of Array.from(itemsByCategory.entries())) {
        const extractedCategory = extractedCategories[catIdx];
        let categoryId: string;

        if (createNewCategories) {
          // Check if category with this name already exists
          const existingCategory = categories.find(
            c => c.name.toLowerCase() === extractedCategory.name.toLowerCase()
          );

          if (existingCategory) {
            categoryId = existingCategory.id;
            console.log('Using existing category:', categoryId, extractedCategory.name);
          } else {
            // Create new category
            console.log('Creating new category:', extractedCategory.name, 'for restaurant:', restaurantId);
            const { data: newCategory, error: catError } = await supabase
              .from('menu_categories')
              .insert({
                restaurant_id: restaurantId,
                name: extractedCategory.name,
                name_en: extractedCategory.nameEn || null,
                position: categories.length + categoryMap.size,
              })
              .select()
              .single();

            if (catError) {
              console.error('Failed to create category:', catError.message, catError.details, catError.hint);
              throw catError;
            }
            categoryId = newCategory.id;
            console.log('Created category:', categoryId);
          }
        } else {
          // Use selected target category
          categoryId = targetCategory;
        }

        categoryMap.set(extractedCategory.name, categoryId);

        // Get existing items count for position
        const { data: existingItems } = await supabase
          .from('menu_items')
          .select('id')
          .eq('category_id', categoryId);

        let position = existingItems?.length || 0;

        // Insert items
        for (const item of items) {
          // Use only essential fields that are known to work
          const insertData = {
            category_id: categoryId,
            name: item.name,
            name_en: item.nameEn || null,
            description: item.description || null,
            description_en: item.descriptionEn || null,
            price: item.price,
            position: position++,
            is_vegetarian: item.isVegetarian || false,
            is_vegan: item.isVegan || false,
            tags: item.tags || [],
          };

          console.log('Inserting item:', insertData);

          const { data: insertedItem, error: itemError } = await supabase
            .from('menu_items')
            .insert(insertData)
            .select()
            .single();

          if (itemError) {
            console.error('Failed to insert item:', item.name, itemError.message, itemError.details, itemError.hint);
          } else {
            console.log('Successfully inserted:', insertedItem?.id);
            imported++;
            setImportedCount(imported);
            setImportProgress(Math.round((imported / totalToImport) * 100));
          }
        }
      }

      // Update restaurant timestamp
      await supabase
        .from('restaurants')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', restaurantId);

      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import fehlgeschlagen');
      setStep('preview');
    }
  };

  const selectedCount = selectedItems.size;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {step === 'upload' && 'Speisekarte importieren'}
            {step === 'extracting' && 'Analysiere Speisekarte...'}
            {step === 'preview' && `${totalItems} Gerichte erkannt`}
            {step === 'importing' && 'Importiere...'}
            {step === 'done' && 'Import abgeschlossen'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Upload Step */}
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Laden Sie ein Foto Ihrer bestehenden Speisekarte hoch und wir extrahieren automatisch alle Gerichte.
                </p>

                {/* File Input */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer ${
                    preview ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {preview ? (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Vorschau"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-emerald-600 font-medium">
                        Klicken um anderes Bild zu waehlen
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Bild hochladen</p>
                        <p className="text-sm text-gray-500">JPG, PNG oder WebP (max. 10MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">Tipps fuer beste Ergebnisse:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>Gut beleuchtetes, scharfes Foto</li>
                  <li>Gesamte Speisekarte sichtbar</li>
                  <li>Text sollte gut lesbar sein</li>
                  <li>Preise sollten erkennbar sein</li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Extracting Step */}
          {step === 'extracting' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6">
                <svg className="animate-spin w-full h-full text-emerald-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <p className="text-gray-600">KI analysiert Ihre Speisekarte...</p>
              <p className="text-sm text-gray-400 mt-2">Das kann einige Sekunden dauern</p>
            </div>
          )}

          {/* Preview Step */}
          {step === 'preview' && (
            <div className="space-y-6">
              {/* Confidence indicator */}
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                confidence >= 0.8 ? 'bg-green-50 text-green-700' :
                confidence >= 0.6 ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }`}>
                <span className="font-medium">
                  {confidence >= 0.8 ? 'Hohe' : confidence >= 0.6 ? 'Mittlere' : 'Niedrige'} Erkennungssicherheit
                </span>
                <span className="text-sm">({Math.round(confidence * 100)}%)</span>
              </div>

              {/* Category options */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={createNewCategories}
                    onChange={() => setCreateNewCategories(true)}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <div>
                    <span className="font-medium">Neue Kategorien erstellen</span>
                    <p className="text-sm text-gray-500">Kategorien aus dem Bild uebernehmen</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={!createNewCategories}
                    onChange={() => setCreateNewCategories(false)}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <div>
                    <span className="font-medium">In bestehende Kategorie importieren</span>
                  </div>
                </label>
                {!createNewCategories && (
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    className="w-full mt-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Kategorie waehlen...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Extracted items */}
              <div className="space-y-4">
                {extractedCategories.map((category, catIdx) => (
                  <div key={catIdx} className="border rounded-xl overflow-hidden">
                    <div
                      className="bg-gray-100 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-150"
                      onClick={() => toggleCategory(catIdx, category.items)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={category.items.every((_, itemIdx) =>
                            selectedItems.has(`${catIdx}-${itemIdx}`)
                          )}
                          onChange={() => {}}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">({category.items.length} Gerichte)</span>
                      </div>
                    </div>
                    <div className="divide-y">
                      {category.items.map((item, itemIdx) => (
                        <label
                          key={itemIdx}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedItems.has(`${catIdx}-${itemIdx}`)}
                            onChange={() => toggleItem(catIdx, itemIdx)}
                            className="w-4 h-4 mt-1 text-emerald-600 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium truncate">{item.name}</span>
                              <span className="text-emerald-600 font-semibold whitespace-nowrap">
                                {item.price.toFixed(2)} EUR
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-500 truncate">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {item.isVegetarian && (
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Vegetarisch</span>
                              )}
                              {item.isVegan && (
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Vegan</span>
                              )}
                              {item.confidence && item.confidence < 0.7 && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Unsicher</span>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Importing Step */}
          {step === 'importing' && (
            <div className="text-center py-12">
              <div className="w-full max-w-xs mx-auto mb-6">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-gray-600">{importedCount} von {selectedCount} Gerichten importiert...</p>
            </div>
          )}

          {/* Done Step */}
          {step === 'done' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Import erfolgreich!</h3>
              <p className="text-gray-600">{importedCount} Gerichte wurden importiert.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          {step === 'upload' && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleExtract}
                disabled={!preview}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                  preview
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Analysieren
              </button>
            </>
          )}
          {step === 'preview' && (
            <>
              <button
                onClick={() => {
                  setStep('upload');
                  setPreview(null);
                  setExtractedCategories([]);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Zurueck
              </button>
              <button
                onClick={handleImport}
                disabled={selectedCount === 0 || (!createNewCategories && !targetCategory)}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                  selectedCount > 0 && (createNewCategories || targetCategory)
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedCount} Gerichte importieren
              </button>
            </>
          )}
          {step === 'done' && (
            <button
              onClick={() => {
                onImportComplete();
                onClose();
              }}
              className="px-6 py-2 rounded-xl font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              Fertig
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
