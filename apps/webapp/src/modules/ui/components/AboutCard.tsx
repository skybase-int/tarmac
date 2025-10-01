import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/react/macro';
import { ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { GradientShapeCard } from './GradientShapeCard';
import { ReactNode } from 'react';

interface AboutCardProps {
  title: ReactNode;
  description: ReactNode;
  linkHref: string;
  linkLabel?: ReactNode;
  colorMiddle: string;
  height?: number | undefined;
  contentWidth?: 'w-2/3' | 'w-1/2';
}

export const AboutCard = ({
  title,
  description,
  linkHref,
  linkLabel = <Trans>View contract</Trans>,
  colorMiddle,
  height,
  contentWidth = 'w-2/3'
}: AboutCardProps) => {
  return (
    <GradientShapeCard
      colorLeft="radial-gradient(200.08% 406.67% at 5.14% 108.47%, #4331E9 0%, #2A197D 21.68%)"
      colorMiddle={colorMiddle}
      colorRight="#1e1a4b"
      className="mb-6"
      height={height}
    >
      <div className={`w-[80%] space-y-2 self-start lg:${contentWidth}`}>
        <Heading className="flex items-center gap-2">{title}</Heading>
        <Text variant="small">{description}</Text>
      </div>
      <ExternalLink href={linkHref} showIcon={false} className="mt-auto w-fit pt-3 lg:self-end lg:pt-0">
        <Button variant="outline" className="border-border gap-2">
          {linkLabel}
          <ExternalLinkIcon size={16} />
        </Button>
      </ExternalLink>
    </GradientShapeCard>
  );
};
