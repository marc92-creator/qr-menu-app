'use client';

import { useState, useEffect } from 'react';

interface OnboardingChecklistProps {
  restaurantName: string;
  hasCategories: boolean;
  hasItems: boolean;
  onDismiss: () => void;
  onNavigate: (tab: string) => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  action?: {
    label: string;
    tab: string;
  };
}

export function OnboardingChecklist({
  restaurantName,
  hasCategories,
  hasItems,
  onDismiss,
  onNavigate,
}: OnboardingChecklistProps) {
  const [dismissed, setDismissed] = useState(false);

  // Check localStorage for dismissed state
  useEffect(() => {
    const isDismissed = localStorage.getItem('onboarding_dismissed');
    if (isDismissed === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('onboarding_dismissed', 'true');
    setDismissed(true);
    onDismiss();
  };

  const checklistItems: ChecklistItem[] = [
    {
      id: 'restaurant',
      title: 'Restaurant erstellt',
      description: `"${restaurantName}" ist bereit`,
      icon: '🏪',
      completed: true,
    },
    {
      id: 'categories',
      title: 'Kategorien anlegen',
      description: 'z.B. Vorspeisen, Hauptgerichte, Getränke',
      icon: '📂',
      completed: hasCategories,
      action: !hasCategories ? { label: 'Kategorie erstellen', tab: 'menu' } : undefined,
    },
    {
      id: 'items',
      title: 'Gerichte hinzufügen',
      description: 'Füge deine Speisen mit Preisen hinzu',
      icon: '🍽️',
      completed: hasItems,
      action: hasCategories && !hasItems ? { label: 'Gericht hinzufügen', tab: 'menu' } : undefined,
    },
    {
      id: 'qr',
      title: 'QR-Code drucken',
      description: 'Tischaufsteller für deine Gäste',
      icon: '📱',
      completed: false, // We can't track this, so it's always shown as pending
      action: hasItems ? { label: 'QR-Code ansehen', tab: 'qr' } : undefined,
    },
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;

  // Don't show if dismissed or all items complete
  if (dismissed || completedCount === checklistItems.length) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 mb-6 ring-1 ring-emerald-100 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">🚀</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Los geht&apos;s!</h3>
            <p className="text-sm text-gray-600">
              {completedCount} von {checklistItems.length} Schritten erledigt
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 p-2 -m-2 rounded-lg hover:bg-white/50 transition-colors"
          title="Schließen"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className={`
              flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              ${item.completed
                ? 'bg-white/50'
                : 'bg-white shadow-sm ring-1 ring-gray-100'
              }
            `}
          >
            {/* Status Icon */}
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
              ${item.completed
                ? 'bg-emerald-100'
                : 'bg-gray-100'
              }
            `}>
              {item.completed ? (
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-lg">{item.icon}</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {item.title}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {item.description}
              </div>
            </div>

            {/* Action Button */}
            {item.action && !item.completed && (
              <button
                onClick={() => onNavigate(item.action!.tab)}
                className="flex-shrink-0 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                {item.action.label}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Encouragement */}
      <p className="text-center text-sm text-emerald-700 mt-4">
        {completedCount < 2
          ? '💪 Du schaffst das! Nur noch wenige Schritte.'
          : completedCount < 4
          ? '🎉 Super Fortschritt! Fast geschafft.'
          : '🚀 Fantastisch! Dein Menü ist fast fertig.'}
      </p>
    </div>
  );
}
