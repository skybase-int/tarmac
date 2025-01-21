import { cn } from '@/lib/utils';
import { LinkExternal } from '@/shared/components/icons/LinkExternal';
import { HStack } from '@/shared/components/ui/layout/HStack';
import React from 'react';

export function ExternalLink({
  href,
  children,
  iconSize = 16,
  showIcon = true,
  className,
  wrapperClassName,
  inline,
  onExternalLinkClicked
}: {
  href: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  iconSize?: number;
  className?: string;
  wrapperClassName?: string;
  inline?: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}): React.ReactElement {
  const content = inline ? (
    <span className={cn(wrapperClassName)}>
      {children ? children : null}
      {showIcon && <LinkExternal className="mb-px ml-2 inline" boxSize={iconSize} />}
    </span>
  ) : (
    <HStack className={cn('items-center gap-2', wrapperClassName)}>
      {children ? children : null}
      {showIcon && <LinkExternal boxSize={iconSize} />}
    </HStack>
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onExternalLinkClicked) {
      onExternalLinkClicked(e);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn('text-text inline-flex items-center', className)}
      onClick={handleClick}
    >
      {content}
    </a>
  );
}
