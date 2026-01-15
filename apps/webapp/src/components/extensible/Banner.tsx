import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Text, Heading } from '@/modules/layout/components/Typography';
import { isBannerDismissed, setBannerDismissed, setAnalyticsEnabled } from '@/lib/utils/analytics-preference';
import { loadCookie3Script } from '@/lib/utils/cookie3';

const SHOW_BANNER = true;

export type BannerPosition = 'left' | 'right';

export interface BannerProps {
  position?: BannerPosition;
  className?: string;
  onShow?: () => void;
  onDismiss?: () => void;
  onAction?: () => void;
  onSecondaryAction?: () => void;
}

export function Banner({
  position = 'left',
  className,
  onShow,
  onDismiss,
  onAction,
  onSecondaryAction
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the banner on initial load if the user hasn't dismissed it yet
    if (!isBannerDismissed() && !isVisible) {
      setIsVisible(true);
    }
  }, []);

  // Listen for custom event to show privacy banner from FooterLinks
  useEffect(() => {
    const handleShowBanner = () => {
      setIsVisible(true);
    };

    window.addEventListener('showPrivacyBanner', handleShowBanner);
    return () => {
      window.removeEventListener('showPrivacyBanner', handleShowBanner);
    };
  }, []);

  const handleDismiss = () => {
    setBannerDismissed();
    setIsVisible(false);
    // Should dismissing also set the analytics to either enabled or disabled as default?
    onDismiss?.();
  };

  onAction = () => {
    setAnalyticsEnabled(true);
    loadCookie3Script();
    handleDismiss();
  };

  onSecondaryAction = () => {
    setAnalyticsEnabled(false);
    handleDismiss();
  };

  const shouldShow = SHOW_BANNER && isVisible;

  useEffect(() => {
    if (shouldShow) {
      onShow?.();
    }
  }, [shouldShow, onShow]);

  if (!shouldShow) {
    return null;
  }

  const positionStyles = {
    left: 'left-4 md:left-4',
    right: 'right-4 md:right-4'
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 md:bottom-10',
        'z-[45]',
        positionStyles[position],
        'max-w-[calc(100vw-2rem)] md:max-w-md',
        'transition-all duration-300 ease-out',
        className
      )}
      role="complementary"
      aria-label="Site banner"
    >
      {/* Example content - replace with your custom UI */}
      <div className="bg-container border-border relative rounded-xl border p-6 pr-8 shadow-lg backdrop-blur-[50px]">
        <button
          onClick={handleDismiss}
          className="text-text/50 hover:text-text absolute top-3 right-3 rounded-md p-1.5 transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
        <div className="mb-3">
          <Heading variant="small" className="text-text">
            Cookies & Analytics Notice
          </Heading>
        </div>
        <div className="space-y-2">
          <Text variant="medium" className="text-text">
            We use strictly necessary cookies on the app.sky.money interface to ensure its operation,
            security, and stability. These cookies are essential to the functioning of the interface and
            cannot be switched off.
          </Text>
          <Text variant="medium" className="text-text">
            We also use Cookie3, a third-party analytics tool to collect information about how users interact
            with the interface. These analytics help us understand usage patterns and improve performance.
            They are not essential to the operation of the interface and will only be enabled with your
            consent.
          </Text>
          <Text variant="medium" className="text-text">
            You may accept or reject analytics at any time by using the options below. You can find further
            information about our use of cookies, including details on Cookie3 and how to manage your
            preferences, in our Cookie Policy.
          </Text>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="primary" className="px-4 py-2" onClick={onAction}>
            Accept Analytics
          </Button>
          <Button variant="secondary" className="border bg-transparent px-4 py-2" onClick={onSecondaryAction}>
            Reject Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}

Banner.displayName = 'Banner';
