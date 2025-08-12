// React imports
import type { ReactNode } from "react";


// Export interface DialogAlertProps
export interface DialogAlertProps {
  visible: boolean;
  onHide: () => void;
  title: string;
  children: ReactNode;
  width?: string;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  footerContent?: ReactNode;
  dismissableMask?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
}