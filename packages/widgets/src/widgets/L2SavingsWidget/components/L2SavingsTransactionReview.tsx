import { motion } from 'framer-motion';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { Heading } from '@widgets/shared/components/ui/Typography';
import { positionAnimations } from '@widgets/shared/animation/presets';

export function L2SavingsTransactionReview() {
  return (
    <VStack className="w-full">
      <motion.div variants={positionAnimations}>
        <Heading>Review your transaction(s)</Heading>
      </motion.div>
      <motion.div variants={positionAnimations}>
        <div>You will approve: 1 USDS</div>
        <div>You will supply: 1 USDS</div>
      </motion.div>
    </VStack>
  );
}
