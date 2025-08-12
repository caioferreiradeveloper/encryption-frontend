// React imports
import React from "react"
import { InputTextarea } from 'primereact/inputtextarea';

// Interface imports
import type { TextAreaProps } from "./interfaces";

// Style imports
import styles from './InputTextarea.module.scss';


// TextAreaInput Component
const TextAreaInput: React.FC<TextAreaProps> = ({required = true, disabled = false, rows = 4, ...props}) => {

  // Return Component
  return (
    <div className={styles.customInputContainer}>
      
      {/* Label */}
      {props.label && (
        <label htmlFor={props.name} className={styles.customInputLabel}>
          {props.label} {required && <span>*</span>}
        </label>
      )}

      {/* Input Textarea */}
      <InputTextarea
        style={{
          width: '100% !important'
        }}
        rows={rows}
        placeholder={props.placeholder}
        autoResize
        id={props.name}
        disabled={disabled}
        className={`w-full ${styles.customInputTextarea} ${props.error ? styles.invalidInput : ""}`}
        {...props.register}
        autoComplete="off"
      />

      {/* Error message */}
      <div style={{ paddingTop: '5px'}}></div>
      {props.error && <small className={styles.errorMesasge}>{props.error.message}</small>}

    </div>
  );
};

// Export TextAreaInput
export default TextAreaInput;
