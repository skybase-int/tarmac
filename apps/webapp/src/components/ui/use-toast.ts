import { toast as sonnerToast, ExternalToast, Toaster } from 'sonner';

// Re-export Sonner's toast function directly
export const toast = sonnerToast;

// Re-export useful types from Sonner
export type ToastOptions = ExternalToast;
export type ToastClassnames = ExternalToast extends { classNames?: infer C } ? C : never;

// Simple hook that provides access to toast functions
// This abstraction makes it easier to switch libraries in the future if needed
export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
    // Re-export all toast variants for convenience
    success: sonnerToast.success,
    error: sonnerToast.error,
    info: sonnerToast.info,
    warning: sonnerToast.warning,
    loading: sonnerToast.loading,
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
    message: sonnerToast.message
  };
}

// Re-export Sonner components
export { Toaster };

// Re-export the entire sonnerToast for advanced usage
export { sonnerToast };
