# Balances Widget

The **Balances Widget** is a React component that allows users to manage their token balances and interact with various modules like Rewards and Savings.

## Installation

```shell
npm install @jetstreamgg/widgets
```

## Example Usage

```jsx
import { BalancesWidget } from '@jetstreamgg/widgets';

function BalancesPage() {
  return (
    <div>
      <h2>Balances Page</h2>
      <BalancesWidget
        onConnect={onConnect}
        locale="en-US"
        rightHeaderComponent={<CustomButton />}
        externalWidgetState={/* initial state */}
        onStateValidated={onStateValidated}
        hideModuleBalances={false}
        enabled={true}
        actionForToken={actionForToken}
        onClickRewardsCard={onClickRewardsCard}
        onClickSavingsCard={onClickSavingsCard}
      />
    </div>
  );
}
```

## BalancesWidgetProps

In addition to `WidgetProps`, `BalancesWidget` component also accepts the following props:

- `customTokenList?: TokenForChain[];`
  - A list of custom tokens to be used in the widget. If provided, this list will override the default list.
- `hideModuleBalances?: boolean;`
  - A boolean to hide or show module balances.
- `actionForToken?: (symbol: string, balance: string) => { label: string; actionUrl: string; image: string } | undefined;`
  - A function to define actions for a specific token.
- `onClickRewardsCard?: () => void;`
  - A callback function that is called when the rewards card is clicked.
- `onClickSavingsCard?: () => void;`
  - A callback function that is called when the savings card is clicked.
