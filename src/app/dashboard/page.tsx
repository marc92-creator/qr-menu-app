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
  { id: 'menu', label: 'Menü', shortLabel: 'Menü', icon: '📋' },
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Show setup wizard
  if (showSetupWizard || restaurants.length === 0) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
      {/* Header - Compact on mobile */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="hidden sm:inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {selectedRestaurant && (
              <span className="text-sm text-gray-600 truncate max-w-[120px] sm:max-w-none hidden sm:block">
                {selectedRestaurant.name}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-sm px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Abmelden</span>
              <span className="sm:hidden">Logout</span>
            </Button>
          </div>
        </div>

        {/* Desktop Tabs - Hidden on mobile */}
        <div className="hidden sm:block border-t border-gray-100">
          <div className="px-4">
            <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 sm:py-6">
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

      {/* Mobile Bottom Navigation - Fixed */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-30">
        <div className="flex justify-around">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center py-2 px-1 min-h-[56px]
                transition-colors touch-manipulation
                ${activeTab === tab.id
                  ? 'text-emerald-600'
                  : 'text-gray-500 active:text-gray-700'
                }
              `}
            >
              <span className="text-xl mb-0.5">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.shortLabel}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
