import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_BUSINESS } from '@/lib/mockData';

interface BusinessProfile {
  business_name: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  currency: 'EUR' | 'USD' | 'GBP' | 'CHF' | 'JPY' | 'AUD' | 'CAD' | 'AED';
  timezone: string;
  property_type: 'hotel' | 'resort' | 'vacation_rental' | 'hostel' | 'campsite' | 'other';
}

interface BusinessStore {
  // State
  profile: BusinessProfile | null;
  isSetup: boolean;

  // Actions
  setProfile: (profile: BusinessProfile) => void;
  updateProfile: (updates: Partial<BusinessProfile>) => void;
  clearProfile: () => void;
}

// Pre-configured demo campsite profile
const demoProfile: BusinessProfile = {
  business_name: DEMO_BUSINESS.name,
  location: {
    city: 'Bandol',
    country: 'France',
    latitude: DEMO_BUSINESS.latitude,
    longitude: DEMO_BUSINESS.longitude,
  },
  currency: 'EUR',
  timezone: DEMO_BUSINESS.timezone,
  property_type: 'campsite',
};

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set) => ({
      // Initial state - pre-configured with demo campsite
      profile: demoProfile,
      isSetup: true,

      // Actions
      setProfile: (profile) => set({ profile, isSetup: true }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),

      clearProfile: () => set({ profile: demoProfile, isSetup: true }),
    }),
    {
      name: 'jengu-demo-business-storage',
    }
  )
);
