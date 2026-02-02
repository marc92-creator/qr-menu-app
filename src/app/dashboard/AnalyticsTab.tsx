'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, ScanStats } from '@/types/database';
import {
  Calendar,
  BarChart3,
  CalendarDays,
  Flame,
  TrendingUp,
  Sparkles,
  Globe,
  Lightbulb,
} from 'lucide-react';

interface AnalyticsTabProps {
  restaurant: Restaurant;
  isSandboxMode?: boolean;
}

interface DailyStats {
  date: string;
  count: number;
}

interface LanguageStats {
  de: number;
  en: number;
}

// Demo data for sandbox mode
const DEMO_STATS: ScanStats = {
  today: 12,
  thisWeek: 87,
  thisMonth: 342,
  total: 1247,
};

const DEMO_LANGUAGE_STATS: LanguageStats = {
  de: 73,
  en: 27,
};

const DEMO_POPULAR_TIMES = [
  { label: '12:00 - 14:00', percent: 42 },
  { label: '18:00 - 21:00', percent: 38 },
  { label: 'Andere', percent: 20 },
];

function generateDemoDailyStats(): DailyStats[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const demoData = [23, 45, 31, 67, 52, 38, 12];

  return demoData.map((count, i) => {
    const date = new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
    return {
      date: date.toISOString().split('T')[0],
      count,
    };
  });
}

export function AnalyticsTab({ restaurant, isSandboxMode = false }: AnalyticsTabProps) {
  const [stats, setStats] = useState<ScanStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats>({ de: 100, en: 0 });
  const [popularTimes, setPopularTimes] = useState(DEMO_POPULAR_TIMES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSandboxMode) {
      setStats(DEMO_STATS);
      setDailyStats(generateDemoDailyStats());
      setLanguageStats(DEMO_LANGUAGE_STATS);
      setPopularTimes(DEMO_POPULAR_TIMES);
      setLoading(false);
    } else {
      loadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant.id, isSandboxMode]);

  const loadStats = async () => {
    const supabase = createClient();

    const { data: scans } = await supabase
      .from('menu_scans')
      .select('scanned_at, language')
      .eq('restaurant_id', restaurant.id)
      .order('scanned_at', { ascending: false });

    if (!scans) {
      setLoading(false);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalScans = scans.length;
    const scansToday = scans.filter(s => new Date(s.scanned_at) >= today).length;
    const scansThisWeek = scans.filter(s => new Date(s.scanned_at) >= weekAgo).length;
    const scansThisMonth = scans.filter(s => new Date(s.scanned_at) >= monthAgo).length;

    setStats({ total: totalScans, today: scansToday, thisWeek: scansThisWeek, thisMonth: scansThisMonth });

    // Calculate daily stats
    const dailyMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const key = date.toISOString().split('T')[0];
      dailyMap.set(key, 0);
    }

    scans.forEach(scan => {
      const key = new Date(scan.scanned_at).toISOString().split('T')[0];
      if (dailyMap.has(key)) {
        dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
      }
    });

    setDailyStats(Array.from(dailyMap.entries()).map(([date, count]) => ({ date, count })));

    // Calculate language stats
    const langCounts = { de: 0, en: 0 };
    scans.forEach(scan => {
      if (scan.language === 'en') langCounts.en++;
      else langCounts.de++;
    });
    const total = langCounts.de + langCounts.en;
    if (total > 0) {
      setLanguageStats({
        de: Math.round((langCounts.de / total) * 100),
        en: Math.round((langCounts.en / total) * 100),
      });
    }

    // Calculate popular times
    const timeSlots = { lunch: 0, dinner: 0, other: 0 };
    scans.forEach(scan => {
      const hour = new Date(scan.scanned_at).getHours();
      if (hour >= 12 && hour < 14) timeSlots.lunch++;
      else if (hour >= 18 && hour < 21) timeSlots.dinner++;
      else timeSlots.other++;
    });
    const timeTotal = timeSlots.lunch + timeSlots.dinner + timeSlots.other;
    if (timeTotal > 0) {
      setPopularTimes([
        { label: '12:00 - 14:00', percent: Math.round((timeSlots.lunch / timeTotal) * 100) },
        { label: '18:00 - 21:00', percent: Math.round((timeSlots.dinner / timeTotal) * 100) },
        { label: 'Andere', percent: Math.round((timeSlots.other / timeTotal) * 100) },
      ]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-32" />
            ))}
          </div>
          <div className="bg-gray-200 rounded-2xl h-72" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-2xl h-48" />
            <div className="bg-gray-200 rounded-2xl h-48" />
          </div>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...dailyStats.map(d => d.count), 1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Statistiken</h1>
        <p className="text-gray-500 mt-1">Wie oft wird deine Speisekarte aufgerufen?</p>
      </div>

      {/* Demo Banner for Sandbox Mode */}
      {isSandboxMode && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 rounded-xl p-3 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800">Beispiel-Statistiken</h3>
              <p className="text-amber-700 text-sm mt-1">
                Das sind Demo-Daten. Nach der Registrierung siehst du hier echte Statistiken
                von deinen Gästen, die deine Speisekarte aufrufen.
              </p>
              <Link href="/register">
                <button className="mt-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Jetzt kostenlos starten →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Modern Gradient Design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heute */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Heute</p>
              <p className="text-3xl font-bold mt-1">{stats?.today || 0}</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          {isSandboxMode && (
            <div className="mt-3 flex items-center text-blue-100 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% vs. gestern</span>
            </div>
          )}
        </div>

        {/* Diese Woche */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Diese Woche</p>
              <p className="text-3xl font-bold mt-1">{stats?.thisWeek || 0}</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dieser Monat */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Dieser Monat</p>
              <p className="text-3xl font-bold mt-1">{stats?.thisMonth || 0}</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <CalendarDays className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Gesamt */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Gesamt</p>
              <p className="text-3xl font-bold mt-1">{stats?.total || 0}</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <Flame className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart - Professional Design */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Aufrufe der letzten 7 Tage</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span>Aufrufe</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 h-48">
          {dailyStats.map((day, index) => {
            const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
            const isToday = index === dailyStats.length - 1;

            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Value */}
                <span className={`text-sm font-semibold transition-colors ${isToday ? 'text-emerald-600' : 'text-gray-600 group-hover:text-emerald-600'}`}>
                  {day.count}
                </span>

                {/* Bar Container */}
                <div className="w-full bg-gray-100 rounded-lg relative" style={{ height: '140px' }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 group-hover:opacity-90 ${
                      isToday
                        ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                        : 'bg-gradient-to-t from-emerald-400 to-emerald-300'
                    }`}
                    style={{ height: `${Math.max(height, day.count > 0 ? 5 : 0)}%` }}
                  />
                </div>

                {/* Day Label */}
                <span className={`text-xs font-medium transition-colors ${isToday ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {new Date(day.date).toLocaleDateString('de-DE', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language & Popular Times - Two Column Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Language Stats - Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Sprachen</h3>
          </div>

          <div className="flex items-center gap-6">
            {/* Donut Chart with CSS */}
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-28 h-28 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                {/* German segment */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${languageStats.de} ${100 - languageStats.de}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">{languageStats.de}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></span>
                <span className="text-gray-600 text-sm">Deutsch</span>
                <span className="font-semibold ml-auto text-gray-800">{languageStats.de}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-gray-600 text-sm">English</span>
                <span className="font-semibold ml-auto text-gray-800">{languageStats.en}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Times - Progress Bars */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Beliebte Zeiten</h3>

          <div className="space-y-4">
            {popularTimes.map((time, index) => (
              <div key={time.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{time.label}</span>
                  <span className="font-semibold text-gray-800">{time.percent}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === 0
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                        : index === 1
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                        : 'bg-gray-300'
                    }`}
                    style={{ width: `${time.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 rounded-xl p-3 flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900">Tipp</h3>
            <p className="text-emerald-700 text-sm mt-1">
              Platziere deinen QR-Code gut sichtbar auf jedem Tisch und an der Eingangstür.
              Mehr Scans bedeuten, dass mehr Gäste deine digitale Speisekarte nutzen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
