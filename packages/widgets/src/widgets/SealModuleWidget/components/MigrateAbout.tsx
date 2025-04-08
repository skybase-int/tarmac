import { Heading, Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { useContext } from 'react';
import { SealModuleWidgetContext } from '../context/context';

export const MigrateAbout = () => {
  const { setIsLockCompleted, setIsBorrowCompleted } = useContext(SealModuleWidgetContext);

  // We automatically complete this steps to proceed with migration flow
  // TODO: make sure to clear this if the user clicks back to enter manage flow
  setIsLockCompleted(true);
  setIsBorrowCompleted(true);

  return (
    <div className="mb-4">
      <Heading variant="medium">
        <Trans>About the Migration</Trans>
      </Heading>
      <Text className="mt-4">
        <Trans>Migrating your Seal Engine position requires 5 steps</Trans>{' '}
      </Text>

      <ol className="mt-4 list-outside list-decimal space-y-2 pl-4">
        <li>
          <Text tag="span">
            <Trans>Select a delegate for your new position</Trans>
          </Text>
        </li>
        <li>
          <Text tag="span">
            <Trans>Select a reward contract for your new position</Trans>
          </Text>
        </li>
        <li>
          <Text tag="span">
            <Trans>Open the new position, approving it for the migrator contract</Trans>
          </Text>
        </li>
        <li>
          <Text tag="span">
            <Trans>Approve the migrator to migrate the old contract</Trans>
          </Text>
        </li>
        <li>
          <Text tag="span">
            <Trans>Execute the migration transaction</Trans>
          </Text>
        </li>
      </ol>
    </div>
  );
};
