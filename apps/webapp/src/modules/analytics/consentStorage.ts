const CONSENT_STORAGE_KEY = 'cookie_consent';
const CONSENT_STORAGE_KEY_V2 = 'cookie_consent_v2';

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
 * Falls back to migrating the legacy v1 string key if v2 is absent.
 * Returns null when no consent has been recorded (pending state).
 */
export function getStoredConsent(): ServiceConsent | null {
  if (typeof window === 'undefined') return null;

  const v2 = localStorage.getItem(CONSENT_STORAGE_KEY_V2);
  if (v2) {
    try {
      return JSON.parse(v2) as ServiceConsent;
    } catch {
      localStorage.removeItem(CONSENT_STORAGE_KEY_V2);
      return null;
    }
  }

  // Migrate v1 → v2
  const v1 = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (v1 === 'accepted' || v1 === 'rejected') {
    const migrated: ServiceConsent = { posthog: v1 === 'accepted' };
    localStorage.setItem(CONSENT_STORAGE_KEY_V2, JSON.stringify(migrated));
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return migrated;
  }

  return null;
}

export function saveConsent(consent: ServiceConsent): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_STORAGE_KEY_V2, JSON.stringify(consent));
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY_V2);
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}
