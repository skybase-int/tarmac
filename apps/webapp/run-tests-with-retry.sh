#!/bin/bash

echo "🚀 Running parallel E2E tests..."
pnpm e2e:parallel

if [ $? -ne 0 ]; then
  echo ""
  echo "⚠️ Some tests failed. Re-running failed tests serially..."
  echo ""

  # Re-run only the failed tests with a single worker
  pnpm e2e:parallel:retry-serial

  if [ $? -eq 0 ]; then
    echo "✅ All tests passed after retry!"
    exit 0
  else
    echo "❌ Some tests still failing after retry"
    exit 1
  fi
else
  echo "✅ All tests passed on first run!"
  exit 0
fi