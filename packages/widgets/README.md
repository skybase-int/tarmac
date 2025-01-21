# Sky Ecosystem Widgets

The **widgets** package serves as a repository for portable widgets that allow plug and play integration with protocol functionality.

## Installation

```shell
npm install @jetstreamgg/widgets
```

## Example Usage

```jsx
import { SavingsWidget } from '@jetstreamgg/widgets';

function SavingsPage() {
  return (
    <div>
      <h2>Savings Page</h2>
      <SavingsWidget
        onConnect={onConnect}
        addRecentTransaction={addRecentTransaction}
        onTransactionFinished={onTransactionFinished}
        locale="en-US"
        rightHeaderComponent={<customButton />}
        externalWidgetState={/*initial state*/}
      />
    </div>
  );
}
```

## Available Widgets

### Savings Widget

A wrapper React component that provides interactions with the USDS Savings Rate, allowing users to supply and withdraw from the contract.

### Upgrade Widget

A React component that allows users to upgrade their tokens to a new version, providing a seamless transition between token versions.

### Trade Widget

A React component that enables users to trade between different tokens, integrating with the protocol's trade functionality.

### Rewards Widget

A React component that allows users to participate in Sky Token Rewards, providing an interface to supply tokens and earn rewards.

### SealModule Widget

A React component that allows users to seal their tokens in the Seal Module, providing an interface to manage their sealed tokens and earn rewards.

#### WidgetProps

The `WidgetProps` type defines the common set of properties that can be passed to all widgets. Here is a detailed explanation of each prop:

- `onConnect?: () => void;`

  - A callback function that is triggered when the widget connects to the necessary services or networks.

- `locale?: string;`

  - A string representing the locale to be used by the widget for internationalization purposes.

- `addRecentTransaction?: (transaction: { hash: string; description: string }) => void;`

  - A function that allows adding a recent transaction to the widget's transaction history. It takes an object with `hash` and `description` properties.

- `rightHeaderComponent?: React.ReactElement;`

  - A React element that can be rendered in the right side of the widget's header.

- `externalWidgetState?: ExternalWidgetState;`

  - An object representing the external state of the widget, which can be used to initialize or control the widget's state.

- `onStateValidated?: (state: State) => void;`

  - A callback function that is called when the widget's state has been validated. It receives the validated state as an argument.

- `onNotification?: (message: WidgetMessage) => void;`

  - A function that is called when the widget needs to send a notification. It receives a `WidgetMessage` object as an argument.

- `onWidgetStateChange?: (params: WidgetStateChangeParams) => void;`

  - A callback function that is triggered when the widget's state changes. It receives an object with the new state parameters.

- `onCustomNavigation?: () => void;`

  - A function that is called when a custom navigation action is triggered within the widget.

- `customNavigationLabel?: string;`

  - A string representing the label for the custom navigation action.

- `enabled?: boolean;`
  - A boolean indicating whether the widget is enabled or not.

Each widget may have additional props specific to its functionality. Please refer to the documentation of each widget for the specific details on the additional props they support.

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
