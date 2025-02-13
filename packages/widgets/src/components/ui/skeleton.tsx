import { cn } from '@widgets/lib/utils';
import { skeletonTransition } from '@widgets/shared/animation/presets';
import { motion } from 'framer-motion';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('h-6 overflow-hidden rounded-md bg-white/5', className)} {...props}>
      <motion.span
        className="block h-full w-[200%] bg-gradient-to-r from-[rgb(76,61,158)]/0 from-0% via-[rgb(76,61,158)] to-[rgb(76,61,158)]/0 to-100% opacity-90"
        animate={{ x: ['-100%', '50%'] }}
        transition={skeletonTransition}
      />
    </div>
  );
}

export { Skeleton };
