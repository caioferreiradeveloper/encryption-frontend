// Export interface ButtonTextProps
export interface ButtonTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  width?: string;
  disabled?: boolean;
  className?: 'primaryColor' | 'googleColor' | 'githubColor' | 'addColor' | 'removeColor' | 'cleanColor' | 'primaryOutlineColor' | 'addOutlineColor' | 'removeOutlineColor';
  StartIcon?: React.ElementType;  
  EndIcon?: React.ElementType; 
}