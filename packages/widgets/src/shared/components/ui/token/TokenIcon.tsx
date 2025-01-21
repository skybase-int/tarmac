import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useTokenImage } from '@/shared/hooks/useTokenImage';
import { Token } from '@jetstreamgg/hooks';

export function TokenIcon({
  token,
  width = 50,
  className,
  fallbackClassName,
  fallbackDelay = 500
}: {
  token: Partial<Token> & { symbol: string };
  width?: number;
  className?: string;
  fallbackClassName?: string;
  fallbackDelay?: number;
}): React.ReactElement {
  const imageSrc = useTokenImage(token.symbol);

  if (!imageSrc) return <></>;

  return (
    <Avatar className={cn('', className)}>
      <AvatarImage width={width} height={width} src={imageSrc} alt={token.name} />
      <AvatarFallback className={cn('bg-slate-200 text-xs', fallbackClassName)} delayMs={fallbackDelay}>
        {token.symbol.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
