// React imports
import type { Control, Path, RegisterOptions } from "react-hook-form";


// Export interface InputDropdownProps
export interface InputDropdownProps {
  placeholder?: string;
  label?: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  options: any[];
  emptyMessage: string;
  onChange?: (e: { value: any }) => void;
  value?: any;
  optionLabel?: string;
  optionValue?: string;
  control: Control<any, any>;
    error?: any;
    rules?: Omit<
      RegisterOptions<any, Path<any>>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
}