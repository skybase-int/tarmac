# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Tarmac is a React-based Web3 DeFi application for interacting with the Sky/Maker protocol. It's structured as a pnpm monorepo with a main webapp and reusable packages for hooks, widgets, and utilities.

## Essential Commands

### Development
```bash
pnpm install          # Install all dependencies
pnpm dev             # Start dev server (port 3000)
pnpm dev:packages    # Run packages in watch mode
pnpm dev:mock        # Development with mock wallet (VITE_USE_MOCK_WALLET=true)
```

### Testing
```bash
# Unit tests
pnpm test            # Run all unit tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Run tests with coverage
pnpm test:hooks      # Test hooks package with Tenderly fork
pnpm test:widgets    # Test widgets package with Tenderly fork
pnpm test:utils      # Test utils package only

# E2E tests
pnpm e2e             # Run E2E tests with Tenderly fork
pnpm e2e:ui          # Run E2E tests with interactive UI
pnpm e2e:no-vnet     # Run E2E tests without creating new VNet

# Tenderly VNet management (virtual testnet for E2E tests)
pnpm vnet:fork       # Create new Tenderly VNet fork
pnpm vnet:delete     # Delete current VNet
pnpm vnet:delete:all # Delete all local test VNets
pnpm vnet:reset      # Reset VNets and snapshots
pnpm vnet:snapshots:recreate  # Recreate funding snapshots
```

### Code Quality
```bash
pnpm lint            # Run ESLint
pnpm typecheck       # Run TypeScript type checking across packages
pnpm prettier        # Format code
```

### Build
```bash
pnpm build           # Build all packages and webapp (includes i18n)
pnpm build:packages  # Build packages only
```

### Internationalization
```bash
pnpm messages               # Extract and compile translations
pnpm messages:extract       # Extract messages from source code
pnpm messages:compile       # Compile translated messages
```

### Versioning & Publishing
```bash
pnpm changeset              # Create a changeset for package changes
pnpm changeset:release      # Build and publish packages to NPM
```

## Monorepo Structure

### Apps (`/apps/`)
- `webapp/` - Main React application (port 3000)

### Packages (`/packages/`)
- `hooks/` - React hooks for Web3 interactions (Wagmi-based, published as `@jetstreamgg/sky-hooks`)
- `widgets/` - Self-contained UI components for protocol features (published as `@jetstreamgg/sky-widgets`)
- `utils/` - Shared utilities, helpers, and i18n (published as `@jetstreamgg/sky-utils`)

### Workspace Configuration
- Uses pnpm workspaces with catalog mode for dependency management
- All packages reference monorepo dependencies as `workspace:^`
- Dev mode aliases packages to TypeScript source for faster HMR
- Packages are built to `dist/` directories with TypeScript types

## Architecture

### Webapp Modules (`/apps/webapp/src/modules/`)
Feature-based organization:
- `trade/` - Trading interface with Sky Protocol (CoW Protocol integration)
- `savings/` - USDS savings functionality
- `rewards/` - Token rewards claiming and management
- `stake/` - MKR/SKY staking features
- `seal/` - Seal protocol integration (vault management)
- `upgrade/` - MKR to SKY token migration
- `balances/` - Wallet balance management
- `auth/` - Authentication and wallet connection
- `layout/` - App layout components
- `ui/` - Shared UI components
- `utils/` - Module-level utilities

### Tech Stack
- **Frontend**: React 19, TypeScript 5.9
- **Web3**: Wagmi v2, Viem v2, RainbowKit v2
- **State**: TanStack Query v5, React Context
- **Styling**: Tailwind CSS v4, Radix UI primitives
- **Build**: Vite 7, SWC compiler
- **Testing**: Vitest (unit), Playwright (E2E), happy-dom
- **i18n**: Lingui v5
- **Package Manager**: pnpm v10+ (required)

### Smart Contract Integration

#### Generating Contract Hooks
The hooks package uses Wagmi CLI to auto-generate typed hooks from contract ABIs:

1. Add contract to `/packages/hooks/src/contracts.ts` (mainnet) or `l2Contracts` (Base)
2. Run `pnpm -F hooks generate` to fetch ABIs from Etherscan and generate typed hooks
3. Generated hooks appear in `/packages/hooks/src/generated.ts`
4. Use retry script if generation fails: `pnpm -F hooks generate:retry`

For local/unverified contracts:
- Add ABI JSON files to `/packages/hooks/abis/`
- Uncomment the local contracts section in `wagmi.config.ts`
- Add imports and configure contracts array

## Development Patterns

### React Components
- Use functional components with TypeScript
- Component files: PascalCase (`Button.tsx`)
- Props type: `ComponentNameProps` (use type aliases, not interfaces)
- Hooks: camelCase (`useWallet.ts`)
- Tests: kebab-case co-located (`button-test.tsx`)
- One component per file, group related components in feature folders

### Web3 Integration
- Use Wagmi hooks for contract interactions (`useContractRead`, `useContractWrite`)
- Handle transaction lifecycle: pending, success, error states
- Provide user-friendly error messages with proper error handling
- Use generated contract types from ABIs for type safety
- Implement proper caching (`cacheTime`, `staleTime`) and watching for reads
- Use mock wallet mode for testing (`VITE_USE_MOCK_WALLET=true`)

### Styling
- Use Tailwind CSS v4 utility classes
- Radix UI for accessible primitives
- `class-variance-authority` (cva) for component variants
- `tailwind-merge` (cn helper) for conditional classes
- CSS variables for theming (defined in root styles)
- Mobile-first responsive design approach

### Testing

#### Unit Tests
- Co-locate tests with source files (`.test.ts(x)`)
- Mock blockchain calls and external dependencies
- Use Vitest globals (`describe`, `it`, `expect`)
- Use `@testing-library/react` for component testing
- Reset mocks between tests with proper cleanup

#### E2E Tests
- Located in `/apps/webapp/src/test/e2e/tests/`
- Use Playwright with fixtures from `fixtures-parallel.ts`
- Tenderly VNets provide consistent blockchain state via snapshots
- Account pool system ensures test isolation (100 unique accounts)
- Tests must claim unique accounts via `testAccount` fixture
- Never release accounts - they stay claimed for duration of test suite
- VNet snapshots are validated before use and reused when healthy
- Run with `pnpm e2e` (handles VNet lifecycle) or `pnpm e2e:ui` for debugging

**E2E Testing Architecture:**
- Global setup validates/creates VNet snapshots with funded accounts
- Each test worker gets a unique account from the pool (atomic claiming)
- Mock wallet connector injects test account into browser context
- Parallel execution without interference (up to 100 concurrent tests)
- See `/apps/webapp/src/test/e2e/PARALLEL_TESTING_ARCHITECTURE.md` for details

### Adding New Features

#### New Smart Contract Integration
1. Add contract address/name to `/packages/hooks/src/contracts.ts`
2. Run `pnpm -F hooks generate` to generate typed hooks
3. Create custom hooks in `/packages/hooks/src/` wrapping generated hooks
4. Add hook documentation in `/packages/hooks/src/<feature>/README.md`
5. Export from `/packages/hooks/src/index.ts`

#### New Widget
1. Create widget in `/packages/widgets/src/` following existing patterns
2. Define `WidgetProps` interface with required props
3. Use hooks from `@jetstreamgg/sky-hooks` package
4. Style with Tailwind and Radix UI primitives
5. Export from `/packages/widgets/src/index.ts`
6. Add tests and update documentation

#### New Webapp Feature
1. Create module in `/apps/webapp/src/modules/<feature>/`
2. Add routes in `/apps/webapp/src/pages/`
3. Use existing hooks from `@jetstreamgg/sky-hooks`
4. Use existing widgets from `@jetstreamgg/sky-widgets`
5. Add i18n messages with `<Trans>` macro from Lingui
6. Extract and compile messages with `pnpm messages`

## Environment Variables

Required for development (create `.env` from `.env.example`):

```bash
# Required for testing with Tenderly
TENDERLY_API_KEY=your_api_key

# RPC providers (optional, defaults available)
VITE_RPC_PROVIDER_MAINNET=https://...
VITE_RPC_PROVIDER_BASE=https://...
VITE_RPC_PROVIDER_ARBITRUM=https://...
VITE_RPC_PROVIDER_OPTIMISM=https://...

# Wallet connection
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# API endpoints
VITE_AUTH_URL=https://...
VITE_BA_LABS_API_URL=https://...

# Testing modes
VITE_USE_MOCK_WALLET=true  # Enable mock wallet for testing
```

## Performance Optimization

- Use `React.memo` for expensive components
- Implement `useMemo` for costly computations
- Use `useCallback` for function props
- Batch state updates when possible
- Optimize contract reads with proper caching and staleTime
- Use multicall for batching blockchain reads
- Implement code splitting for routes and heavy components

## Changesets Workflow

This monorepo uses Changesets for versioning and publishing:

**For contributors:**
- Run `pnpm changeset` after making changes to packages
- Follow prompts to document changes (patch/minor/major)
- Commit the generated changeset file

**For maintainers:**
- Run `pnpm changeset version` to update package versions and CHANGELOGs
- Merge version changes to main branch
- Run `pnpm changeset:release` to publish to NPM and create git tags

## Key Constraints

- **Node.js**: v18+ required
- **pnpm**: v8+ required (enforced by preinstall script)
- **TypeScript**: Strict mode enabled
- **Module System**: ESM only (type: "module")
- **Build Target**: ESNext with bundler module resolution
- **Package Manager**: Only pnpm is allowed (use `pnpm dlx only-allow pnpm`)

## Common Development Tasks

### Running a Single Test
```bash
# Unit test
pnpm -F hooks test -- <test-file-pattern>

# E2E test  
pnpm -F webapp e2e -- <test-file-name>
```

### Debugging E2E Tests
```bash
# Interactive UI mode
pnpm e2e:ui

# With browser visible
pnpm -F webapp e2e -- --headed

# Debug specific test
pnpm -F webapp e2e -- --debug <test-name>
```

### Working with Packages in Development
```bash
# Watch mode for all packages
pnpm dev:packages

# Watch specific package
pnpm -F hooks dev
pnpm -F widgets dev
```

### Clearing Build Cache
```bash
# Clean all dist folders and node_modules
rm -rf packages/*/dist apps/*/dist
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

### Tenderly VNet Troubleshooting
If E2E tests fail with VNet errors:
```bash
# Delete all VNets and start fresh
pnpm vnet:delete:all

# Recreate snapshots with fresh funding
pnpm vnet:snapshots:recreate

# Reset everything and run tests
pnpm vnet:reset && pnpm e2e
```
