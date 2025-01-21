import React from 'react';
import { HStack } from '@/components/HStack';
import { LinkExternal } from '@/components/icons/LinkExternal';
import { cn } from '@/lib/utils';

export function ExternalLink({
  href,
  children,
  className,
  iconSize = 16,
  showIcon = true
}: {
  href: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  iconSize?: number;
  className?: string;
}): React.ReactElement {
  const content = (
    <>
      {children ? children : null}
      {showIcon && <LinkExternal boxSize={iconSize} />}
    </>
  );
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn('text-text flex items-center', className)}>
      {['string', 'number'].includes(typeof children) || children === undefined ? (
        content
      ) : (
        <HStack>{content}</HStack>
      )}
    </a>
  );
}
