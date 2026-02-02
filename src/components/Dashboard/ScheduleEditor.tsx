'use client';

import { useState } from 'react';
import { Category, MenuSchedule } from '@/types/database';
import { Button } from '@/components/Button';

interface ScheduleEditorProps {
  schedules: MenuSchedule[];
  categories: Category[];
  onSave: (schedules: MenuSchedule[]) => void;
  onClose: () => void;
}

const DAYS_OF_WEEK = [
  { id: 0, short: 'So', long: 'Sonntag' },
  { id: 1, short: 'Mo', long: 'Montag' },
  { id: 2, short: 'Di', long: 'Dienstag' },
  { id: 3, short: 'Mi', long: 'Mittwoch' },
  { id: 4, short: 'Do', long: 'Donnerstag' },
  { id: 5, short: 'Fr', long: 'Freitag' },
  { id: 6, short: 'Sa', long: 'Samstag' },
];

const PRESET_SCHEDULES = [
  { name: 'Frühstück', startTime: '06:00', endTime: '11:00', icon: '🌅' },
  { name: 'Mittagstisch', startTime: '11:00', endTime: '14:30', icon: '☀️' },
  { name: 'Nachmittag', startTime: '14:30', endTime: '17:00', icon: '🌤️' },
  { name: 'Abendkarte', startTime: '17:00', endTime: '22:00', icon: '🌙' },
  { name: 'Nachtmenü', startTime: '22:00', endTime: '02:00', icon: '🌃' },
];

function generateId() {
  return `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function ScheduleEditor({
  schedules: initialSchedules,
  categories,
  onSave,
  onClose,
}: ScheduleEditorProps) {
  const [schedules, setSchedules] = useState<MenuSchedule[]>(initialSchedules);
  const [editingSchedule, setEditingSchedule] = useState<MenuSchedule | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add new schedule
  const addSchedule = (preset?: typeof PRESET_SCHEDULES[0]) => {
    const newSchedule: MenuSchedule = {
      id: generateId(),
      name: preset?.name || 'Neue Zeitkarte',
      categoryIds: [],
      startTime: preset?.startTime || '09:00',
      endTime: preset?.endTime || '17:00',
      daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri default
      isActive: true,
    };
    setSchedules([...schedules, newSchedule]);
    setEditingSchedule(newSchedule);
    setShowAddForm(false);
  };

  // Update schedule
  const updateSchedule = (updated: MenuSchedule) => {
    setSchedules(schedules.map(s => s.id === updated.id ? updated : s));
    setEditingSchedule(updated);
  };

  // Delete schedule
  const deleteSchedule = (id: string) => {
    if (confirm('Zeitkarte wirklich löschen?')) {
      setSchedules(schedules.filter(s => s.id !== id));
      if (editingSchedule?.id === id) {
        setEditingSchedule(null);
      }
    }
  };

  // Toggle day
  const toggleDay = (schedule: MenuSchedule, dayId: number) => {
    const newDays = schedule.daysOfWeek.includes(dayId)
      ? schedule.daysOfWeek.filter(d => d !== dayId)
      : [...schedule.daysOfWeek, dayId].sort((a, b) => a - b);
    updateSchedule({ ...schedule, daysOfWeek: newDays });
  };

  // Toggle category
  const toggleCategory = (schedule: MenuSchedule, categoryId: string) => {
    const newCategories = schedule.categoryIds.includes(categoryId)
      ? schedule.categoryIds.filter(c => c !== categoryId)
      : [...schedule.categoryIds, categoryId];
    updateSchedule({ ...schedule, categoryIds: newCategories });
  };

  // Handle save
  const handleSave = () => {
    onSave(schedules);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🕐</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Zeitkarten</h2>
              <p className="text-sm text-gray-500">Menü je nach Tageszeit anzeigen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {schedules.length === 0 && !showAddForm ? (
            /* Empty State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Keine Zeitkarten</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                Erstelle Zeitkarten, um verschiedene Kategorien zu bestimmten Uhrzeiten anzuzeigen (z.B. Frühstück, Mittagstisch).
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Erste Zeitkarte erstellen
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Schedule List */}
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    editingSchedule?.id === schedule.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-gray-200'
                  }`}
                >
                  {/* Schedule Header */}
                  <div
                    onClick={() => setEditingSchedule(
                      editingSchedule?.id === schedule.id ? null : schedule
                    )}
                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateSchedule({ ...schedule, isActive: !schedule.isActive });
                        }}
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          schedule.isActive ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${
                            schedule.isActive ? 'left-4' : 'left-0.5'
                          }`}
                        />
                      </button>
                      <div>
                        <h3 className="font-semibold text-gray-900">{schedule.name}</h3>
                        <p className="text-sm text-gray-500">
                          {schedule.startTime} - {schedule.endTime} · {schedule.categoryIds.length} Kategorien
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSchedule(schedule.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          editingSchedule?.id === schedule.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  {editingSchedule?.id === schedule.id && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={schedule.name}
                          onChange={(e) => updateSchedule({ ...schedule, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="z.B. Frühstück"
                        />
                      </div>

                      {/* Time Range */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Von</label>
                          <input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) => updateSchedule({ ...schedule, startTime: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bis</label>
                          <input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) => updateSchedule({ ...schedule, endTime: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Days of Week */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Wochentage</label>
                        <div className="flex gap-1">
                          {DAYS_OF_WEEK.map((day) => (
                            <button
                              key={day.id}
                              onClick={() => toggleDay(schedule, day.id)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                schedule.daysOfWeek.includes(day.id)
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title={day.long}
                            >
                              {day.short}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Categories */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategorien in dieser Zeitkarte
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {categories.map((category) => (
                            <label
                              key={category.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={schedule.categoryIds.includes(category.id)}
                                onChange={() => toggleCategory(schedule, category.id)}
                                className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">{category.name}</span>
                            </label>
                          ))}
                        </div>
                        {categories.length === 0 && (
                          <p className="text-sm text-gray-500 italic">Keine Kategorien vorhanden</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Schedule */}
              {showAddForm ? (
                <div className="border border-dashed border-gray-300 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Vorlage wählen</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {PRESET_SCHEDULES.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => addSchedule(preset)}
                        className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                      >
                        <span className="text-xl">{preset.icon}</span>
                        <div>
                          <span className="block text-sm font-medium text-gray-900">{preset.name}</span>
                          <span className="block text-xs text-gray-500">
                            {preset.startTime} - {preset.endTime}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                      Abbrechen
                    </Button>
                    <Button onClick={() => addSchedule()} className="flex-1">
                      Eigene erstellen
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Zeitkarte hinzufügen
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Speichern
          </Button>
        </div>
      </div>
    </div>
  );
}
