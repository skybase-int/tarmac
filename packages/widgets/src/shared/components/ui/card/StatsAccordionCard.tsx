import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HStack } from '../layout/HStack';
import { Text } from '@/shared/components/ui/Typography';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { Skeleton } from '@/components/ui/skeleton';
import { getEtherscanLink } from '@jetstreamgg/utils';
import { Trans } from '@lingui/react/macro';
import { positionAnimations } from '@/shared/animation/presets';
import { motion } from 'framer-motion';
import { JSX } from 'react';

export const StatsAccordionCard = ({
  chainId,
  address,
  accordionTitle,
  accordionContent,
  onExternalLinkClicked
}: {
  chainId: number;
  address?: string;
  accordionTitle: string;
  accordionContent: JSX.Element;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  return (
    <Accordion type="single" collapsible defaultValue={'info'}>
      <AccordionItem value="info">
        <motion.div variants={positionAnimations}>
          <AccordionTrigger>
            <HStack className="mr-1 w-full justify-between">
              {address ? (
                <ExternalLink
                  href={getEtherscanLink(chainId, address, 'address')}
                  iconSize={14}
                  className="text-textEmphasis"
                  onExternalLinkClicked={onExternalLinkClicked}
                >
                  View contract
                </ExternalLink>
              ) : (
                <Skeleton className="bg-textSecondary h-5" />
              )}
              <Text variant="medium" className="font-medium">
                <Trans>{accordionTitle}</Trans>
              </Text>
            </HStack>
          </AccordionTrigger>
        </motion.div>
        <AccordionContent className="pb-0">{accordionContent}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
