import * as React from 'react';
import { toast as sonnerToast, ExternalToast } from 'sonner';

// Infer the classNames type from ExternalToast
type InferredClassNames = ExternalToast extends { classNames?: infer C } ? C : never;

// Types for backward compatibility
export type Toast = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'success' | 'failure' | 'info' | 'custom' | 'chat';
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  // Additional props for compatibility
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Custom class names - inferred from Sonner's ExternalToast type
  classNames?: InferredClassNames;
};

type ToastReturn = {
  id: string | number;
  dismiss: () => void;
  update: (props: Toast) => void;
};

// Map our variants to Sonner's toast types
const mapVariantToSonnerType = (
  props: Omit<Toast, 'variant'>
): { content: React.ReactNode; options: ExternalToast } => {
  const { title, description, action, icon, duration, onClose, classNames, ...rest } = props;

  // For Sonner, the main content is the first argument
  // If we have both title and description, title becomes the main content
  // and description stays as the description option
  const content = title || description;

  // Build Sonner options
  const sonnerOptions: ExternalToast = {
    // Only set description if we have both title and description
    description: title && description ? description : undefined,
    duration: duration !== undefined ? duration : 4000,
    icon,
    onDismiss: onClose,
    action: action as ExternalToast['action'],
    classNames,
    ...rest
  };

  return { content, options: sonnerOptions };
};

// Main toast function with backward compatibility
export function toast(props: Toast & { id?: string }): ToastReturn {
  const { variant, id, ...restProps } = props;

  let toastId: string | number;
  const { content, options: sonnerOptions } = mapVariantToSonnerType(restProps);

  // Handle different variants
  switch (variant) {
    case 'success':
      toastId = sonnerToast.success(content, { id, ...sonnerOptions });
      break;
    case 'failure':
      toastId = sonnerToast.error(content, { id, ...sonnerOptions });
      break;
    case 'info':
      toastId = sonnerToast.info(content, { id, ...sonnerOptions });
      break;
    case 'chat':
    case 'custom':
      // For chat and custom variants, pass the content directly
      // Sonner will handle React elements properly
      toastId = sonnerToast(content, { id, ...sonnerOptions });
      break;
    default:
      toastId = sonnerToast(content, { id, ...sonnerOptions });
  }

  return {
    id: toastId,
    dismiss: () => sonnerToast.dismiss(toastId),
    update: (updateProps: Toast) => {
      const { ...updateOptions } = updateProps;
      const { content: updatedContent, options: updatedOptions } = mapVariantToSonnerType(updateOptions);

      // Update based on variant
      if (updateProps.variant === 'success') {
        sonnerToast.success(updatedContent, { id: toastId, ...updatedOptions });
      } else if (updateProps.variant === 'failure') {
        sonnerToast.error(updatedContent, { id: toastId, ...updatedOptions });
      } else if (updateProps.variant === 'info') {
        sonnerToast.info(updatedContent, { id: toastId, ...updatedOptions });
      } else {
        sonnerToast(updatedContent, { id: toastId, ...updatedOptions });
      }
    }
  };
}

// Hook for managing toasts (simplified since Sonner handles state internally)
export function useToast() {
  // Get all active toasts from Sonner (this is for compatibility)
  const [toasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((toastId?: string | number) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  }, []);

  return {
    toasts,
    toast,
    dismiss
  };
}

// Re-export for convenience
export { sonnerToast };
