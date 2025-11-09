import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from './LoadingSpinner';
import type { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        // Verify user is in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .single();
        
        setIsAdmin(!!data && !error);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        
        // Defer admin check to avoid potential deadlock
        if (session?.user) {
          setTimeout(async () => {
            const { data } = await supabase
              .from('admin_users')
              .select('user_id')
              .eq('user_id', session.user.id)
              .single();
            setIsAdmin(!!data);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
