// React imports
import React from "react";

// Interface imports
import type { ButtonTextProps } from "./interfaces";

// Style imports
import styles from './ButtonText.module.scss';


// Button Text Component
const ButtonText: React.FC<ButtonTextProps> = ({width = '100%', className = 'primaryColor', disabled = false, ...props}) => {

  // Return Component
  return (

    // Button
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={disabled}
      style={{ width: width }}
      className={`${styles.buttonText} ${styles[className]}`}
    >

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>

        {/* Start Icon */}
        {props.StartIcon && <props.StartIcon className={styles.icon} style={{ marginRight: '8px' }} />}

        {/* Label */}
        <p className={styles.textButton}>{props.label}</p>

        {/* End Icon */}
        {props.EndIcon && <props.EndIcon className={styles.icon} style={{ marginLeft: '8px' }} />}

      </div>

    </button>
  );
};

// Export ButtonText
export default ButtonText;