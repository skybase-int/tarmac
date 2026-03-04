import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { type ReactNode } from 'react';
import { getStoredConsent, saveConsent } from './consentStorage';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST;
export const POSTHOG_ENABLED = import.meta.env.VITE_POSTHOG_ENABLED === 'true';

let hasInitializedPostHog = false;

/**
 * Initialize PostHog with consent-based configuration.
 *
 * Consent is stored in the cross-subdomain sky_consent cookie (shared across *.sky.money).
 *
 * - Rejected users: PostHog is NOT initialized (zero events).
 * - Pending users: Memory-only persistence (persistence: 'memory'). Each user gets a real UUID
 *   distinct_id in JS heap memory — no cookies, localStorage, or sessionStorage.
 * - Accepted users: Full persistent tracking.
 *
 * Cross-domain attribution: If __ph_id and/or __ph_session_id URL params are present
 * (set by marketing site CTAs), PostHog bootstraps with those values to maintain
 * a continuous session across domains.
 */
export function initializePostHogIfNeeded(forceAccepted = false) {
  if (typeof window === 'undefined' || !POSTHOG_ENABLED || !POSTHOG_KEY || hasInitializedPostHog) {
    return;
  }

  const consent = getStoredConsent();
  const hasAccepted = forceAccepted || consent?.posthog === true;
  const hasRejected = consent?.posthog === false;

  if (hasRejected && !forceAccepted) {
    return;
  }

  // Read cross-domain identity from URL (set by marketing site CTAs via useSkyUrl)
  const params = new URLSearchParams(window.location.search);
  const bootstrapDistinctId = params.get('__ph_id');
  const bootstrapSessionId = params.get('__ph_session_id');

  const bootstrapConfig =
    bootstrapDistinctId || bootstrapSessionId
      ? {
          distinctID: bootstrapDistinctId || undefined,
          sessionID: bootstrapSessionId || undefined
        }
      : undefined;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: 'history_change',
    capture_pageleave: true,
    persistence: hasAccepted ? 'localStorage+cookie' : 'memory',
    autocapture: true,
    disable_session_recording: true,
    disable_surveys: true,
    disable_web_experiments: true,
    respect_dnt: true,
    ip: false,
    property_denylist: ['$ip'],
    cross_subdomain_cookie: true,

    // Bootstrap with marketing site identity for cross-domain attribution
    bootstrap: bootstrapConfig,

    loaded: posthogClient => {
      posthogClient.register({ app_name: 'app' });

      if (hasAccepted) {
        posthogClient.opt_in_capturing();
      }

      if (import.meta.env.DEV) {
        posthogClient.debug();
      }
    }
  });

  hasInitializedPostHog = true;
}

// Initialize immediately unless rejected.
initializePostHogIfNeeded();

/**
 * Apply a consent change at runtime.
 * Handles memory → full tracking transitions (and vice versa).
 * Writes directly to the cross-subdomain sky_consent cookie.
 */
export function applyPostHogConsent(enabled: boolean) {
  if (enabled) {
    initializePostHogIfNeeded(true);
    // Upgrade from memory to persistent storage and opt in.
    // The existing in-memory distinct_id carries over so the session continues seamlessly.
    posthog.set_config({ persistence: 'localStorage+cookie' });
    posthog.opt_in_capturing();
    posthog.register({ app_name: 'app' });
  } else {
    if (!hasInitializedPostHog) return;
    // reset() MUST come before opt_out — reset clears all stored data including
    // opt flags. opt_out_capturing() must be last so the opt-out flag persists.
    posthog.reset();
    posthog.opt_out_capturing();
  }

  // saveConsent writes to the cookie immediately — no timing issues.
  saveConsent({ posthog: enabled });
}

/**
 * PostHog React provider. Kill switch: renders children without PostHog when disabled.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  if (!POSTHOG_ENABLED || !POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
