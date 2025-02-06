# Sky Ecosystem Widgets

The **widgets** package serves as a repository for portable widgets that allow plug and play integration with protocol functionality.

## Installation

```shell
npm install @jetstreamgg/widgets
```

## Example Usage

Below is an example of how to use the SavingsWidget in your React application. This example demonstrates handling connection, transactions, notifications, and widget state changes.

```jsx
import React from 'react';
import { SavingsWidget } from '@jetstreamgg/widgets';

function onConnect() {
  // Handle wallet connection
}

function addRecentTransaction({ hash, description }) {
  // Handle adding a recent transaction
}

function onStateValidated(state) {
  // Handle validated external state
  console.log('Validated State:', state);
}

function onNotification(message) {
  // Handle widget notifications
  console.log('Notification:', message);
}

function onWidgetStateChange(params) {
  // Handle widget state changes
  console.log('Widget State Changed:', params);
}

function onExternalLinkClicked(e) {
  // Handle external link clicks
  console.log('External link clicked');
}

const externalWidgetState = {
  token: 'USDS',
  amount: '1000',
  tab: 'left'
  // Add any additional external state properties as needed
};

function App() {
  return (
    <div>
      <h2>Savings Page</h2>
      <SavingsWidget
        onConnect={onConnect}
        addRecentTransaction={addRecentTransaction}
        locale="en-US"
        rightHeaderComponent={<button>Custom Action</button>}
        externalWidgetState={externalWidgetState}
        onStateValidated={onStateValidated}
        onNotification={onNotification}
        onWidgetStateChange={onWidgetStateChange}
        onExternalLinkClicked={onExternalLinkClicked}
        enabled={true}
        referralCode={1234}
      />
    </div>
  );
}

export default App;
```

## Available Widgets

#### WidgetProps

The `WidgetProps` type defines the common set of properties that can be passed to all widgets:

| Prop                     | Type                                                           | Description                                                                                           |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `onConnect?`             | `() => void`                                                   | A callback function triggered when a wallet connection is initiated                                   |
| `addRecentTransaction?`  | `({ hash: string, description: string }) => void`              | A function to add a transaction to the widget's history                                               |
| `locale?`                | `string`                                                       | Specifies the locale to be used for internationalization                                              |
| `rightHeaderComponent?`  | `React.ReactElement`                                           | A custom React element to be rendered in the widget's header                                          |
| `externalWidgetState?`   | `ExternalWidgetState`                                          | An object representing the external state used to initialize the widget (e.g. { token, amount, tab }) |
| `onStateValidated?`      | `(state: ExternalWidgetState) => void`                         | A callback function called once the external widget state has been validated                          |
| `onNotification?`        | `(message: WidgetMessage) => void`                             | A function that receives notifications related to widget actions                                      |
| `onWidgetStateChange?`   | `(params: WidgetStateChangeParams) => void`                    | A callback triggered whenever the widget's internal state changes                                     |
| `onExternalLinkClicked?` | `(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void` | A callback function invoked when an external link within the widget is clicked                        |
| `onCustomNavigation?`    | `() => void`                                                   | A callback for handling custom navigation actions within the widget                                   |
| `customNavigationLabel?` | `string`                                                       | A label for the custom navigation button                                                              |
| `enabled?`               | `boolean`                                                      | A flag indicating whether the widget is enabled                                                       |
| `referralCode?`          | `number`                                                       | A referral code used for tracking widget usage                                                        |

### Savings Widget

The SavingsWidget is a React component that provides interactions with the USDS Savings Rate, allowing users to supply and withdraw funds. In addition to the common WidgetProps, the SavingsWidget has no additional unique props.

### BaseSavingsWidget

The BaseSavingsWidget is a specialized variant of the Savings Widget designed for use on the Base network. It supports all common widget props and has no additional unique props.

### Upgrade Widget

A React component that allows users to upgrade their tokens to a new version. In addition to the common WidgetProps, it supports:

| Prop              | Type               | Description                                         |
| ----------------- | ------------------ | --------------------------------------------------- |
| `upgradeOptions?` | `UpgradeOptions[]` | Configuration options for available upgrade paths   |
| `revertOptions?`  | `RevertOptions[]`  | Configuration options for available reversion paths |

### Trade Widget

A React component that enables users to trade between different tokens. In addition to the common WidgetProps, it supports:

| Prop               | Type       | Description                                                  |
| ------------------ | ---------- | ------------------------------------------------------------ |
| `customTokenList?` | `Token[]`  | Optional list of custom tokens to include in token selection |
| `disallowedPairs?` | `string[]` | Optional list of trading pairs to exclude                    |

### BaseTradeWidget

The BaseTradeWidget is a specialized widget for trading tokens on the Base network. It provides a robust interface for token selection, amount input, and transaction overview specifically optimized for trade flows on Base. In addition to the common WidgetProps, it supports:

| Prop               | Type       | Description                                                  |
| ------------------ | ---------- | ------------------------------------------------------------ |
| `customTokenList?` | `Token[]`  | Optional list of custom tokens to include in token selection |
| `disallowedPairs?` | `string[]` | Optional list of trading pairs to exclude                    |

### Rewards Widget

The Rewards Widget allows users to participate in Sky Token Rewards. In addition to the common WidgetProps, it supports:

| Prop                      | Type                                        | Description                                                                                                        |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `onRewardContractChange?` | `(rewardContract?: RewardContract) => void` | A callback function invoked when the selected reward pool changes. Receives the new reward contract as an argument |

### SealModule Widget

The SealModule Widget allows users to seal their tokens in the protocol's Seal Module. In addition to the common WidgetProps, it supports:

| Prop               | Type                                                                     | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `onSealUrnChange?` | `(urn: { urnAddress?: string; urnIndex?: bigint } \| undefined) => void` | A callback function triggered when the seal URN changes                                                 |
| `termsLink?`       | `{ url: string; name: string }`                                          | An optional object specifying the URL and name of the terms of use that the user must review and accept |

## Internationalization and Translation Process

In this project, we're utilizing `lingui` library for handling the internationalization (i18n) of this project. The following steps provide an overview of the i18n process:

The three commands we use for managing messages are listed in the `scripts` section of your `package.json` file:

`"messages:extract": "lingui extract --clean"`
`"messages:compile": "lingui compile"`
`"messages": "pnpm messages:extract && pnpm messages:compile"`

Here's what each script does:

- `messages:extract`: This command extracts all messages from your source code into a `messages.po` file. The `--clean` option is used to remove obsolete messages from the file.

- `messages:compile`: After translation, this command compiles the messages into an optimized JavaScript format which can be imported in the project.

- `messages`: This is a convenience script that first extracts and then compiles the messages. It's typically run before building your application.

#### Usage

You can run these scripts using the `pnpm` package manager. Here are the commands you would use:

##### To extract messages from your source code

`pnpm messages:extract`

This command will go through your code looking for `<Trans>`, `t`and `msg` ligui macros and extract them into a `.po` file.

##### To compile your translated messages

`pnpm messages:compile`

Once you have the .po files you will need to compile them which will create a `.ts`and `.d.ts` file for each language.

##### To extract and then compile your messages in a single command:

`pnpm messages`

Please ensure that all your translations are done in the corresponding `.po` files before compiling them. For more information about translating messages with `lingui`, see the official [documentation](https://lingui.dev/tutorials/react).
