import React from "react";

export interface ToastProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  open: boolean;
  // Commenting out onOpenChange if not used to avoid lint errors
  // onOpenChange?: (open: boolean) => void;
}

export type ToastActionElement = React.ReactElement;

export function Toast({ title, description, action, open }: ToastProps) {
  if (!open) return null;

  return (
    <div className="toast">
      <div className="toast-header">
        <strong>{title}</strong>
        {action && <div className="toast-action">{action}</div>}
      </div>
      <div className="toast-body">{description}</div>
    </div>
  );
}
