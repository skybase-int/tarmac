import React, { useRef, useEffect, useState, useCallback, JSX } from 'react';
import { Intent } from '../../../lib/enums';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { WidgetContent } from '../types/Widgets';
import { AnimatePresence, motion } from 'framer-motion';
import { cardAnimations } from '@/modules/ui/animation/presets';
import { AnimationLabels } from '@/modules/ui/animation/constants';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { isMultichain } from '@/lib/widget-network-map';
import { LinkedActionWrapper } from '@/modules/ui/components/LinkedActionWrapper';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DualSwitcher } from '@/components/DualSwitcher';
import { useNetworkSwitch } from '@/modules/ui/context/NetworkSwitchContext';
import { useChains } from 'wagmi';
import { useEnhancedNetworkToast } from '@/modules/app/hooks/useEnhancedNetworkToast';
import { useNetworkAutoSwitch } from '@/modules/app/hooks/useNetworkAutoSwitch';
import { WidgetMenuItemTooltip } from '@/modules/app/components/WidgetMenuItemTooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

interface WidgetNavigationProps {
  widgetContent: WidgetContent;
  intent?: Intent;
  children?: React.ReactNode;
  hideTabs?: boolean;
  currentChainId?: number;
}

export function WidgetNavigation({
  widgetContent,
  intent,
  children,
  hideTabs,
  currentChainId
}: WidgetNavigationProps): JSX.Element {
  const { bpi } = useBreakpointIndex();
  const isMobile = bpi < BP.md;
  const showDrawerMenu = bpi < BP.lg; // Show drawer menu on mobile and tablet
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    selectedRewardContract,
    linkedActionConfig: { showLinkedAction }
  } = useConfigContext();
  const isRewardsOverview = !selectedRewardContract && intent === Intent.REWARDS_INTENT;

  const { setIsSwitchingNetwork, saveWidgetNetwork } = useNetworkSwitch();
  const chains = useChains();
  const { showNetworkToast } = useEnhancedNetworkToast();
  const [previousChainId, setPreviousChainId] = useState<number | undefined>(currentChainId);

  // Use the new network auto-switch hook
  const { handleWidgetNavigation, isAutoSwitching, previousIntent } = useNetworkAutoSwitch({
    currentChainId,
    currentIntent: intent
  });

  const handleWidgetChange = (value: string) => {
    const targetIntent = value as Intent;
    handleWidgetNavigation(targetIntent);
  };

  // Track network changes and show enhanced toast
  useEffect(() => {
    if (currentChainId && previousChainId && currentChainId !== previousChainId) {
      const prevChain = chains.find(c => c.id === previousChainId);
      const currChain = chains.find(c => c.id === currentChainId);

      if (prevChain && currChain) {
        // Reset switching state when network change completes
        setIsSwitchingNetwork(false);

        // Show enhanced network toast with quick switch options
        showNetworkToast({
          previousChain: { id: prevChain.id, name: prevChain.name },
          currentChain: { id: currChain.id, name: currChain.name },
          currentIntent: intent,
          previousIntent: previousIntent,
          isAutoSwitch: isAutoSwitching,
          onNetworkSwitch: chainId => {
            // Save the manually selected network for the current widget
            if (intent && isMultichain(intent) && intent !== Intent.BALANCES_INTENT) {
              saveWidgetNetwork(intent, chainId);
            }
          }
        });
      }
    }
    setPreviousChainId(currentChainId);
  }, [
    currentChainId,
    chains,
    intent,
    previousIntent,
    showNetworkToast,
    saveWidgetNetwork,
    setIsSwitchingNetwork,
    isAutoSwitching
  ]);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const updateSize = () => {
      setHeight(containerElement.offsetHeight);
    };
    updateSize();

    // Create observer to watch for changes in card size
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerElement);

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const contentMarginTop = isMobile ? 0 : 8;
  const contentPaddingTop = isMobile ? 0 : 2;
  const laExtraHeight = isMobile ? 61 : 100; // LA Wrapper and action button height
  const baseTabContentClasses = 'lg:h-full md:flex-1';
  const tabContentClasses = isRewardsOverview
    ? `${baseTabContentClasses} pl-6 pt-2 pr-0 pb-0 md:p-3 md:pb-3 md:pr-0 md:pt-2 xl:p-4 xl:pb-4 xl:pr-0`
    : intent === Intent.BALANCES_INTENT
      ? `${baseTabContentClasses} pl-6 pt-2 pb-4 pr-0 md:p-3 md:pb-0 md:pr-0 md:pt-2 xl:p-4 xl:pb-0 xl:pr-0`
      : `${baseTabContentClasses} pl-6 pt-2 pb-4 pr-0 md:pb-0 md:p-3 md:pr-0 md:pt-2 xl:p-4 xl:pr-0`;
  // If it's mobile, use the widget navigation row height + the height of the webiste header
  // as we're using 100vh for the content style, if not, just use the height of the navigation row
  // If the tab list is hidden, don't count it's height
  const headerHeight =
    (isMobile ? (hideTabs ? 56 : 63 + 56) : 66) + (contentMarginTop + contentPaddingTop) * 4;
  const topOffset = headerHeight;
  const style = isMobile
    ? { height: `calc(100dvh - ${topOffset + (showLinkedAction ? laExtraHeight : 0)}px)` }
    : showDrawerMenu
      ? { height: `${height - 52}px` }
      : undefined;
  const verticalTabGlowClasses =
    'before:-left-[11px] before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[120%] before:w-px before:bg-nav-light-vertical';

  // Memoized scroll function
  const scrollToTop = useCallback(() => {
    if (isMobile) {
      menuRef.current?.scrollIntoView();
    }
  }, [isMobile]);

  // Effect to scroll to top when intent changes
  useEffect(() => {
    scrollToTop();
  }, [intent, scrollToTop]);

  return (
    <div ref={containerRef} className={`${showDrawerMenu ? 'w-full' : 'lg:flex lg:h-full'}`}>
      {/* Mobile and tablet hamburger menu */}
      {showDrawerMenu && !hideTabs && (
        <div
          className="flex items-center justify-between p-4 pb-2 md:pl-1.5 md:pr-1 md:pt-1 lg:hidden"
          ref={menuRef}
        >
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-bgPrimary border-borderPrimary rounded-xl"
                aria-label="Toggle menu"
              >
                <Menu size={24} className="text-text" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-borderPrimary w-[280px] bg-black/10 p-0 backdrop-blur-xl"
              closeButtonClassName="text-white"
              closeIconClassName="size-[22px]"
            >
              <div className="flex h-full flex-col">
                <div className="p-6 pb-4">
                  <Heading>
                    <Trans>Menu</Trans>
                  </Heading>
                </div>
                <div className="mt-10 flex-1 overflow-y-auto px-3 pb-6">
                  {widgetContent.map(group =>
                    group.items.map(([widgetIntent, label, icon, , comingSoon, options]) => (
                      <Button
                        key={widgetIntent}
                        onClick={() => {
                          handleWidgetChange(widgetIntent);
                          setIsMobileMenuOpen(false);
                        }}
                        disabled={options?.disabled || false}
                        variant="ghost"
                        className={cn(
                          'text-textSecondary mb-2 h-auto w-full justify-start gap-3 px-3 py-3 transition-colors',
                          'hover:bg-bgHover disabled:cursor-not-allowed disabled:text-[rgba(198,194,255,0.4)]',
                          intent === widgetIntent && 'bg-bgActive text-text hover:bg-bgActive'
                        )}
                      >
                        {icon({ color: 'inherit' })}
                        <Text variant="large" className="flex-1 text-left leading-4 text-inherit">
                          <Trans>{label}</Trans>
                        </Text>
                        {comingSoon && (
                          <Text
                            variant="small"
                            className="bg-radial-(--gradient-position) from-primary-start/100 to-primary-end/100 text-textSecondary rounded-full px-1.5 py-0.5 text-[10px]"
                          >
                            <Trans>Soon</Trans>
                          </Text>
                        )}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </SheetContent>
            {/* Only show the dual switcher in this row for mobile and tablet in portrait mode */}
            <DualSwitcher className="flex lg:hidden" />
          </Sheet>
        </div>
      )}

      {/* Main content with tabs */}
      <Tabs
        className="w-full lg:flex lg:flex-row"
        defaultValue={Intent.BALANCES_INTENT}
        onValueChange={handleWidgetChange}
        value={intent}
        asChild
        activationMode="manual"
      >
        <motion.div layout transition={{ layout: { duration: 0 } }} className="lg:flex lg:w-full lg:flex-row">
          {/* Desktop vertical tabs, hidden on mobile and tablet */}
          <div className="border-r-1 h-full justify-center">
            <TooltipProvider>
              <TabsList
                className={cn(
                  'sticky top-0 z-20 flex w-full justify-around rounded-none rounded-t-3xl border-b backdrop-blur-2xl',
                  'lg:scrollbar-thin lg:static lg:h-fit lg:max-h-[calc(100vh-120px)] lg:w-auto lg:flex-col lg:justify-start lg:gap-2 lg:self-start lg:overflow-y-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pr-[10px] lg:backdrop-filter-none',
                  hideTabs && 'hidden',
                  showDrawerMenu && 'hidden',
                  'lg:overflow-visible'
                )}
                data-testid="widget-navigation"
              >
                {widgetContent.map((group, groupIndex) => (
                  <React.Fragment key={group.id}>
                    {group.items.map(([widgetIntent, label, icon, , comingSoon, options, description]) => (
                      <div
                        key={widgetIntent}
                        className="flex grow basis-[15%] justify-center md:w-full md:basis-auto md:justify-start"
                      >
                        <WidgetMenuItemTooltip
                          description={description}
                          widgetIntent={widgetIntent}
                          currentChainId={currentChainId}
                          currentIntent={intent}
                          label={label as string}
                          isMobile={isMobile}
                          disabled={options?.disabled || false}
                        >
                          <TabsTrigger
                            variant="icons"
                            value={widgetIntent}
                            className={cn(
                              'text-textSecondary data-[state=active]:text-text relative w-full px-1',
                              'lg:justify-start lg:gap-1.5 lg:bg-transparent lg:px-4 lg:py-2 lg:hover:bg-transparent',
                              'lg:data-[state=active]:text-text lg:data-[state=active]:bg-transparent',
                              'disabled:cursor-not-allowed disabled:text-[rgba(198,194,255,0.4)]',
                              'max-lg:before:opacity-0',
                              'max-lg:disabled:before:opacity-0 max-lg:disabled:hover:before:opacity-0',
                              !showDrawerMenu && intent === widgetIntent && verticalTabGlowClasses,
                              showDrawerMenu &&
                                intent === widgetIntent &&
                                'before:opacity-100 hover:before:opacity-100'
                            )}
                            disabled={options?.disabled || false}
                          >
                            <div className="flex flex-col items-center justify-center gap-1">
                              {!isMobile && icon({ color: 'inherit' })}
                              <Text variant="small" className="leading-4 text-inherit">
                                <Trans>{label}</Trans>
                              </Text>
                            </div>
                            {comingSoon && (
                              <Text
                                variant="small"
                                className="bg-radial-(--gradient-position) from-primary-start/100 to-primary-end/100 text-textSecondary absolute left-1/2 top-0 -mt-2 rounded-full px-1.5 py-0 lg:static lg:px-1.5 lg:py-0.5 lg:text-[10px]"
                              >
                                <Trans>Soon</Trans>
                              </Text>
                            )}
                          </TabsTrigger>
                        </WidgetMenuItemTooltip>
                      </div>
                    ))}
                    {groupIndex < widgetContent.length - 1 && !showDrawerMenu && (
                      <div className="lg:border-b-1 hidden lg:my-2 lg:block lg:h-px lg:w-full" />
                    )}
                  </React.Fragment>
                ))}
              </TabsList>
            </TooltipProvider>
          </div>
          <div className="md:min-w-[352px] md:max-w-[440px] lg:flex lg:min-w-[416px] lg:max-w-[416px] lg:flex-1 lg:flex-col lg:overflow-hidden">
            <LinkedActionWrapper />
            <AnimatePresence initial={false} mode="popLayout">
              {widgetContent.map(group =>
                group.items.map(
                  ([int, , , content]) =>
                    intent === int && (
                      <TabsContent
                        key={int}
                        value={int}
                        className={cn(tabContentClasses, 'flex flex-col')}
                        style={style}
                        asChild
                      >
                        <motion.div
                          variants={cardAnimations}
                          initial={AnimationLabels.initial}
                          animate={AnimationLabels.animate}
                          exit={AnimationLabels.exit}
                          className={cn(
                            'flex-1 overflow-y-auto pr-4 md:pr-0 lg:overflow-hidden',
                            isMobile
                              ? showLinkedAction
                                ? 'scroll-mt-[148px]'
                                : 'scroll-mt-[87px]'
                              : 'scroll-mt-[0px]'
                          )}
                        >
                          {content}
                        </motion.div>
                      </TabsContent>
                    )
                )
              )}
              {children}
            </AnimatePresence>
          </div>
        </motion.div>
      </Tabs>
    </div>
  );
}
