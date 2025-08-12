// React imports
import { Dialog } from "primereact/dialog";
import React from "react";

// Interface imports
import type { DialogAlertProps } from "./interfaces";

// Style imports
import styles from './DialogAlert.module.scss';


// DialogAlert Component
const DialogAlert: React.FC<DialogAlertProps> = ({
  showHeader = true,
  showFooter = false,
  dismissableMask = true,
  closeOnEscape = true,
  width = '50vw',
  ...props
}) => {

  // Return Component
  return (

    // Dialog
    <Dialog
      header={showHeader ? props.title : null}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width }}
      className={`${styles.dialog} ${props.className}`}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      footer={showFooter ? (props.footerContent) : null}
      dismissableMask={dismissableMask}
      closable={true}
      closeOnEscape={closeOnEscape}
    >
      {/* Children */}
      <div className={styles.content}>
        {props.children}
      </div>

    </Dialog>
  );
};

// Export DialogAlert
export default DialogAlert;