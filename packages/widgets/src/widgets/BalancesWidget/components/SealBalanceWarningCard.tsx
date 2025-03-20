import { Card, CardContent, CardFooter } from '@widgets/components/ui/card';
import { Text } from '@widgets/shared/components/ui/Typography';
import { TokenIcon } from '@widgets/shared/components/ui/token/TokenIcon';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { formatBigInt, formatNumber } from '@jetstreamgg/utils';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { Warning } from '@widgets/shared/components/icons/Warning';
import { Button } from '@widgets/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/react/macro';

export const SealBalanceWarningCard = ({
  url,
  isLoading,
  sealBalance,
  sealValue
}: {
  url?: string;
  isLoading?: boolean;
  sealBalance?: bigint;
  sealValue?: number;
}): React.ReactElement => {
  const navigate = useNavigate();
  const isLargeAmount = sealValue && sealValue > 1000000;

  return (
    <Card className="bg-red-400/10 p-4 bg-blend-overlay lg:p-5">
      <div className="flex items-start gap-2">
        <TokenIcon className="h-8 w-8" token={{ symbol: 'MKR', name: 'MKR' }} chainId={1} />{' '}
        <div className="grow">
          <CardContent className="flex flex-col items-start">
            <div className="flex w-full justify-between">
              <Text>
                <Trans>MKR supplied to Seal Engine</Trans>
              </Text>
              {isLoading ? (
                <Skeleton className="w-32" />
              ) : (
                <VStack gap={0} className="text-right">
                  <Text>{`${sealBalance ? formatBigInt(sealBalance) : '0'}`}</Text>
                </VStack>
              )}
            </div>
            <div className="flex w-full justify-between">
              <HStack className="items-center" gap={1}>
                <Warning boxSize={14} viewBox="0 0 16 16" />
                <Text variant="captionSm" className="text-error">
                  <Trans>Seal Engine is deprecated</Trans>
                </Text>
              </HStack>
              {isLoading ? (
                <Skeleton className="w-32" />
              ) : (
                <VStack gap={0} className="text-right">
                  {sealValue !== undefined ? (
                    <Text variant="small" className="text-textSecondary">
                      $
                      {formatNumber(sealValue, {
                        maxDecimals: isLargeAmount ? 0 : 2
                      })}
                    </Text>
                  ) : undefined}
                </VStack>
              )}
            </div>
          </CardContent>
          {url && (
            <CardFooter>
              <div className="flex w-full justify-end pt-4">
                <Button
                  className="h-6 bg-[#7c53c5] outline outline-1 outline-offset-[-1px] outline-white/20 hover:bg-[#9a75e0] focus:bg-[#9a75e0] active:bg-[#9a75e0]/80"
                  variant="pill"
                  size="sm"
                  onClick={() => {
                    navigate(url);
                  }}
                >
                  <Text variant="captionSm">
                    <Trans>Migrate to Activation Engine</Trans>
                  </Text>
                </Button>
              </div>
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};
