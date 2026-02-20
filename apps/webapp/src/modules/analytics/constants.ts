import type posthog from 'posthog-js';
import { generateUUID } from '@/lib/generateUUID';

// ── Event Names ──────────────────────────────────────────────────────────────

export const AppEvents = {
  WIDGET_SELECTED: 'app_widget_selected',
  TRANSACTION_STARTED: 'app_widget_flow_started',
  TRANSACTION_COMPLETED: 'app_widget_flow_completed',
  WIDGET_REVIEW_VIEWED: 'app_widget_review_viewed',
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
export type VpnCheckResult = 'allowed' | 'vpn_blocked' | 'region_blocked' | 'error' | 'unknown';
export type BlockReason =
  | 'vpn_detected'
  | 'restricted_region'
  | 'address_restricted'
  | 'network_error'
  | 'auth_error'
  | 'unknown';
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
 * Report analytics errors.
 *
 * TODO: Replace console.warn with an error monitoring service so analytics
 * failures are surfaced in production without breaking the app.
 * Only this function needs to change — all analytics code already calls it.
 */
export function reportAnalyticsError(context: string, error: unknown): void {
  console.warn(`[Analytics] ${context}:`, error);
}

// ── Flow ID ─────────────────────────────────────────────────────────────────
// Correlates all analytics events within a single widget interaction session.
// A new flow starts when the user navigates to a widget (sidebar, drawer, deeplink).

let currentFlowId: string | null = null;

export function startNewFlow(): void {
  currentFlowId = generateUUID();
}

export function getFlowId(): string | null {
  return currentFlowId;
}
