export interface ToastProps {
    title: string;
    description: string;
    action?: React.ReactNode;
    open: boolean;
    onOpenChange?: (open: boolean) => void;
  }
  
  export type ToastActionElement = React.ReactElement;
  