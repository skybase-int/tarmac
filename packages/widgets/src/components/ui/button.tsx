import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'pill'
  | 'chip'
  | 'link'
  | 'pagination'
  | 'paginationActive'
  | 'input'
  | 'primaryAlt'
  | 'ghost';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[12px] text-sm font-medium ring-offset-background transition-gradient-and-colors duration-250 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-text hover:bg-primaryHover active:bg-primaryActive focus:bg-primaryFocus disabled:bg-primaryDisabled',
        primaryAlt:
          'bg-primaryAlt border text-text hover:[--gradient-opacity:60%] active:[--gradient-opacity:45%] focus:[--gradient-opacity:45%] disabled:[--gradient-opacity:35%]',
        secondary:
          'bg-transparent text-text border border-textSecondary hover:bg-[rgb(77,76,111)] active:bg-[rgb(94,92,136)] disabled:border-textMuted disabled:text-textMuted',
        pill: 'bg-primary text-text rounded-full hover:bg-primaryHover active:bg-primaryActive focus:bg-primaryFocus',
        chip: 'bg-secondary text-text rounded-full hover:bg-secondaryHover active:bg-secondaryActive, focus:bg-secondaryFocus',
        link: 'text-textSecondary no-underline disabled:text-textMuted',
        purpleLink: 'text-textEmphasis',
        pagination:
          'text-selectActive text-base leading-normal bg-primary [--gradient-opacity:0%] rounded-full hover:[--gradient-opacity:50%] hover:text-text focus:border-2 focus:border-primaryActive focus:text-text active:text-text active:[--gradient-opacity:30%] disabled:bg-primary disabled:[--gradient-opacity:0%] !rounded-full !border-0',
        paginationActive: 'bg-primary hover:bg-primaryHover !rounded-full text-text',
        input:
          'bg-black/20 hover:bg-primaryAlt hover:[--gradient-opacity:70%] active:bg-primaryAlt active:[--gradient-opacity:50%] text-text text-[13px] font-normal leading-4 disabled:pointer-events-auto disabled:cursor-not-allowed font-graphik',
        ghost: 'text-text hover:text-white/80 active:text-white/60'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-full px-2',
        icon: 'h-10 w-10',
        input: 'h-6 pt-[5px] pb-[3px] px-2 rounded-[32px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
