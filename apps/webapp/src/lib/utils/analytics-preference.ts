/**
 * Analytics preference management
 * Uses a separate localStorage key to avoid conflicts with user-settings
 */
const ANALYTICS_OPT_OUT_KEY = 'skyAppAnalyticsOptOut';

/**
 * Gets the current analytics opt-out preference
 * @returns true if user has opted out, false otherwise (default: false - analytics enabled)
 */
export function getAnalyticsOptOut(): boolean {
  try {
    const value = window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY);
    if (value === null) return false; // Default: analytics enabled (opt-out model)
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
