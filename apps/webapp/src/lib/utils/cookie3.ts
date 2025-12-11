import { getAnalyticsEnabled } from './analytics-preference';

/**
 * Checks if analytics is enabled
 * @returns true if analytics is enabled, false otherwise
 */
export function isAnalyticsEnabled(): boolean {
  return getAnalyticsEnabled();
}

/**
 * Dynamically loads the Cookie3 analytics script
 * This should only be called if analytics is enabled
 * @param siteId - The Cookie3 site ID (from environment variable)
 */
export function loadCookie3Script(siteId?: string): void {
  // Check if script is already loaded
  if (document.querySelector('script[src*="cookie3.analytics.min.js"]')) {
    return;
  }

  // Check if analytics is enabled
  if (!isAnalyticsEnabled()) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.markfi.xyz/scripts/analytics/0.11.24/cookie3.analytics.min.js';
  script.integrity = 'sha384-ihnQ09PGDbDPthGB3QoQ2Heg2RwQIDyWkHkqxMzq91RPeP8OmydAZbQLgAakAOfI';
  script.crossOrigin = 'anonymous';
  script.async = true;

  // Set site-id if provided
  if (siteId) {
    script.setAttribute('site-id', siteId);
  } else {
    // Try to get from environment variable
    const envSiteId = import.meta.env.VITE_COOKIE3_SITE_ID;
    if (envSiteId) {
      script.setAttribute('site-id', envSiteId);
    }
  }

  document.head.appendChild(script);
}

/**
 * Load cookie3 script on module load if analytics is enabled
 * This ensures the script loads on page reloads without requiring React component lifecycle
 */
if (typeof window !== 'undefined') {
  // Use DOMContentLoaded to ensure DOM is ready, but also check immediately
  // in case DOM is already loaded (e.g., on page reload)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (isAnalyticsEnabled()) {
        loadCookie3Script();
      }
    });
  } else {
    // DOM is already loaded, check and load immediately
    if (isAnalyticsEnabled()) {
      loadCookie3Script();
    }
  }
}
