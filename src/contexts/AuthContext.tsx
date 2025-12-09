/**
 * Demo Authentication Context
 *
 * Auto-authenticates demo users - no real login required
 * This is for demonstration purposes only
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEMO_USER, simulateDelay } from '../lib/mockData';

// Simplified types for demo (no Supabase dependency)
interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
}

interface DemoSession {
  access_token: string;
  expires_at: number;
}

interface AuthContextType {
  user: DemoUser | null;
  session: DemoSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  lastActivity: number | null;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [session, setSession] = useState<DemoSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number | null>(null);

  // Auto-login for demo mode
  useEffect(() => {
    const initDemo = async () => {
      // Simulate a brief loading state for realism
      await simulateDelay(800);

      // Auto-authenticate with demo user
      setUser(DEMO_USER);
      setSession({
        access_token: 'demo-token-' + Date.now(),
        expires_at: Date.now() + 86400000, // 24 hours
      });
      setLastActivity(Date.now());
      setLoading(false);

      console.log('Demo mode activated - Welcome to Camp Azur Etoiles!');
    };

    initDemo();
  }, []);

  // Update activity timestamp
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Set up activity listeners
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [user, updateActivity]);

  const signIn = async (_email: string, _password: string) => {
    await simulateDelay(500);
    setUser(DEMO_USER);
    setSession({
      access_token: 'demo-token-' + Date.now(),
      expires_at: Date.now() + 86400000,
    });
    setLastActivity(Date.now());
    return { user: DEMO_USER, session };
  };

  const signUp = async (_email: string, _password: string, _name?: string) => {
    // In demo mode, signup just logs them in
    return signIn(_email, _password);
  };

  const signOut = async () => {
    await simulateDelay(300);
    // In demo mode, signing out just refreshes the demo session
    setUser(DEMO_USER);
    setSession({
      access_token: 'demo-token-' + Date.now(),
      expires_at: Date.now() + 86400000,
    });
    console.log('Demo mode: Sign out simulated - you remain logged in for demo purposes');
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    lastActivity,
    isDemo: true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
