#!/bin/bash

# First, run stake.spec.ts in isolation with a single worker
# Global setup will handle snapshot revert/funding automatically
echo "🎯 Running stake.spec.ts in isolation first..."
pnpm playwright test stake.spec.ts --config=playwright-parallel.config.ts --workers=1

STAKE_EXIT_CODE=$?

if [ $STAKE_EXIT_CODE -ne 0 ]; then
  echo "❌ stake.spec.ts failed"
  echo "Continuing with other tests..."
fi

# Now run all OTHER tests in parallel (excluding stake.spec.ts)
# Global setup already ran, so tests will use existing funded state
echo ""
echo "🚀 Running remaining E2E tests in parallel..."
pnpm playwright test --config=playwright-parallel.config.ts --grep-invert="stake.spec.ts"

PARALLEL_EXIT_CODE=$?

if [ $PARALLEL_EXIT_CODE -ne 0 ]; then
  echo ""
  echo "⚠️ Some tests failed. Re-running failed tests serially..."
  echo ""

  # Revert VNets to snapshots before retry (clean state with funded accounts)
  echo "🔄 Reverting VNets to snapshots for clean retry..."
  node src/test/e2e/revert-vnets.ts || echo "No snapshots to revert (first run)"

  # Re-run only the failed tests with a single worker
  # VNets are now in clean snapshot state with funded accounts
  pnpm playwright test --last-failed --workers=1 --config=playwright-parallel.config.ts

  RETRY_EXIT_CODE=$?

  if [ $RETRY_EXIT_CODE -eq 0 ]; then
    # Check if stake test passed
    if [ $STAKE_EXIT_CODE -eq 0 ]; then
      echo "✅ All tests passed after retry!"
      exit 0
    else
      echo "⚠️ All parallel tests passed after retry, but stake.spec.ts failed"
      exit 1
    fi
  else
    echo "❌ Some tests still failing after retry"
    exit 1
  fi
else
  # Check if stake test passed
  if [ $STAKE_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed on first run!"
    exit 0
  else
    echo "⚠️ All parallel tests passed, but stake.spec.ts failed"
    exit 1
  fi
fi