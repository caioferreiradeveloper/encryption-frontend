// React imports
import React from "react";
import { Controller } from "react-hook-form";
import { Password } from "primereact/password";

// Interface imports
import type { InputPasswordProps } from "./interfaces";

// Style imports
import styles from './InputPassword.module.scss';


// InputPassword Component
const InputPassword: React.FC<InputPasswordProps> = ({toggleMask = true, ...props}) => {
  return (
    <div className={styles.customInputContainer}>

      {/* Label */}
      {props.label && (
        <label htmlFor={props.name} className={styles.customInputLabel}>
          {props.label} <span>*</span>
        </label>
      )}

      {/* Controller */}
      <Controller
        name={props.name}
        control={props.control}
        rules={{ required: 'Senha obrigatória' }}
        render={({ field }) => (

          // Password Field
          <Password
            {...field}
            id={props.name}
            toggleMask={toggleMask}
            feedback={false}
            placeholder={props.placeholder}
            inputClassName={`${styles.customInput} ${props.error ? "p-invalid" : ""}`}
            className={styles.customInputContainer}
            autoComplete="off"
            pt={{
              input: {
                root: { className: styles.customInput } 
              },
             
            }}
          />
        )}
      />

      {/* Error message */}
      {props.error && <small className="p-error">{props.error.message}</small>}

    </div>
  );
};

// Export InputPassword
export default InputPassword;
