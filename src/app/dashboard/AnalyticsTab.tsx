'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, ScanStats } from '@/types/database';

interface AnalyticsTabProps {
  restaurant: Restaurant;
  isSandboxMode?: boolean;
}

interface DailyStats {
  date: string;
  count: number;
}

// Demo data for sandbox mode
const DEMO_STATS: ScanStats = {
  scansToday: 12,
  scansThisWeek: 87,
  scansThisMonth: 342,
  totalScans: 1247,
};

function generateDemoDailyStats(): DailyStats[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const demoData = [23, 45, 31, 67, 52, 38, 12]; // Last 7 days of demo data

  return demoData.map((count, i) => {
    const date = new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
    return {
      date: date.toISOString().split('T')[0],
      count,
    };
  });
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsTab({ restaurant, isSandboxMode = false }: AnalyticsTabProps) {
  const [stats, setStats] = useState<ScanStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSandboxMode) {
      // Use demo data for sandbox mode
      setStats(DEMO_STATS);
      setDailyStats(generateDemoDailyStats());
      setLoading(false);
    } else {
      loadStats();
    }
  }, [restaurant.id, isSandboxMode]);

  const loadStats = async () => {
    const supabase = createClient();

    // Get all scans for this restaurant
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

    // Calculate stats
    const totalScans = scans.length;
    const scansToday = scans.filter(s => new Date(s.scanned_at) >= today).length;
    const scansThisWeek = scans.filter(s => new Date(s.scanned_at) >= weekAgo).length;
    const scansThisMonth = scans.filter(s => new Date(s.scanned_at) >= monthAgo).length;

    setStats({ totalScans, scansToday, scansThisWeek, scansThisMonth });

    // Calculate daily stats for chart
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
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-24" />
            ))}
          </div>
          <div className="bg-gray-100 rounded-2xl h-64" />
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
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-amber-900">Beispiel-Statistiken</h3>
              <p className="text-amber-700 text-sm mt-1">
                Das sind Demo-Daten. Nach der Registrierung siehst du hier echte Statistiken
                von deinen Gästen, die deine Speisekarte aufrufen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Heute" value={stats?.scansToday || 0} icon="📊" />
        <StatCard title="Diese Woche" value={stats?.scansThisWeek || 0} icon="📈" />
        <StatCard title="Dieser Monat" value={stats?.scansThisMonth || 0} icon="📅" />
        <StatCard title="Gesamt" value={stats?.totalScans || 0} icon="🎯" />
      </div>

      {/* Simple Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Aufrufe der letzten 7 Tage</h3>
        <div className="flex items-end gap-2 h-40">
          {dailyStats.map(day => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500">{day.count}</span>
              <div
                className="w-full bg-emerald-500 rounded-t transition-all"
                style={{
                  height: `${(day.count / maxCount) * 100}%`,
                  minHeight: day.count > 0 ? '4px' : '0'
                }}
              />
              <span className="text-xs text-gray-400">
                {new Date(day.date).toLocaleDateString('de-DE', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
          <span>💡</span> Tipp
        </h3>
        <p className="text-emerald-700 text-sm">
          Platziere deinen QR-Code gut sichtbar auf jedem Tisch und an der Eingangstür.
          Mehr Scans bedeuten, dass mehr Gäste deine digitale Speisekarte nutzen!
        </p>
      </div>
    </div>
  );
}
