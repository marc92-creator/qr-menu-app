'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { SandboxMenuEditor } from '@/app/dashboard/SandboxMenuEditor';
import { SandboxSettingsTab } from '@/app/dashboard/SandboxSettingsTab';
import { AnalyticsTab } from '@/app/dashboard/AnalyticsTab';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { getSandboxData } from '@/lib/sandboxStorage';
import { DEMO_RESTAURANT } from '@/lib/demoData';
import { MenuView } from '@/app/m/[slug]/MenuView';

type Tab = 'menu' | 'qr' | 'preview' | 'analytics' | 'settings';

export default function DemoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [sandboxData, setSandboxData] = useState(() => getSandboxData());
  const [sandboxRestaurant, setSandboxRestaurant] = useState(() => getSandboxData().restaurant);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if user is already logged in and clear sandbox data on fresh page load
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // User is logged in, redirect to dashboard
        router.push('/dashboard');
        return;
      }

      // Clear sandbox data on page load/refresh to prevent persistence
      // Check if this is a fresh page load (not a navigation within the app)
      if (typeof window !== 'undefined' && window.performance) {
        const navType = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navType && navType.type === 'reload') {
          // Page was refreshed - clear sandbox data
          sessionStorage.removeItem('menuapp_sandbox_data');
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  // Refresh sandbox data when switching to preview tab
  useEffect(() => {
    if (activeTab === 'preview') {
      const updatedData = getSandboxData();
      setSandboxData(updatedData);
      setSandboxRestaurant(updatedData.restaurant);
    }
  }, [activeTab]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Laden...</p>
        </div>
      </div>
    );
  }

  const handleRestaurantUpdate = () => {
    // Reload sandbox data after settings update
    const updatedData = getSandboxData();
    setSandboxData(updatedData);
    setSandboxRestaurant(updatedData.restaurant);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 sm:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo />
            </Link>
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Sandbox
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Anmelden
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-sm shadow-lg shadow-emerald-500/20">
                Registrieren
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-100/50 hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
              {[
                { id: 'menu' as Tab, label: 'Menü bearbeiten', icon: '📋' },
                { id: 'preview' as Tab, label: 'Vorschau', icon: '👁️' },
                { id: 'qr' as Tab, label: 'QR-Code', icon: '📱' },
                { id: 'analytics' as Tab, label: 'Statistiken', icon: '📊' },
                { id: 'settings' as Tab, label: 'Einstellungen', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 py-4 font-medium text-sm whitespace-nowrap transition-all duration-200
                    ${activeTab === tab.id
                      ? 'text-emerald-600'
                      : 'text-gray-500 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'menu' && (
          <SandboxMenuEditor />
        )}

        {activeTab === 'preview' && (
          <>
            {/* Fullscreen overlay */}
            {isFullscreen && (
              <div className="fixed inset-0 z-50 bg-white">
                {/* Close button */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-black/80 transition-colors"
                  title="Vollbild beenden"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Fullscreen menu view */}
                <div className="h-full overflow-y-auto">
                  <MenuView
                    restaurant={sandboxRestaurant}
                    categories={sandboxData.categories.sort((a, b) => a.position - b.position)}
                    menuItems={sandboxData.menuItems.sort((a, b) => a.position - b.position)}
                    showWatermark={false}
                    isDemo={true}
                    isEmbedded={false}
                  />
                </div>
              </div>
            )}

            <div className="max-w-2xl mx-auto">
              {/* Info Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live-Vorschau (Sandbox)
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  Vollbild öffnen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              {/* Responsive Menu View - wie Gäste es sehen */}
              <div className="relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-x-hidden overflow-y-auto max-h-[calc(100vh-200px)]">
                <MenuView
                  restaurant={sandboxRestaurant}
                  categories={sandboxData.categories.sort((a, b) => a.position - b.position)}
                  menuItems={sandboxData.menuItems.sort((a, b) => a.position - b.position)}
                  showWatermark={false}
                  isDemo={true}
                  isEmbedded={true}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'qr' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">QR-Code</h2>
                <p className="text-gray-500 text-sm">
                  So sieht dein QR-Code aus - Gäste scannen ihn, um dein Menü zu sehen.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl mb-6">
                <p className="text-sm text-purple-700">
                  <strong>Demo-QR-Code:</strong> Dieser Code führt zur öffentlichen Demo-Seite.
                  Registriere dich, um deinen eigenen QR-Code zu erhalten!
                </p>
              </div>

              <QRCodeGenerator
                slug="demo-doener-palace"
                restaurantName="Demo Döner Palace"
                size={256}
              />

              <div className="mt-6">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20"
                >
                  Eigenen QR-Code erstellen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab restaurant={DEMO_RESTAURANT} isSandboxMode={true} />
        )}

        {activeTab === 'settings' && (
          <SandboxSettingsTab
            restaurant={sandboxRestaurant}
            onUpdate={handleRestaurantUpdate}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom z-30">
        <div className="flex justify-around py-1">
          {[
            { id: 'menu' as Tab, label: 'Menü', icon: '📋' },
            { id: 'preview' as Tab, label: 'Vorschau', icon: '👁️' },
            { id: 'qr' as Tab, label: 'QR', icon: '📱' },
            { id: 'analytics' as Tab, label: 'Stats', icon: '📊' },
            { id: 'settings' as Tab, label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center py-2 px-1 min-h-[60px]
                transition-all duration-200 touch-manipulation
                ${activeTab === tab.id
                  ? 'text-emerald-600'
                  : 'text-gray-400 active:text-gray-600'
                }
              `}
            >
              <span className={`text-2xl mb-1 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-[11px] font-medium ${activeTab === tab.id ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
