import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { JSX } from 'react';

export const withErrorBoundary = (Component: JSX.Element) => {
  return <ErrorBoundary>{Component}</ErrorBoundary>;
};
