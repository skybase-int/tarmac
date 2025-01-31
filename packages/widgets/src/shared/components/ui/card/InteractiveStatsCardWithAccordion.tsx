import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Text } from '../Typography';
import { TokenIcon } from '../token/TokenIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HStack } from '@/shared/components/ui/layout/HStack';

export const InteractiveStatsCardWithAccordion = ({
  title,
  headerRightContent,
  footer,
  footerRightContent,
  tokenSymbol,
  onClick
}: {
  title: React.ReactElement | string;
  headerRightContent: React.ReactElement | string;
  footer: React.ReactElement | string;
  footerRightContent?: React.ReactElement | string;
  tokenSymbol?: string;
  onClick?: () => void;
}): React.ReactElement => {
  return (
    <Card variant={onClick ? 'statsInteractive' : 'stats'} onClick={onClick} className="p-4 lg:p-5">
      <div className="flex items-center gap-2">
        {tokenSymbol && (
          <TokenIcon className="h-8 w-8" token={{ symbol: tokenSymbol, name: tokenSymbol }} chainId={1} />
        )}{' '}
        {/* show the generic icon with no network in the corner */}
        <div className="grow">
          <CardContent className="flex items-center justify-between gap-4">
            <Text>{title}</Text>
            {headerRightContent}
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between">
              <div className="flex grow items-center gap-2">
                {footer}
                <div className="h-4 w-4">
                  <ArrowRight
                    size={16}
                    className="opacity-0 transition-opacity group-hover/interactive-card:opacity-100"
                  />
                </div>
              </div>
              {footerRightContent}
            </div>
          </CardFooter>
        </div>
      </div>
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="details" className="border-border border-t">
          <AccordionTrigger>
            <HStack className="mr-1 w-full justify-between">
              <Text>Details</Text>
            </HStack>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <Text variant="small" className="text-muted-foreground">
              Additional savings details and information will be displayed here.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
