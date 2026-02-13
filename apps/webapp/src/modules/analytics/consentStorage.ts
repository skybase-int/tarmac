const CONSENT_STORAGE_KEY = 'cookie_consent';

export type ServiceConsent = { posthog: boolean };

/**
 * Check for a PostHog cross-domain cookie set on `.sky.money`.
 * If found, the user already consented on another subdomain (e.g. marketing site).
 */
export function hasPostHogCrossDomainCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some(c => c.trim().startsWith('ph_') && c.includes('_posthog'));
}

/**
 * Read consent from localStorage.
 * Returns null when no consent has been recorded (pending state).
 */
export function getStoredConsent(): ServiceConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ServiceConsent;
  } catch {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

export function saveConsent(consent: ServiceConsent): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}
