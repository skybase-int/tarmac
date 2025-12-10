/**
 * Analytics preference management
 */
const ANALYTICS_ENABLED_KEY = 'skyAppAnalyticsEnabled';
const BANNER_DISMISSED_KEY = 'skyAppAnalyticsBannerDismissed';

/**
 * Gets the current analytics preference
 * @returns true if analytics is enabled, false otherwise
 */
export function getAnalyticsEnabled(): boolean {
  try {
    const value = window.localStorage.getItem(ANALYTICS_ENABLED_KEY);
    if (value === null) return false;

    // Check localStorage preference
    if (value !== 'true') return false;

    // Also check cookie3 consent if available
    if (window.cookie3?.isTrackingConsentGiven) {
      return window.cookie3.isTrackingConsentGiven() === true;
    }

    // Fallback to localStorage-only if cookie3 is not available
    return true;
  } catch (e) {
    console.error('Failed to get analytics preference:', e);
    return false;
  }
}

/**
 * Sets the analytics preference
 * @param enabled - true to enable analytics, false to disable
 */
export function setAnalyticsEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(ANALYTICS_ENABLED_KEY, String(enabled));
    if (window.cookie3) {
      if (enabled) {
        window.cookie3.setTrackingConsentGiven();
      } else {
        window.cookie3.forgetTrackingConsentGiven();
      }
    }
  } catch (e) {
    console.error('Failed to save analytics preference:', e);
  }
}

/**
 * Checks if the banner has been dismissed
 * @returns true if the banner has been dismissed, false otherwise
 */
export function isBannerDismissed(): boolean {
  try {
    const value = window.localStorage.getItem(BANNER_DISMISSED_KEY);
    return value === 'true';
  } catch (e) {
    console.error('Failed to check banner state:', e);
    return false;
  }
}

/**
 * Marks the banner as dismissed
 */
export function setBannerDismissed(): void {
  try {
    window.localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  } catch (e) {
    console.error('Failed to save banner state:', e);
  }
}
