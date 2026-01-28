'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Category, MenuItem, Subscription, RestaurantStats, ScanStats } from '@/types/database';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { SetupWizard } from './SetupWizard';
import { MenuEditor } from './MenuEditor';
import { SandboxMenuEditor } from './SandboxMenuEditor';
import { QRCodeTab } from './QRCodeTab';
import { SettingsTab } from './SettingsTab';
import { SandboxSettingsTab } from './SandboxSettingsTab';
import { RestaurantList } from './RestaurantList';
import { OnboardingChecklist } from '@/components/OnboardingChecklist';
import { MenuView } from '@/app/m/[slug]/MenuView';
import {
  getSandboxData,
  resetSandboxData,
  SandboxData,
} from '@/lib/sandboxStorage';

type Tab = 'restaurants' | 'menu' | 'preview' | 'qr' | 'settings';

const tabConfig: { id: Tab; label: string; shortLabel: string; icon: string }[] = [
  { id: 'restaurants', label: 'Restaurants', shortLabel: 'Home', icon: '🏠' },
  { id: 'menu', label: 'Menü bearbeiten', shortLabel: 'Menü', icon: '📋' },
  { id: 'preview', label: 'Vorschau', shortLabel: 'Vorschau', icon: '👁️' },
  { id: 'qr', label: 'QR-Code', shortLabel: 'QR', icon: '📱' },
  { id: 'settings', label: 'Einstellungen', shortLabel: 'Settings', icon: '⚙️' },
];

// Sandbox mode only shows these tabs
const sandboxTabConfig: { id: Tab; label: string; shortLabel: string; icon: string }[] = [
  { id: 'menu', label: 'Menü bearbeiten', shortLabel: 'Menü', icon: '📋' },
  { id: 'preview', label: 'Vorschau', shortLabel: 'Vorschau', icon: '👁️' },
  { id: 'qr', label: 'QR-Code', shortLabel: 'QR', icon: '📱' },
  { id: 'settings', label: 'Einstellungen', shortLabel: 'Settings', icon: '⚙️' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSandbox, setIsSandbox] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [restaurantStats, setRestaurantStats] = useState<Record<string, RestaurantStats>>({});
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  // Sandbox data state
  const [sandboxData, setSandboxData] = useState<SandboxData | null>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // No user - enter sandbox mode
        setIsSandbox(true);
        loadSandboxData();
        setLoading(false);
        return;
      }

      // User is logged in - normal dashboard mode
      setIsSandbox(false);

      // Load all restaurants for this user
      const { data: restaurantsData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (restaurantsData && restaurantsData.length > 0) {
        setRestaurants(restaurantsData);

        // Load stats for all restaurants
        const statsMap: Record<string, RestaurantStats> = {};
        for (const restaurant of restaurantsData) {
          const { count: categoryCount } = await supabase
            .from('menu_categories')
            .select('*', { count: 'exact', head: true })
            .eq('restaurant_id', restaurant.id);

          // Get all category IDs for this restaurant
          const { data: cats } = await supabase
            .from('menu_categories')
            .select('id')
            .eq('restaurant_id', restaurant.id);

          let itemCount = 0;
          if (cats && cats.length > 0) {
            const catIds = cats.map(c => c.id);
            const { count } = await supabase
              .from('menu_items')
              .select('*', { count: 'exact', head: true })
              .in('category_id', catIds);
            itemCount = count || 0;
          }

          // Try to get scan stats (may fail if table doesn't exist yet)
          let scanStats: ScanStats | undefined;
          try {
            const { data: scanData } = await supabase
              .from('menu_scans')
              .select('scanned_at')
              .eq('restaurant_id', restaurant.id);

            if (scanData) {
              const now = new Date();
              const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
              const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

              scanStats = {
                totalScans: scanData.length,
                scansToday: scanData.filter(s => new Date(s.scanned_at) > oneDayAgo).length,
                scansThisWeek: scanData.filter(s => new Date(s.scanned_at) > oneWeekAgo).length,
                scansThisMonth: scanData.filter(s => new Date(s.scanned_at) > oneMonthAgo).length,
              };
            }
          } catch {
            // Table might not exist yet
          }

          statsMap[restaurant.id] = {
            categoryCount: categoryCount || 0,
            itemCount,
            scanStats,
          };
        }
        setRestaurantStats(statsMap);

        // If no restaurant is selected, select the first one
        if (!selectedRestaurant) {
          await selectRestaurant(restaurantsData[0]);
        } else {
          // Refresh selected restaurant data
          const updated = restaurantsData.find(r => r.id === selectedRestaurant.id);
          if (updated) {
            await selectRestaurant(updated);
          }
        }
        setActiveTab('restaurants');
      } else {
        setRestaurants([]);
        setRestaurantStats({});
      }

      // Load subscription
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (subData) {
        setSubscription(subData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // On error, show sandbox mode
      setIsSandbox(true);
      loadSandboxData();
    } finally {
      setLoading(false);
    }
  };

  const loadSandboxData = () => {
    const data = getSandboxData();
    setSandboxData(data);
    setSelectedRestaurant(data.restaurant);
    setCategories(data.categories);
    setMenuItems(data.menuItems);
  };

  const handleSandboxUpdate = () => {
    loadSandboxData();
  };

  const handleResetSandbox = () => {
    if (!confirm('Alle Änderungen zurücksetzen? Die Demo-Daten werden wiederhergestellt.')) return;
    resetSandboxData();
    loadSandboxData();
  };

  const selectRestaurant = async (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    const supabase = createClient();

    // Load categories
    const { data: categoriesData } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('position');

    if (categoriesData) {
      setCategories(categoriesData);

      // Load menu items
      const categoryIds = categoriesData.map(c => c.id);
      if (categoryIds.length > 0) {
        const { data: itemsData } = await supabase
          .from('menu_items')
          .select('*')
          .in('category_id', categoryIds)
          .order('position');

        if (itemsData) {
          setMenuItems(itemsData);
        } else {
          setMenuItems([]);
        }
      } else {
        setMenuItems([]);
      }
    } else {
      setCategories([]);
      setMenuItems([]);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleSetupComplete = () => {
    setShowSetupWizard(false);
    loadData();
  };

  const handleAddRestaurant = () => {
    setShowSetupWizard(true);
  };

  const handleSelectRestaurant = async (restaurant: Restaurant) => {
    await selectRestaurant(restaurant);
    setActiveTab('menu');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Laden...</p>
        </div>
      </div>
    );
  }

  // Sandbox Mode UI
  if (isSandbox && sandboxData) {
    const currentTabs = sandboxTabConfig;

    return (
      <div className="min-h-screen bg-[#FAFAFA] pb-24 sm:pb-0">
        {/* Header - Sandbox Mode */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                Sandbox
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetSandbox}
                className="text-sm px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Zurücksetzen</span>
              </Button>
              <Link href="/register">
                <Button
                  size="sm"
                  className="text-sm px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  <span className="hidden sm:inline">Kostenlos registrieren</span>
                  <span className="sm:hidden">Registrieren</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Sandbox Info Banner */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-y border-purple-100 px-4 py-2">
            <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-sm text-purple-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>Sandbox-Modus:</strong> Alle Änderungen werden lokal gespeichert.
                <Link href="/register" className="underline ml-1 font-medium hover:text-purple-900">
                  Jetzt kostenlos registrieren
                </Link>
              </span>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block border-t border-gray-100/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <nav className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
                {currentTabs.map((tab) => (
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
            <SandboxMenuEditor onDataChange={handleSandboxUpdate} onUpdate={handleSandboxUpdate} />
          )}

          {activeTab === 'preview' && sandboxData && (
            <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)]">
              {/* Header Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100 flex-shrink-0 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">👁️</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Live-Vorschau</h2>
                      <p className="text-sm text-gray-500">So sehen deine Gäste die Speisekarte</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup with menu preview - centered in remaining space */}
              <div className="flex-1 flex items-start justify-center overflow-hidden">
                <div className="w-full max-w-[400px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl h-full max-h-[700px]">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden h-full overflow-y-auto">
                    <MenuView
                      restaurant={sandboxData.restaurant}
                      categories={sandboxData.categories.sort((a, b) => a.position - b.position)}
                      menuItems={sandboxData.menuItems.sort((a, b) => a.position - b.position)}
                      showWatermark={true}
                      isDemo={true}
                      isEmbedded={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📱</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">QR-Code Vorschau</h2>
                    <p className="text-sm text-gray-500">So wird dein QR-Code aussehen</p>
                  </div>
                </div>
              </div>

              {/* QR Code Preview Mockup */}
              <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
                <div className="flex flex-col items-center">
                  {/* Simulated QR Code */}
                  <div className="relative mb-6">
                    <div className="w-48 h-48 bg-white rounded-2xl shadow-lg p-4 ring-1 ring-gray-100">
                      {/* QR Code Pattern Simulation */}
                      <div className="w-full h-full bg-gray-900 rounded-lg relative overflow-hidden">
                        {/* Simulated QR pattern */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect fill="white" width="100" height="100"/>
                          {/* Corner markers */}
                          <rect fill="black" x="5" y="5" width="25" height="25"/>
                          <rect fill="white" x="8" y="8" width="19" height="19"/>
                          <rect fill="black" x="11" y="11" width="13" height="13"/>

                          <rect fill="black" x="70" y="5" width="25" height="25"/>
                          <rect fill="white" x="73" y="8" width="19" height="19"/>
                          <rect fill="black" x="76" y="11" width="13" height="13"/>

                          <rect fill="black" x="5" y="70" width="25" height="25"/>
                          <rect fill="white" x="8" y="73" width="19" height="19"/>
                          <rect fill="black" x="11" y="76" width="13" height="13"/>

                          {/* Random pattern */}
                          <rect fill="black" x="35" y="5" width="5" height="5"/>
                          <rect fill="black" x="45" y="5" width="5" height="5"/>
                          <rect fill="black" x="55" y="5" width="5" height="5"/>
                          <rect fill="black" x="35" y="15" width="5" height="5"/>
                          <rect fill="black" x="50" y="15" width="5" height="5"/>
                          <rect fill="black" x="60" y="15" width="5" height="5"/>
                          <rect fill="black" x="40" y="25" width="5" height="5"/>
                          <rect fill="black" x="55" y="25" width="5" height="5"/>

                          <rect fill="black" x="5" y="35" width="5" height="5"/>
                          <rect fill="black" x="15" y="35" width="5" height="5"/>
                          <rect fill="black" x="25" y="35" width="5" height="5"/>
                          <rect fill="black" x="35" y="35" width="5" height="5"/>
                          <rect fill="black" x="45" y="35" width="5" height="5"/>
                          <rect fill="black" x="55" y="35" width="5" height="5"/>
                          <rect fill="black" x="65" y="35" width="5" height="5"/>
                          <rect fill="black" x="75" y="35" width="5" height="5"/>
                          <rect fill="black" x="85" y="35" width="5" height="5"/>

                          <rect fill="black" x="10" y="45" width="5" height="5"/>
                          <rect fill="black" x="25" y="45" width="5" height="5"/>
                          <rect fill="black" x="40" y="45" width="5" height="5"/>
                          <rect fill="black" x="50" y="45" width="5" height="5"/>
                          <rect fill="black" x="70" y="45" width="5" height="5"/>
                          <rect fill="black" x="85" y="45" width="5" height="5"/>

                          <rect fill="black" x="5" y="55" width="5" height="5"/>
                          <rect fill="black" x="20" y="55" width="5" height="5"/>
                          <rect fill="black" x="35" y="55" width="5" height="5"/>
                          <rect fill="black" x="45" y="55" width="5" height="5"/>
                          <rect fill="black" x="60" y="55" width="5" height="5"/>
                          <rect fill="black" x="75" y="55" width="5" height="5"/>
                          <rect fill="black" x="90" y="55" width="5" height="5"/>

                          <rect fill="black" x="35" y="70" width="5" height="5"/>
                          <rect fill="black" x="50" y="70" width="5" height="5"/>
                          <rect fill="black" x="60" y="70" width="5" height="5"/>
                          <rect fill="black" x="75" y="70" width="5" height="5"/>
                          <rect fill="black" x="85" y="70" width="5" height="5"/>

                          <rect fill="black" x="40" y="80" width="5" height="5"/>
                          <rect fill="black" x="55" y="80" width="5" height="5"/>
                          <rect fill="black" x="70" y="80" width="5" height="5"/>
                          <rect fill="black" x="80" y="80" width="5" height="5"/>
                          <rect fill="black" x="90" y="80" width="5" height="5"/>

                          <rect fill="black" x="35" y="90" width="5" height="5"/>
                          <rect fill="black" x="45" y="90" width="5" height="5"/>
                          <rect fill="black" x="60" y="90" width="5" height="5"/>
                          <rect fill="black" x="75" y="90" width="5" height="5"/>
                        </svg>
                      </div>
                    </div>
                    {/* Blur overlay for demo */}
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-white/30 rounded-2xl flex items-center justify-center">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">
                        VORSCHAU
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
                    Scanne den QR-Code mit deinem Handy, um deine Speisekarte zu öffnen.
                  </p>

                  {/* Table Stand Preview */}
                  <div className="w-full max-w-xs bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🪧</div>
                      <h4 className="font-semibold text-gray-900 text-sm">Tischaufsteller A6</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Druckfertige PDF mit deinem QR-Code
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Notice */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-purple-900 mb-1">Dein eigener QR-Code</h3>
                    <p className="text-sm text-purple-700 mb-4">
                      Registriere dich kostenlos, um deinen personalisierten QR-Code zu erhalten.
                      Drucke ihn aus und stelle ihn auf deine Tische!
                    </p>
                    <Link href="/register">
                      <Button className="shadow-lg shadow-emerald-500/20">
                        Kostenlos registrieren
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && sandboxData && (
            <SandboxSettingsTab
              restaurant={sandboxData.restaurant}
              onUpdate={handleSandboxUpdate}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom z-30">
          <div className="flex justify-around py-1">
            {currentTabs.map((tab) => (
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
                  {tab.shortLabel}
                </span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  // Show setup wizard for logged in users with no restaurants
  if (showSetupWizard || restaurants.length === 0) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  // Normal logged-in dashboard
  const currentTabs = tabConfig;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 sm:pb-0">
      {/* Header - Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            {subscription && (
              <span className="hidden sm:inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                Pro
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {selectedRestaurant && (
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {selectedRestaurant.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                  {selectedRestaurant.name}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-sm px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Abmelden</span>
            </Button>
          </div>
        </div>

        {/* Desktop Tabs - Modern Style */}
        <div className="hidden sm:block border-t border-gray-100/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
              {currentTabs.map((tab) => (
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
        {/* Onboarding Checklist - Show on restaurants tab */}
        {activeTab === 'restaurants' && selectedRestaurant && (
          <OnboardingChecklist
            restaurantName={selectedRestaurant.name}
            hasCategories={categories.length > 0}
            hasItems={menuItems.length > 0}
            onDismiss={() => {}}
            onNavigate={(tab) => setActiveTab(tab as Tab)}
          />
        )}

        {activeTab === 'restaurants' && (
          <RestaurantList
            restaurants={restaurants}
            restaurantStats={restaurantStats}
            selectedRestaurant={selectedRestaurant}
            onSelect={handleSelectRestaurant}
            onAddNew={handleAddRestaurant}
          />
        )}
        {activeTab === 'menu' && selectedRestaurant && (
          <MenuEditor
            restaurant={selectedRestaurant}
            categories={categories}
            menuItems={menuItems}
            onUpdate={loadData}
          />
        )}
        {activeTab === 'preview' && selectedRestaurant && (
          <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)]">
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100 flex-shrink-0 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">👁️</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Live-Vorschau</h2>
                    <p className="text-sm text-gray-500">So sehen deine Gäste die Speisekarte</p>
                  </div>
                </div>
                <Link
                  href={`/m/${selectedRestaurant.slug}`}
                  target="_blank"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  In neuem Tab öffnen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Phone mockup with menu preview - centered in remaining space */}
            <div className="flex-1 flex items-start justify-center overflow-hidden">
              <div className="w-full max-w-[400px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl h-full max-h-[700px]">
                <div className="bg-white rounded-[2.5rem] overflow-hidden h-full overflow-y-auto">
                  <MenuView
                    restaurant={selectedRestaurant}
                    categories={categories.sort((a, b) => a.position - b.position)}
                    menuItems={menuItems.sort((a, b) => a.position - b.position)}
                    showWatermark={!subscription}
                    isDemo={false}
                    isEmbedded={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'qr' && selectedRestaurant && (
          <QRCodeTab
            restaurant={selectedRestaurant}
            categories={categories}
            menuItems={menuItems}
          />
        )}
        {activeTab === 'settings' && selectedRestaurant && (
          <SettingsTab
            restaurant={selectedRestaurant}
            subscription={subscription}
            onUpdate={loadData}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation - Modern iOS Style */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom z-30">
        <div className="flex justify-around py-1">
          {currentTabs.map((tab) => (
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
                {tab.shortLabel}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
