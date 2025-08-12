// Export interface InputTextProps
export interface InputTextProps extends React.HTMLAttributes<HTMLElement> {
  type: 'text' | 'email';
  placeholder?: string;
  label?: string;
  required?: boolean;
  icon?: string;
  name: string;
  register: any;
  error: any;
  disabled?: boolean;
  mask?: string;
  unmask?: boolean;
  defaultValue?: string;
}