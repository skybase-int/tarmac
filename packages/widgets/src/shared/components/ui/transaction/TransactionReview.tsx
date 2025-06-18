import { motion } from 'framer-motion';
import { Heading, Text } from '@widgets/shared/components/ui/Typography';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { Card, CardContent, CardFooter, CardHeader } from '@widgets/components/ui/card';
import { Zap } from '@widgets/shared/components/icons/Icons';
import { TransactionDetail } from '@widgets/shared/components/ui/transaction/BatchTransactionStatus';
import { ExternalLink } from '@widgets/shared/components/ExternalLink';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';

export function TransactionReview({
  onExternalLinkClicked
}: {
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) {
  // TODO: Import these dynamically
  const txTitle = 'Begin the supply process';
  const txSubtitle =
    "You're allowing this app to access the USDS in your wallet and supply it to savings in one go.";
  const transactionDetail = undefined;

  return (
    <motion.div variants={positionAnimations} className="my-3 w-full">
      <Card className="ease-out-expo from-primary-start/0 to-primary-end/0 data-[status=success]:from-primary-start/100 data-[status=success]:to-primary-end/100 w-full transition duration-500">
        <CardHeader>
          <motion.div variants={positionAnimations}>
            <Zap />
          </motion.div>
        </CardHeader>
        <CardContent className="my-5">
          <motion.div variants={positionAnimations}>
            <Heading variant="medium">{txTitle}</Heading>
          </motion.div>
          <motion.div variants={positionAnimations} className="min-h-12">
            <Text className="mt-2">{txSubtitle}</Text>
          </motion.div>
          {transactionDetail && <TransactionDetail />}
        </CardContent>
        <motion.div variants={positionAnimations}>
          <CardFooter className="border-selectActive border-t pt-5">
            <HStack className="w-full justify-center">
              <ExternalLink
                // TODO: Add this link
                href=""
                iconSize={14}
                className="text-text"
                onExternalLinkClicked={onExternalLinkClicked}
              >
                Read more about Batch Transactions
              </ExternalLink>
            </HStack>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}
