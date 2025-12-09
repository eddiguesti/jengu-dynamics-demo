/**
 * Sentry Stub for Demo Mode
 *
 * No-op implementation - Sentry is disabled in demo mode
 */

// Mock Sentry object for demo mode
export const Sentry = {
  init: () => {},
  captureException: () => {},
  captureMessage: () => {},
  setUser: () => {},
  setContext: () => {},
  setTag: () => {},
  withScope: (callback: (scope: any) => void) => callback({}),
  configureScope: () => {},
  addBreadcrumb: () => {},
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
};

/**
 * Initialize Sentry - NO-OP in demo mode
 */
export function initSentry(): void {
  console.log('Demo mode: Sentry error tracking disabled');
}
