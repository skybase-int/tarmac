import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text, Heading } from '@/modules/layout/components/Typography';
import { VStack } from '@/modules/layout/components/VStack';
import { HStack } from '@/modules/layout/components/HStack';
import { ExternalLink } from './ExternalLink';
import { sanitizeUrl, getFooterLinks } from '@/lib/utils';
import { Trans } from '@lingui/react/macro';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { loadCookie3Script } from '@/lib/utils/cookie3';
import { getAnalyticsOptOut, setAnalyticsOptOut } from '@/lib/utils/analytics-preference';

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySettingsModal = ({ isOpen, onClose }: PrivacySettingsModalProps) => {
  const [localOptOut, setLocalOptOut] = useState(false);
  const [showReloadMessage, setShowReloadMessage] = useState(false);

  // Sync local state with localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalOptOut(getAnalyticsOptOut());
      setShowReloadMessage(false);
    }
  }, [isOpen]);

  const handleToggle = (checked: boolean) => {
    setLocalOptOut(checked);
  };

  const handleSave = () => {
    const wasOptedOut = getAnalyticsOptOut();
    const willBeOptedOut = localOptOut;

    setAnalyticsOptOut(localOptOut);

    // If user is opting back in (was opted out, now opting in)
    if (wasOptedOut && !willBeOptedOut) {
      // Load Cookie3 script dynamically
      const siteId = import.meta.env.VITE_COOKIE3_SITE_ID;
      loadCookie3Script(siteId);
    }

    // If user is opting out (was opted in, now opting out)
    if (!wasOptedOut && willBeOptedOut) {
      // Show message that page reload is needed
      setShowReloadMessage(true);
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    setLocalOptOut(getAnalyticsOptOut());
    setShowReloadMessage(false);
    onClose();
  };

  // Get privacy policy link from footer links
  const footerLinks = getFooterLinks();
  const privacyPolicyLink = footerLinks.find(
    link => link.name.toLowerCase().includes('privacy') || link.url.toLowerCase().includes('privacy')
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-containerDark flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-center rounded-none p-5 md:w-[640px] md:rounded-2xl md:p-10">
        <DialogHeader>
          <DialogTitle className="text-text text-center text-[28px] md:text-[32px]">
            <Heading>
              <Trans>Privacy Settings</Trans>
            </Heading>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-start justify-between gap-6">
          <DialogDescription className="font-custom-450 text-text text-left">
            <Trans>
              We use Cookie3 analytics to collect information about how you interact with our website. This
              helps us improve our services and user experience. You can opt out of analytics tracking at any
              time.
            </Trans>
          </DialogDescription>

          <VStack className="w-full gap-4">
            <HStack className="w-full items-center justify-between">
              <VStack className="flex-1 gap-1">
                <Text variant="medium" className="text-text">
                  <Trans>Analytics Tracking</Trans>
                </Text>
                <Text variant="small" className="text-textSecondary">
                  <Trans>
                    {localOptOut
                      ? 'Analytics tracking is currently disabled'
                      : 'Analytics tracking is currently enabled'}
                  </Trans>
                </Text>
              </VStack>
              <SwitchPrimitive.Root
                checked={!localOptOut}
                onCheckedChange={checked => handleToggle(!checked)}
                className="relative h-6 w-11 cursor-default rounded-full bg-gray-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 data-[state=checked]:bg-violet-500"
              >
                <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform data-[state=checked]:translate-x-[22px]" />
              </SwitchPrimitive.Root>
            </HStack>

            {showReloadMessage && (
              <div className="w-full rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                <Text variant="small" className="text-yellow-400">
                  <Trans>
                    Please reload the page for this change to take effect. Analytics tracking will be disabled
                    after reload.
                  </Trans>
                </Text>
              </div>
            )}

            {privacyPolicyLink && (
              <Text variant="small" className="text-textSecondary">
                <Trans>
                  For more information, please see our{' '}
                  <ExternalLink
                    skipConfirm
                    className="text-textEmphasis hover:text-textEmphasis hover:underline"
                    showIcon={false}
                    href={sanitizeUrl(privacyPolicyLink.url)}
                  >
                    {privacyPolicyLink.name}
                  </ExternalLink>
                  .
                </Trans>
              </Text>
            )}
          </VStack>

          <div className="mt-4 flex w-full justify-between gap-6 sm:mt-0 sm:w-auto">
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="flex-1 border bg-transparent hover:bg-[rgb(17,16,31)] active:bg-[rgb(34,32,66)]"
                onClick={handleCancel}
              >
                <Text>
                  <Trans>Cancel</Trans>
                </Text>
              </Button>
            </DialogClose>
            <Button variant="primary" className="flex-1" onClick={handleSave}>
              <Text>
                <Trans>Save</Trans>
              </Text>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
