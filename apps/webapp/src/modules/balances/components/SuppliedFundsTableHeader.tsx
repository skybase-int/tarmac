import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';

export function SuppliedFundsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/4">
          <Text variant="small">
            <Trans>Supplied to</Trans>
          </Text>
        </TableHead>
        <TableHead className="w-1/4">
          <Text variant="small">
            <Trans>Amount</Trans>
          </Text>
        </TableHead>
        <TableHead className="w-1/4 [@container(width<750px)]:hidden">
          <Text variant="small">
            <Trans>Amount (USD)</Trans>
          </Text>
        </TableHead>
        <TableHead className="w-1/4 [@container(width<750px)]:hidden">
          <Text variant="small">
            <Trans>Rates</Trans>
          </Text>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
