/**
 * Supabase Client Stub for Demo Mode
 *
 * This is a mock implementation that doesn't connect to any real Supabase instance.
 * All auth operations are simulated for demonstration purposes.
 */

import { DEMO_USER, simulateDelay } from './mockData';

// Mock Supabase client that does nothing
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signUp: async () => ({ data: { user: DEMO_USER, session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: DEMO_USER, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    signInWithOAuth: async () => ({ data: {}, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    resetPasswordForEmail: async () => ({ data: {}, error: null }),
    updateUser: async () => ({ data: { user: DEMO_USER }, error: null }),
  },
};

/**
 * Get the current user's session - DEMO VERSION
 */
export async function getSession() {
  await simulateDelay(100);
  return {
    access_token: 'demo-token-' + Date.now(),
    expires_at: Date.now() + 86400000,
    user: DEMO_USER,
  };
}

/**
 * Get the current authenticated user - DEMO VERSION
 */
export async function getCurrentUser() {
  await simulateDelay(100);
  return DEMO_USER;
}

/**
 * Sign up a new user - DEMO VERSION
 */
export async function signUp(_email: string, _password: string, _name?: string) {
  await simulateDelay(500);
  return {
    user: DEMO_USER,
    session: {
      access_token: 'demo-token-' + Date.now(),
      expires_at: Date.now() + 86400000,
    },
  };
}

/**
 * Sign in with email and password - DEMO VERSION
 */
export async function signIn(_email: string, _password: string) {
  await simulateDelay(500);
  return {
    user: DEMO_USER,
    session: {
      access_token: 'demo-token-' + Date.now(),
      expires_at: Date.now() + 86400000,
    },
  };
}

/**
 * Sign out the current user - DEMO VERSION
 */
export async function signOut() {
  await simulateDelay(200);
  console.log('Demo: Sign out simulated');
}

/**
 * Get the current user's access token - DEMO VERSION
 */
export async function getAccessToken() {
  return 'demo-access-token-' + Date.now();
}

/**
 * Sign in with Google OAuth - DEMO VERSION
 */
export async function signInWithGoogle() {
  await simulateDelay(300);
  console.log('Demo: Google OAuth not available in demo mode');
  return {};
}

/**
 * Subscribe to auth state changes - DEMO VERSION
 */
export function onAuthStateChange(_callback: (event: string, session: any) => void) {
  // In demo mode, we don't need to listen for auth changes
  return { data: { subscription: { unsubscribe: () => {} } } };
}

/**
 * Request password reset email - DEMO VERSION
 */
export async function resetPasswordForEmail(_email: string) {
  await simulateDelay(300);
  console.log('Demo: Password reset not available in demo mode');
  return {};
}

/**
 * Update user password - DEMO VERSION
 */
export async function updatePassword(_newPassword: string) {
  await simulateDelay(300);
  console.log('Demo: Password update not available in demo mode');
  return { user: DEMO_USER };
}

export default supabase;
