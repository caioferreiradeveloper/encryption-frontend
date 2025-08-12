// Export interface TextAreaProps
export interface TextAreaProps extends React.HTMLAttributes<HTMLElement> {
  placeholder?: string;
  label?: string;
  required?: boolean;
  icon?: string;
  name: string;
  register: any;
  error: any;
  disabled?: boolean;
  rows?: number;
}