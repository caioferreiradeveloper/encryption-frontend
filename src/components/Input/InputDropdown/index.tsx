// React imports
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { Controller } from "react-hook-form";

// Interface imports
import type { InputDropdownProps } from "./interfaces";

// Style imports
import styles from './InputDropdown.module.scss';


// InputDropdown Component
const InputDropdown: React.FC<InputDropdownProps> = ({required = true, disabled = false, ...props}) => {

  // Return Component
  return (
    <div className={styles.customInputContainer}>

      {/* Label */}
      {props.label && (
        <label htmlFor={props.name} className={styles.customInputLabel}>
          {props.label} {required && <span>*</span>}
        </label>
      )}

      {/* Controller */}
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({ field }) => (
          <>
            {/* Dropdown Field */}
            <Dropdown
              id={props.name}
              name={props.name}
              editable
              options={props.options}
              emptyMessage={props.emptyMessage}
              onChange={(e) => {
                field.onChange(e.value);
              }}
              placeholder={props.placeholder}
              disabled={disabled}
              className={`${styles.dropdown} ${props.error ? "p-invalid" : ""}`}
              value={field.value}
              required={required}
              optionLabel={props.optionLabel}
              optionValue={props.optionValue}
            />
          </>
        )}
      />
      
      {/* Error message */}
      {props.error && <small className={styles.errorMesasge}>{props.error.message}</small>}

    </div>
  );
};

// Export InputDropdown
export default InputDropdown;