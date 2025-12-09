import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { queryClient } from './lib/query/queryClient';
import { ToastContainer } from './components/ui/Toast';
import { BackgroundJobsBanner } from './components/layout/BackgroundJobsBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DemoBanner } from './components/DemoBanner';
import { MobileBlocker } from './components/MobileBlocker';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Data = lazy(() => import('./pages/Data').then((m) => ({ default: m.Data })));
const PricingEngine = lazy(() =>
  import('./pages/PricingEngine').then((m) => ({ default: m.PricingEngine }))
);
const Assistant = lazy(() => import('./pages/Assistant').then((m) => ({ default: m.Assistant })));
const CompetitorMonitor = lazy(() =>
  import('./pages/CompetitorMonitor').then((m) => ({ default: m.CompetitorMonitor }))
);
const MonitoredCompetitors = lazy(() =>
  import('./pages/MonitoredCompetitors').then((m) => ({ default: m.MonitoredCompetitors }))
);
const Settings = lazy(() => import('./pages/Settings').then((m) => ({ default: m.Settings })));

// New unified Analytics page (combines Insights + Director)
const Analytics = lazy(() => import('./pages/Analytics').then((m) => ({ default: m.Analytics })));

// Pricing Calendar Demo
const PricingCalendarDemo = lazy(() =>
  import('./pages/PricingCalendarDemo').then((m) => ({ default: m.PricingCalendarDemo }))
);

// Demo wrapper - auto-authenticated, no login needed
function DemoRoute({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  // In demo mode, users are always authenticated
  return <>{children}</>;
}

// Loading component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🏕️</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-700">Camp Azur Etoiles</p>
        <p className="animate-pulse text-sm text-slate-500">Loading demo...</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <MobileBlocker />
            <ToastContainer />
            <DemoBanner />
            <BackgroundJobsBanner />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* All routes are accessible in demo mode - redirect login to dashboard */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/signup" element={<Navigate to="/" replace />} />

                {/* Demo routes - always accessible */}
                <Route
                  path="/"
                  element={
                    <DemoRoute>
                      <Layout />
                    </DemoRoute>
                  }
                >
                  {/* Root redirect to dashboard */}
                  <Route index element={<Dashboard />} />

                  {/* Primary Routes (New IA) */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="home" element={<Navigate to="/" replace />} />

                  {/* Analytics Section */}
                  <Route path="analytics" element={<Analytics />} />

                  {/* Pricing Section */}
                  <Route path="pricing">
                    <Route path="optimizer" element={<PricingEngine />} />
                    <Route path="competitors" element={<CompetitorMonitor />} />
                    <Route path="competitors/monitored" element={<MonitoredCompetitors />} />
                    <Route path="calendar" element={<PricingCalendarDemo />} />
                    <Route index element={<Navigate to="/pricing/optimizer" replace />} />
                  </Route>

                  {/* Data Section */}
                  <Route path="data-sources" element={<Data />} />

                  {/* Tools Section */}
                  <Route path="tools">
                    <Route path="assistant" element={<Assistant />} />
                    <Route path="settings" element={<Settings />} />
                    <Route index element={<Navigate to="/tools/assistant" replace />} />
                  </Route>

                  {/* Legacy Routes (Redirects for backwards compatibility) */}
                  <Route path="data" element={<Navigate to="/data-sources" replace />} />
                  <Route
                    path="pricing-engine"
                    element={<Navigate to="/pricing/optimizer" replace />}
                  />
                  <Route
                    path="competitor-monitor"
                    element={<Navigate to="/pricing/competitors" replace />}
                  />
                  <Route path="insights" element={<Navigate to="/analytics" replace />} />
                  <Route
                    path="director"
                    element={<Navigate to="/analytics?view=advanced" replace />}
                  />
                  <Route path="assistant" element={<Navigate to="/tools/assistant" replace />} />
                  <Route path="settings" element={<Navigate to="/tools/settings" replace />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
