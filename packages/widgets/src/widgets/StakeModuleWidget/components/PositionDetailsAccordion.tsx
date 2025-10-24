import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@widgets/components/ui/accordion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { TextWithTooltip } from '@widgets/shared/components/ui/tooltip/TextWithTooltip';
import { Text } from '@widgets/shared/components/ui/Typography';
import { formatBigInt, formatPercent } from '@jetstreamgg/sky-utils';
import { motion } from 'framer-motion';
import { getIlkName, useCollateralData } from '@jetstreamgg/sky-hooks';
import { getTooltipById } from '../../../data/tooltips';

type Props = {
  collateralizationRatio?: bigint;
  riskLevel?: string;
  sealedAmount?: bigint;
  borrowedAmount?: bigint;
  liquidationData?: {
    isInLiquidatedState: boolean;
    urnAddress: string;
  };
  delayedPrice?: bigint;
  liquidationPrice?: bigint;
};

export function PositionDetailAccordion({ delayedPrice, liquidationPrice }: Props) {
  const ilkName = getIlkName(2);
  const { data: collateralData } = useCollateralData(ilkName);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-textSecondary py-1">
          <Text variant="medium" className="font-medium">
            Position details
          </Text>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-4">
          {!!collateralData?.stabilityFee && (
            <motion.div className="flex justify-between" variants={positionAnimations}>
              <TextWithTooltip
                text={getTooltipById('borrow-rate')?.title || 'Borrow Rate'}
                tooltip={getTooltipById('borrow-rate')?.tooltip || ''}
                textClassName="leading-4"
                contentClassname="w-[400px]"
                gap={1}
                iconClassName="text-textSecondary"
              />
              <Text className="text-right text-sm">{formatPercent(collateralData.stabilityFee)}</Text>
            </motion.div>
          )}
          {!!liquidationPrice && liquidationPrice > 0n && (
            <motion.div className="flex justify-between" variants={positionAnimations}>
              <TextWithTooltip
                text={getTooltipById('liquidation-price')?.title || 'Liquidation price'}
                tooltip={getTooltipById('liquidation-price')?.tooltip || ''}
                textClassName="leading-4"
                contentClassname="w-[400px]"
                gap={1}
                iconClassName="text-textSecondary"
              />
              <Text className="text-right text-sm">${formatBigInt(liquidationPrice)}</Text>
            </motion.div>
          )}
          {!!delayedPrice && delayedPrice > 0n && (
            <motion.div className="flex justify-between" variants={positionAnimations}>
              <TextWithTooltip
                text={getTooltipById('capped-osm-sky-price')?.title || 'Capped OSM SKY price'}
                tooltip={getTooltipById('capped-osm-sky-price')?.tooltip || ''}
                textClassName="leading-4"
                gap={1}
                iconClassName="text-textSecondary"
              />
              <Text className="text-right text-sm">${formatBigInt(delayedPrice)}</Text>
            </motion.div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
