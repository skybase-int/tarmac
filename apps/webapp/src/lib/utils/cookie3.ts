import { getAnalyticsOptOut } from './analytics-preference';

/**
 * Checks if the user has opted out of Cookie3 analytics
 * @returns true if the user has opted out, false otherwise
 */
export function hasOptedOut(): boolean {
  return getAnalyticsOptOut();
}

/**
 * Dynamically loads the Cookie3 analytics script
 * This should only be called if the user has not opted out
 * @param siteId - The Cookie3 site ID (from environment variable)
 */
export function loadCookie3Script(siteId?: string): void {
  // Check if script is already loaded
  if (document.querySelector('script[src*="cookie3.analytics.min.js"]')) {
    return;
  }

  // Check if the user has opted out
  if (hasOptedOut()) {
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
