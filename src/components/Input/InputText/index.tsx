// React imports
import React from "react"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask";

// Interface imports
import type { InputTextProps } from "./interfaces";

// Style imports
import styles from './InputText.module.scss';


// TextInput Component
const TextInput: React.FC<InputTextProps> = ({required = true, disabled = false, unmask = true, ...props}) => {

  // Return Component
  return (
    <div className={styles.customInputContainer}>
      
      {/* Label */}
      {props.label && (
        <label htmlFor={props.name} className={styles.customInputLabel}>
          {props.label} {required && <span>*</span>}
        </label>
      )}

      {props.mask ? (
        <InputMask
          id={props.name}
          mask={props.mask}
          unmask={unmask}
          placeholder={props.placeholder}
          className={`w-full ${styles.customInput} ${props.error ? styles.invalidInput : ""}`}
          disabled={disabled}
          autoComplete="off"
          defaultValue={props.defaultValue}
          {...props.register}
        />
      ) : (
      
      <InputText
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={`w-full ${styles.customInput} ${props.error ? styles.invalidInput : ""}`}
        disabled={disabled}
        autoComplete="off"
        {...props.register}
      />
      )}

      {/* Error message */}
      {props.error && <small className={styles.errorMesasge}>{props.error.message}</small>}

    </div>
  );
};

// Export TextInput
export default TextInput;
