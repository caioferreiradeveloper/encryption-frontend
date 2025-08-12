// React imports
import React from "react";

// Interface imports
import type { ButtonIconProps } from "./interfaces";

// Style imports
import styles from './ButtonIcon.module.scss';


// ButtonIcon Component
const ButtonIcon: React.FC<ButtonIconProps> = ({className = 'primaryColor', ...props}) => {

  // Return Component
  return (

    // Button
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.buttonIcon} ${styles[className]}`}
    > 

        {/* Icon */}
        {props.IconButton && <props.IconButton className={styles.icon} />}

    </button>
  );
};

// Export ButtonIcon
export default ButtonIcon;