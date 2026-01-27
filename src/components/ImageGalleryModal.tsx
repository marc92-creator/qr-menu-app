'use client';

import { useState, useRef, useEffect } from 'react';
import { FOOD_IMAGE_LIBRARY, FOOD_CATEGORIES, FoodCategory } from '@/lib/foodImages';

interface ImageGalleryModalProps {
  onSelect: (imageKey: string) => void;
  onClose: () => void;
  selectedImage: string | null;
}

export function ImageGalleryModal({ onSelect, onClose, selectedImage }: ImageGalleryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<FoodCategory | null>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Count images per category
  const categoryCounts = FOOD_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = FOOD_IMAGE_LIBRARY.filter(item => item.category === cat.id && item.id !== 'default').length;
    return acc;
  }, {} as Record<string, number>);

  // Filter images based on search and category
  const filteredImages = FOOD_IMAGE_LIBRARY.filter((item) => {
    if (item.id === 'default') return false;

    const matchesSearch = searchTerm === '' ||
      item.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.label.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !activeCategory || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle scroll to update gradients
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftGradient(scrollLeft > 10);
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Scroll active category into view on mount
  useEffect(() => {
    handleScroll();
  }, []);

  // Scroll to selected category when it changes
  const scrollToCategoryPill = (categoryId: string | null) => {
    if (!scrollContainerRef.current) return;
    const pill = scrollContainerRef.current.querySelector(`[data-category="${categoryId || 'all'}"]`);
    if (pill) {
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const handleCategorySelect = (categoryId: FoodCategory | null) => {
    setActiveCategory(categoryId);
    scrollToCategoryPill(categoryId);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-[60]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col safe-area-bottom shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bild auswählen</h2>
              <p className="text-sm text-gray-500">{filteredImages.length} Bilder verfügbar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suchen... (z.B. Döner, Pizza, Ramen)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Pills with scroll indicators */}
        <div className="relative border-b border-gray-100">
          {/* Left gradient indicator */}
          {showLeftGradient && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          )}
          {/* Right gradient indicator */}
          {showRightGradient && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-2 p-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* All button */}
            <button
              data-category="all"
              onClick={() => handleCategorySelect(null)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex-shrink-0 min-h-[48px] ${
                activeCategory === null
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">🍽️</span>
              <span className="font-medium">Alle</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === null ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {FOOD_IMAGE_LIBRARY.filter(i => i.id !== 'default').length}
              </span>
            </button>

            {/* Category buttons */}
            {FOOD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                data-category={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex-shrink-0 min-h-[48px] ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500">Keine Bilder gefunden</p>
              <p className="text-sm text-gray-400 mt-1">Versuche einen anderen Suchbegriff</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredImages.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedImage === item.id
                      ? 'ring-3 ring-emerald-500 ring-offset-2 scale-95'
                      : 'hover:scale-95 hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain"
                  />
                  {selectedImage === item.id && (
                    <div className="absolute top-1 right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">{item.label}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={() => selectedImage && onSelect(selectedImage)}
              disabled={!selectedImage}
              className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20 disabled:shadow-none"
            >
              Auswählen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
