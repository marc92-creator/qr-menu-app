'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { haptics } from '@/lib/haptics';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  icon?: string;
  snapPoint?: number; // 0-1, default 0.7 (70% of screen height)
  closeOnBackdrop?: boolean;
  showPullHandle?: boolean;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  icon,
  snapPoint = 0.7,
  closeOnBackdrop = true,
  showPullHandle = true,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        haptics.tap();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    // Only allow dragging down
    if (deltaY > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const deltaY = currentY.current - startY.current;

    // Close if dragged down more than 100px
    if (deltaY > 100) {
      haptics.tap();
      onClose();
    } else if (sheetRef.current) {
      // Snap back
      sheetRef.current.style.transform = '';
    }
  };

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      haptics.tap();
      onClose();
    }
  };

  if (!isOpen) return null;

  const maxHeight = snapPoint * 100;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleBackdropClick}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300 ease-out"
        style={{
          maxHeight: `${maxHeight}vh`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull Handle */}
        {showPullHandle && (
          <div className="flex justify-center pt-3 pb-2 touch-manipulation">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {(title || icon) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">{icon}</span>
                </div>
              )}
              {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
            </div>
            <button
              onClick={() => {
                haptics.tap();
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 p-2 -m-2 touch-manipulation rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="overflow-y-auto overscroll-contain"
          style={{
            maxHeight: title || icon
              ? `calc(${maxHeight}vh - 80px)` // Account for header
              : `calc(${maxHeight}vh - 40px)`, // Account for pull handle only
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Bottom Sheet with sticky footer actions
 */
interface BottomSheetWithActionsProps extends BottomSheetProps {
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function BottomSheetWithActions({
  children,
  primaryAction,
  secondaryAction,
  ...props
}: BottomSheetWithActionsProps) {
  return (
    <BottomSheet {...props}>
      <div className="pb-24">{children}</div>

      {/* Sticky Footer Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
          <div className="flex gap-3 max-w-screen-sm mx-auto">
            {secondaryAction && (
              <button
                onClick={() => {
                  haptics.tap();
                  secondaryAction.onClick();
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[52px] touch-manipulation"
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                onClick={() => {
                  haptics.tap();
                  primaryAction.onClick();
                }}
                disabled={primaryAction.disabled || primaryAction.loading}
                className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] touch-manipulation flex items-center justify-center"
              >
                {primaryAction.loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  primaryAction.label
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
