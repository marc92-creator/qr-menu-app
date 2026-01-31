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

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // User is logged in, redirect to dashboard
        router.push('/dashboard');
        return;
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
        <div className="border-t border-gray-100/50">
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
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Live-Vorschau</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      So sieht dein Menü für deine Gäste aus. Alle Änderungen werden hier in Echtzeit angezeigt.
                    </p>
                    <p className="text-xs text-purple-700 bg-white/50 rounded-lg px-3 py-2 inline-block">
                      <strong>Sandbox-Modus:</strong> Deine Änderungen werden nur in diesem Browser gespeichert und gehen beim Schließen verloren. Registriere dich, um dein Menü dauerhaft zu veröffentlichen!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Preview */}
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-gray-200">
                {/* Phone mockup bezel */}
                <div className="bg-gray-900 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                    <div className="w-20 h-1.5 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-gray-600 rounded-sm"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                {/* Menu Preview */}
                <div className="h-[600px] overflow-auto">
                  <MenuView
                    restaurant={sandboxRestaurant}
                    categories={sandboxData.categories}
                    menuItems={sandboxData.menuItems}
                    showWatermark={false}
                    isDemo={false}
                    isEmbedded={true}
                  />
                </div>
              </div>

              {/* Stats below preview */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100">
                  <div className="text-2xl font-bold text-emerald-600">{sandboxData.categories.length}</div>
                  <div className="text-sm text-gray-500">Kategorien</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100">
                  <div className="text-2xl font-bold text-emerald-600">{sandboxData.menuItems.length}</div>
                  <div className="text-sm text-gray-500">Gerichte</div>
                </div>
              </div>
            </div>
          </div>
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
