'use client';

import { useState, useRef } from 'react';
import { MenuItem } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { getImageUploadGuidelines } from '@/lib/imageStrategy';

interface ImageUploadModalProps {
  item: MenuItem;
  templateId: string;
  onClose: () => void;
  onUploadComplete: (imageUrl: string) => void;
}

export function ImageUploadModal({
  item,
  templateId,
  onClose,
  onUploadComplete,
}: ImageUploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const guidelines = getImageUploadGuidelines(templateId);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Bitte wähle eine Bilddatei aus');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Bild ist zu groß (max 5MB)');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setUploading(true);
    setError(null);

    try {
      const file = fileInputRef.current.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${item.id}-${Date.now()}.${fileExt}`;
      const filePath = `menu-items/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filePath);

      // Update menu item with new image URL
      const { error: updateError } = await supabase
        .from('menu_items')
        .update({
          image_custom_url: publicUrl,
          photo_style: 'real',
        })
        .eq('id', item.id);

      if (updateError) throw updateError;

      onUploadComplete(publicUrl);
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bild hochladen
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {item.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              Empfehlungen für {templateId}
            </h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>Seitenverhältnis:</strong> {guidelines.aspectRatio}</p>
              <p><strong>Minimale Größe:</strong> {guidelines.minDimensions}</p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-blue-800">
              {guidelines.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* File Input */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!preview ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-center"
              >
                <div className="text-4xl mb-3">📸</div>
                <p className="font-medium text-gray-900">Klicke zum Hochladen</p>
                <p className="text-sm text-gray-500 mt-1">oder ziehe ein Bild hierher</p>
                <p className="text-xs text-gray-400 mt-2">Max 5MB, JPG/PNG</p>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-xl"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-emerald-500 transition-colors font-medium"
                >
                  Anderes Bild wählen
                </button>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">
              <strong>Fehler:</strong> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleUpload}
            disabled={!preview || uploading}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Wird hochgeladen...' : 'Hochladen'}
          </button>
        </div>
      </div>
    </div>
  );
}
