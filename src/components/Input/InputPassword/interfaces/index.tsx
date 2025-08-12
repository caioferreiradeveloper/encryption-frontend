// Export interface InputPasswordProps 
export interface InputPasswordProps extends React.HTMLAttributes<HTMLElement> {
  placeholder?: string;
  label: string;
  control: any;
  name: string;
  error: any;
  toggleMask?: boolean;
}