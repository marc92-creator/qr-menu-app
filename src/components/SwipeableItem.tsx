'use client';

import { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { haptics } from '@/lib/haptics';

export interface SwipeAction {
  icon: string;
  label: string;
  color: string;
  textColor?: string;
  onClick: () => void;
  destructive?: boolean;
}

interface SwipeableItemProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  disabled?: boolean;
  threshold?: number;
}

export function SwipeableItem({
  children,
  leftActions = [],
  rightActions = [],
  disabled = false,
  threshold = 80,
}: SwipeableItemProps) {
  const [offset, setOffset] = useState(0);
  const [revealed, setRevealed] = useState<'left' | 'right' | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const hasTriggeredHaptic = useRef(false);

  // Calculate action widths
  const leftActionsWidth = leftActions.length * 80;
  const rightActionsWidth = rightActions.length * 80;

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (disabled) return;

      setIsSwiping(true);
      const deltaX = eventData.deltaX;

      // Limit swipe range
      if (deltaX > 0) {
        // Swiping right (reveal left actions)
        const maxOffset = leftActionsWidth || 0;
        setOffset(Math.min(deltaX, maxOffset * 1.2)); // Allow slight overscroll

        // Haptic feedback when reaching threshold
        if (deltaX > threshold && !hasTriggeredHaptic.current) {
          haptics.tap();
          hasTriggeredHaptic.current = true;
        }
      } else {
        // Swiping left (reveal right actions)
        const maxOffset = rightActionsWidth || 0;
        setOffset(Math.max(deltaX, -maxOffset * 1.2)); // Allow slight overscroll

        // Haptic feedback when reaching threshold
        if (Math.abs(deltaX) > threshold && !hasTriggeredHaptic.current) {
          haptics.tap();
          hasTriggeredHaptic.current = true;
        }
      }
    },
    onSwiped: (eventData) => {
      if (disabled) return;

      setIsSwiping(false);
      hasTriggeredHaptic.current = false;
      const deltaX = eventData.deltaX;

      if (Math.abs(deltaX) > threshold) {
        // Reveal actions
        if (deltaX > 0 && leftActions.length > 0) {
          setRevealed('left');
          setOffset(leftActionsWidth);
          haptics.selection();
        } else if (deltaX < 0 && rightActions.length > 0) {
          setRevealed('right');
          setOffset(-rightActionsWidth);
          haptics.selection();
        } else {
          setRevealed(null);
          setOffset(0);
        }
      } else {
        // Snap back
        setRevealed(null);
        setOffset(0);
      }
    },
    onTap: () => {
      // Close on tap if revealed
      if (revealed) {
        setRevealed(null);
        setOffset(0);
        haptics.tap();
      }
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10, // Min distance before swipe starts
    preventScrollOnSwipe: true,
  });

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (revealed) {
        setRevealed(null);
        setOffset(0);
      }
    };

    if (revealed) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [revealed]);

  const handleActionClick = (action: SwipeAction) => {
    if (action.destructive) {
      haptics.warning();
    } else {
      haptics.tap();
    }

    action.onClick();

    // Close after action
    setTimeout(() => {
      setRevealed(null);
      setOffset(0);
    }, 100);
  };

  if (disabled || (leftActions.length === 0 && rightActions.length === 0)) {
    return <div>{children}</div>;
  }

  return (
    <div
      className="relative overflow-hidden touch-pan-y"
      {...handlers}
    >
      {/* Left Actions (revealed on swipe right) */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex">
          {leftActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className={`${action.color} ${
                action.textColor || 'text-white'
              } px-6 flex flex-col items-center justify-center gap-1 min-w-[80px] transition-all hover:brightness-110 active:brightness-90`}
              style={{
                width: '80px',
              }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Right Actions (revealed on swipe left) */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex">
          {rightActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className={`${action.color} ${
                action.textColor || 'text-white'
              } px-6 flex flex-col items-center justify-center gap-1 min-w-[80px] transition-all hover:brightness-110 active:brightness-90`}
              style={{
                width: '80px',
              }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 bg-white transition-transform ${
          isSwiping ? 'duration-0' : 'duration-300 ease-out'
        }`}
        style={{
          transform: `translateX(${offset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Preset for Menu Item Swipe Actions
 */
interface MenuItemSwipeableProps {
  children: React.ReactNode;
  onEdit: () => void;
  onSoldOut: () => void;
  onDelete: () => void;
  isSoldOut?: boolean;
  disabled?: boolean;
}

export function MenuItemSwipeable({
  children,
  onEdit,
  onSoldOut,
  onDelete,
  isSoldOut = false,
  disabled = false,
}: MenuItemSwipeableProps) {
  const leftActions: SwipeAction[] = [
    {
      icon: '✏️',
      label: 'Bearbeiten',
      color: 'bg-blue-500',
      onClick: onEdit,
    },
  ];

  const rightActions: SwipeAction[] = [
    {
      icon: isSoldOut ? '✅' : '🚫',
      label: isSoldOut ? 'Verfügbar' : 'Ausverkauft',
      color: 'bg-amber-500',
      onClick: onSoldOut,
    },
    {
      icon: '🗑️',
      label: 'Löschen',
      color: 'bg-red-500',
      onClick: onDelete,
      destructive: true,
    },
  ];

  return (
    <SwipeableItem
      leftActions={leftActions}
      rightActions={rightActions}
      disabled={disabled}
    >
      {children}
    </SwipeableItem>
  );
}
