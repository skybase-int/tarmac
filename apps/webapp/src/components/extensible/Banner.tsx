import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Text, Heading } from '@/modules/layout/components/Typography';

const SHOW_BANNER = false;

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
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
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
      <div className="bg-container border-border rounded-xl border p-4 shadow-lg backdrop-blur-[50px]">
        <div className="mb-3 flex items-center justify-between">
          <Heading variant="small" className="text-text">
            Banner Title
          </Heading>
          <Button variant="ghost" size="icon" onClick={handleDismiss} aria-label="Dismiss">
            <X className="text-textSecondary hover:text-text" size={16} />
          </Button>
        </div>
        <div className="space-y-2">
          <Text variant="medium" className="text-text">
            This is a test banner to verify positioning, responsiveness, and z-index layering across different
            viewport sizes. The banner should appear fixed at the bottom of the screen, remaining visible as
            you scroll through content.
          </Text>
          <Text variant="medium" className="text-text">
            It should sit above Sonner toast notifications but below any modal dialogs that may open. On
            mobile devices, the banner should adapt gracefully with readable text and accessible touch
            targets.
          </Text>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="primary" className="px-4 py-2" onClick={onAction}>
            Primary Action
          </Button>
          <Button variant="secondary" className="border bg-transparent px-4 py-2" onClick={onSecondaryAction}>
            Secondary Action
          </Button>
        </div>
      </div>
    </div>
  );
}

Banner.displayName = 'Banner';
