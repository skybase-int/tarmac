import React from 'react';
import { motion } from 'framer-motion';
import { easeOutExpo } from '@/modules/ui/animation/timingFunctions';
import { useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';

export function AppContainer({ children }: { children: React.ReactNode }): React.ReactElement {
  const { bpi } = useBreakpointIndex();

  return (
    <motion.main
      className="scrollbar-hidden md:scrollbar-thin bg-container group flex h-screen min-w-[375px] max-w-[480px] flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-t-3xl border bg-blend-overlay backdrop-blur-[50px] has-[.chat-pane]:w-full has-[.details-pane]:w-full md:my-auto md:max-h-[1080px] md:max-w-[1150px] md:flex-row md:overflow-hidden md:rounded-3xl md:p-3 md:pr-0.5 xl:max-w-[calc(100vw-128px)] 2xl:max-w-[1570px]"
      layout
      // This style block is needed so the border radius is not distorted when applying the layout transition
      style={
        bpi < 1
          ? { borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }
          : { borderRadius: '1.5rem' }
      }
      transition={{ duration: 0.83, ease: easeOutExpo }}
    >
      {children}
    </motion.main>
  );
}
