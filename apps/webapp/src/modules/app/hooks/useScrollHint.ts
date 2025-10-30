import { useState, useEffect, RefObject } from 'react';

const SCROLL_HINT_STORAGE_KEY = 'vertical-menu-scroll-hint-seen';

interface UseScrollHintOptions {
  enabled: boolean;
}

interface UseScrollHintReturn {
  shouldShowHint: boolean;
  dismissHint: () => void;
}

/**
 * Hook to manage the scroll hint visibility for overflow detection.
 * Shows a hint animation once per session if content overflows, persisted via sessionStorage.
 */
export function useScrollHint(
  scrollableRef: RefObject<HTMLElement | null>,
  { enabled }: UseScrollHintOptions
): UseScrollHintReturn {
  const [shouldShowHint, setShouldShowHint] = useState(false);

  useEffect(() => {
    if (!enabled || !scrollableRef.current) return;

    const element = scrollableRef.current;

    // Check if hint has been seen in this session
    const hasSeenHint = sessionStorage.getItem(SCROLL_HINT_STORAGE_KEY) === 'true';
    if (hasSeenHint) return;

    // Check if content overflows
    const checkOverflow = () => {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      setShouldShowHint(hasOverflow);
    };

    // Initial check
    checkOverflow();

    // Watch for resize changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [scrollableRef, enabled]);

  const dismissHint = () => {
    sessionStorage.setItem(SCROLL_HINT_STORAGE_KEY, 'true');
    setShouldShowHint(false);
  };

  // Dismiss on scroll
  useEffect(() => {
    if (!shouldShowHint || !scrollableRef.current) return;

    const element = scrollableRef.current;

    const handleScroll = () => {
      dismissHint();
    };

    element.addEventListener('scroll', handleScroll, { once: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [shouldShowHint, scrollableRef]);

  return {
    shouldShowHint,
    dismissHint
  };
}
