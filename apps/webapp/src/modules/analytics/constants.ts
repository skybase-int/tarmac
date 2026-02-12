import type posthog from 'posthog-js';

// ── Event Names ──────────────────────────────────────────────────────────────

export const AppEvents = {
  WIDGET_SELECTED: 'app_widget_selected',
  WIDGET_FLOW_STARTED: 'app_widget_flow_started',
  WIDGET_FLOW_COMPLETED: 'app_widget_flow_completed',
  DETAILS_PANE_TOGGLED: 'app_details_pane_toggled',
  CHAT_PANE_TOGGLED: 'app_chat_pane_toggled',
  VPN_CHECK_COMPLETED: 'app_vpn_check_completed',
  VPN_BLOCKED_PAGE_VIEW: 'app_vpn_blocked_page_view',
  WALLET_CONNECTED: 'app_wallet_connected',
  WALLET_DISCONNECTED: 'app_wallet_disconnected'
} as const;

// ── Types ────────────────────────────────────────────────────────────────────

export type SelectionMethod = 'sidebar_tab' | 'mobile_drawer' | 'deeplink';
export type TxStatus = 'success' | 'error' | 'cancelled';
export type ErrorContext = string;
export type VpnCheckResult = 'allowed' | 'vpn_blocked' | 'region_blocked' | 'error';
export type BlockReason = 'vpn_detected' | 'restricted_region' | 'network_error';
export type Viewport = 'mobile' | 'tablet' | 'desktop';

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getViewport(): Viewport {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Try/catch wrapper for PostHog capture calls.
 * Analytics should never break the app.
 */
export function safeCapture(
  ph: typeof posthog | null | undefined,
  event: string,
  properties?: Record<string, unknown>
): void {
  try {
    ph?.capture(event, properties);
  } catch (error) {
    reportAnalyticsError(`safeCapture:${event}`, error);
  }
}

/**
 * Report analytics errors. Uses console.warn only (Sentry-ready interface).
 * When Sentry is added, only this function needs to change.
 */
export function reportAnalyticsError(context: string, error: unknown): void {
  console.warn(`[Analytics] ${context}:`, error);
}
