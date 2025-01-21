import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Heading } from '@/components/Typography';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { positionAnimations } from '@/modules/ui/animation/presets';

type DetailSectionProps = {
  title: string;
  dataTestId?: string;
  children: React.ReactNode;
  fixed?: boolean;
};

export function DetailSection({ title, children, dataTestId, fixed }: DetailSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={fixed || open}
      onOpenChange={setOpen}
      className="mb-6"
      data-testid={dataTestId}
      disabled={fixed}
    >
      <motion.div variants={positionAnimations}>
        <CollapsibleTrigger className="flex w-full items-center justify-between [&[data-state=open]>svg]:rotate-180">
          <Heading className="my-4">{title}</Heading>
          {!fixed && (
            <ChevronDown className="text-textSecondary h-6 w-6 shrink-0 transition-transform duration-200" />
          )}
        </CollapsibleTrigger>
      </motion.div>
      <CollapsibleContent className="data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down space-y-8 overflow-hidden transition-all">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
