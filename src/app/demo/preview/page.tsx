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

  // Refresh sandbox data periodically
  // Since sessionStorage isn't shared between tabs, get data from parent window if available
  useEffect(() => {
    const interval = setInterval(() => {
      // Try to get data from opener window's sessionStorage if available
      if (window.opener && !window.opener.closed) {
        try {
          const openerStorage = window.opener.sessionStorage.getItem('menuapp_sandbox_data');
          if (openerStorage) {
            const parsedData = JSON.parse(openerStorage);
            setSandboxData(parsedData);
          }
        } catch {
          // Fallback to own sessionStorage if cross-window access fails
          const updatedData = getSandboxData();
          setSandboxData(updatedData);
        }
      } else {
        // No opener window, use own sessionStorage
        const updatedData = getSandboxData();
        setSandboxData(updatedData);
      }
    }, 500); // Check twice per second for updates

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
    <MenuView
      restaurant={sandboxData.restaurant}
      categories={sandboxData.categories}
      menuItems={sandboxData.menuItems}
      showWatermark={false}
      isDemo={false}
      isEmbedded={false}
    />
  );
}
