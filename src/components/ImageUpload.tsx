'use client';

import { useState, useRef } from 'react';
import { validateImageFile, compressImage } from '@/lib/imageUpload';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null, file?: File) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({ value, onChange, disabled, className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Create preview from compressed image
      const compressedBlob = await compressImage(file);
      const previewUrl = URL.createObjectURL(compressedBlob);
      setPreview(previewUrl);

      // Pass the original file to parent - upload happens on save
      onChange(previewUrl, file);
    } catch (err) {
      console.error('Image processing error:', err);
      setError('Bild konnte nicht verarbeitet werden');
    } finally {
      setIsLoading(false);
    }

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Bild (optional)
      </label>

      <div className="relative">
        {preview ? (
          <div className="relative w-32 h-32 rounded-xl overflow-hidden ring-1 ring-gray-200 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Vorschau"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  title="Bild ändern"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  title="Bild entfernen"
                >
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isLoading}
            className={`
              w-32 h-32 rounded-xl border-2 border-dashed transition-all
              flex flex-col items-center justify-center gap-2
              ${disabled
                ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer'
              }
            `}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">Bild hochladen</span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={disabled || isLoading}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-400">
        JPG, PNG oder WebP. Max. 5MB.
      </p>
    </div>
  );
}
