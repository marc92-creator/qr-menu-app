'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export interface SandboxModeResult {
  isSandbox: boolean;
  isLoading: boolean;
  user: User | null;
}

/**
 * Hook to check if the user is in sandbox mode (not authenticated)
 * Returns isSandbox: true when user is not logged in
 */
export function useSandboxMode(): SandboxModeResult {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isSandbox: !user && !isLoading,
    isLoading,
    user,
  };
}
