import { useRef } from 'react';
import { usePostHog } from 'posthog-js/react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';

/**
 * Registers `details_open` and `chat_open` as PostHog super properties
 * so every event automatically carries the current panel state.
 *
 * Call once in a component that's always mounted (e.g. DualSwitcher).
 * The properties update whenever the URL query params change.
 */
export function usePanelSuperProperties() {
  const posthog = usePostHog();
  const [searchParams] = useSearchParams();
  const { bpi } = useBreakpointIndex();

  const detailsOpen = !(searchParams.get(QueryParams.Details) === 'false');
  const chatOpen =
    bpi >= BP['3xl']
      ? !(searchParams.get(QueryParams.Chat) === 'false')
      : searchParams.get(QueryParams.Chat) === 'true';

  // Only call register when values actually change
  const prevRef = useRef<{ details: boolean; chat: boolean } | null>(null);
  if (
    posthog &&
    (!prevRef.current || prevRef.current.details !== detailsOpen || prevRef.current.chat !== chatOpen)
  ) {
    prevRef.current = { details: detailsOpen, chat: chatOpen };
    try {
      posthog.register({ details_open: detailsOpen, chat_open: chatOpen });
    } catch {
      // Analytics should never break the app
    }
  }
}
