'use client';

import { useState, useEffect } from 'react';
import { haptics } from '@/lib/haptics';

interface FABAction {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FABProps {
  actions?: FABAction[];
  mainIcon?: string;
  mainLabel?: string;
  onMainClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hideOnScroll?: boolean;
}

export function FAB({
  actions = [],
  mainIcon = '+',
  mainLabel,
  onMainClick,
  position = 'bottom-right',
  hideOnScroll = false,
}: FABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll hiding
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        setIsOpen(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  const handleMainClick = () => {
    haptics.tap();

    if (actions.length > 0) {
      setIsOpen(!isOpen);
    } else if (onMainClick) {
      onMainClick();
    }
  };

  const handleActionClick = (action: FABAction) => {
    haptics.tap();
    setIsOpen(false);
    action.onClick();
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-20 left-4 sm:bottom-6 sm:left-6',
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => {
            haptics.tap();
            setIsOpen(false);
          }}
          style={{ opacity: isOpen ? 1 : 0 }}
        />
      )}

      {/* Action Buttons (appear above FAB) */}
      {isOpen && actions.length > 0 && (
        <div
          className={`fixed z-50 flex flex-col gap-3 ${
            position.includes('right') ? 'items-end' : 'items-start'
          } ${
            position.includes('bottom')
              ? 'bottom-36 sm:bottom-24'
              : 'top-24'
          } ${
            position.includes('right') ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
          }`}
        >
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'backwards',
              }}
            >
              {position.includes('right') && (
                <span className="bg-white text-gray-700 text-sm font-medium px-3 py-2 rounded-full shadow-lg whitespace-nowrap">
                  {action.label}
                </span>
              )}

              <button
                onClick={() => handleActionClick(action)}
                className={`w-12 h-12 sm:w-14 sm:h-14 ${
                  action.color || 'bg-white'
                } rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform touch-manipulation`}
              >
                <span className="text-xl sm:text-2xl">{action.icon}</span>
              </button>

              {position.includes('left') && (
                <span className="bg-white text-gray-700 text-sm font-medium px-3 py-2 rounded-full shadow-lg whitespace-nowrap">
                  {action.label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={handleMainClick}
        className={`
          fixed z-50
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          bg-gradient-to-r from-emerald-500 to-teal-500
          text-white
          shadow-lg shadow-emerald-500/30
          flex items-center justify-center
          hover:shadow-xl hover:shadow-emerald-500/40
          active:scale-95
          transition-all duration-200
          touch-manipulation
          ${positionClasses[position]}
          ${!isVisible && hideOnScroll ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label={mainLabel || 'Aktionen'}
        title={mainLabel}
      >
        <span className="text-2xl sm:text-3xl font-light">{mainIcon}</span>
      </button>
    </>
  );
}

/**
 * FAB with preset for Menu Editor
 */
interface MenuEditorFABProps {
  onAddItem: () => void;
  onAddCategory: () => void;
  onAIHelp?: () => void;
  isDisabled?: boolean;
}

export function MenuEditorFAB({
  onAddItem,
  onAddCategory,
  onAIHelp,
  isDisabled = false,
}: MenuEditorFABProps) {
  if (isDisabled) return null;

  const actions: FABAction[] = [
    {
      icon: '🍽️',
      label: 'Gericht',
      onClick: onAddItem,
    },
    {
      icon: '📁',
      label: 'Kategorie',
      onClick: onAddCategory,
    },
  ];

  if (onAIHelp) {
    actions.push({
      icon: '✨',
      label: 'KI-Hilfe',
      onClick: onAIHelp,
    });
  }

  return (
    <FAB
      actions={actions}
      mainIcon="+"
      mainLabel="Hinzufügen"
      position="bottom-right"
      hideOnScroll
    />
  );
}
