import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { HStack } from '@/shared/components/ui/layout/HStack';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const StatsOverviewCardCoreAccordion = ({
  headerLeftContent,
  headerRightContent,
  content,
  footerContent,
  onClick,
  className
}: {
  headerLeftContent: JSX.Element;
  headerRightContent?: JSX.Element;
  content: JSX.Element;
  footerContent?: JSX.Element;
  onClick?: (any?: any) => void;
  className?: string;
}) => {
  return (
    <Card variant="pool" onClick={onClick} className={cn('hover-in-before overflow-hidden', className)}>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="content">
            <AccordionTrigger>
              <HStack className="mr-1 w-full justify-between">
                {headerLeftContent}
                {headerRightContent}
              </HStack>
            </AccordionTrigger>
            <AccordionContent className="pb-0">{content}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {footerContent && <CardFooter className="!mt-0">{footerContent}</CardFooter>}
    </Card>
  );
};
