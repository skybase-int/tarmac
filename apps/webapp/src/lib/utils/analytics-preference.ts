/**
 * Analytics preference management
 */
const ANALYTICS_OPT_OUT_KEY = 'skyAppAnalyticsOptOut';
const BANNER_DISMISSED_KEY = 'skyAppAnalyticsBannerDismissed';

/**
 * Gets the current analytics opt-out preference
 * @returns true if the user has opted out, false otherwise (default: false - analytics enabled)
 */
export function getAnalyticsOptOut(): boolean {
  try {
    const value = window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY);
    if (value === null) return false; // Default: analytics enabled
    return value === 'true';
  } catch (e) {
    console.error('Failed to get analytics preference:', e);
    return false; // Default: analytics enabled on error
  }
}

/**
 * Sets the analytics opt-out preference
 * @param optOut - true to opt out, false to opt in
 */
export function setAnalyticsOptOut(optOut: boolean): void {
  try {
    window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, String(optOut));
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
