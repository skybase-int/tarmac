import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface WidgetContainerProps {
  header?: React.ReactElement;
  rightHeader?: React.ReactElement;
  footer?: React.ReactElement;
  children?: React.ReactNode;
  contentClassname?: string;
}

export const WidgetContainer = forwardRef<HTMLDivElement, WidgetContainerProps>(
  ({ header, rightHeader, footer, children, contentClassname }, ref) => {
    return (
      <Card variant="widget" data-testid="widget-container" className="relative h-full">
        <div ref={ref} className="scrollbar-thin overflow-y-auto">
          <CardHeader className="space-y-0">
            {header}
            {rightHeader}
          </CardHeader>
          <CardContent className={cn('mb-0 mt-6 flex-grow p-0 pb-6 pr-2.5 md:pr-0', contentClassname)}>
            {children}
          </CardContent>
        </div>
        <CardFooter className="sticky bottom-0 mt-auto p-0 pr-2.5">{footer}</CardFooter>
      </Card>
    );
  }
);
