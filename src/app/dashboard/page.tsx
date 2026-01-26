'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Restaurant, Category, MenuItem, Subscription } from '@/types/database';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { SetupWizard } from './SetupWizard';
import { MenuEditor } from './MenuEditor';
import { QRCodeTab } from './QRCodeTab';
import { SettingsTab } from './SettingsTab';
import { RestaurantList } from './RestaurantList';

type Tab = 'restaurants' | 'menu' | 'qr' | 'settings';

const tabConfig: { id: Tab; label: string; shortLabel: string; icon: string }[] = [
  { id: 'restaurants', label: 'Restaurants', shortLabel: 'Home', icon: '🏠' },
  { id: 'menu', label: 'Menü bearbeiten', shortLabel: 'Menü', icon: '📋' },
  { id: 'qr', label: 'QR-Code', shortLabel: 'QR', icon: '📱' },
  { id: 'settings', label: 'Einstellungen', shortLabel: 'Settings', icon: '⚙️' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('restaurants');
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Load all restaurants for this user
    const { data: restaurantsData } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (restaurantsData && restaurantsData.length > 0) {
      setRestaurants(restaurantsData);

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
    } else {
      setRestaurants([]);
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

    setLoading(false);
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

  // Show setup wizard
  if (showSetupWizard || restaurants.length === 0) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 sm:pb-0">
      {/* Header - Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Beta
            </span>
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
              {tabConfig.map((tab) => (
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
        {activeTab === 'restaurants' && (
          <RestaurantList
            restaurants={restaurants}
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
        {activeTab === 'qr' && selectedRestaurant && (
          <QRCodeTab restaurant={selectedRestaurant} />
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
          {tabConfig.map((tab) => (
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
