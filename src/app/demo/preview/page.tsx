'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getSandboxData } from '@/lib/sandboxStorage';
import { MenuView } from '@/app/m/[slug]/MenuView';

export default function SandboxPreviewPage() {
  const router = useRouter();
  const [sandboxData, setSandboxData] = useState(() => getSandboxData());
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // User is logged in, redirect to their dashboard
        router.push('/dashboard');
        return;
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  // Refresh sandbox data periodically to catch updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = getSandboxData();
      setSandboxData(updatedData);
    }, 1000); // Check every second for updates

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen">
      {/* Floating Info Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">👁️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Sandbox Vollbild-Vorschau</p>
              <p className="text-xs opacity-90">Live-Ansicht deiner Änderungen</p>
            </div>
            <button
              onClick={() => router.back()}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full MenuView */}
      <MenuView
        restaurant={sandboxData.restaurant}
        categories={sandboxData.categories}
        menuItems={sandboxData.menuItems}
        showWatermark={false}
        isDemo={false}
        isEmbedded={false}
      />
    </div>
  );
}
