
// Export interface ButtonIconProps
export interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: 'primaryColor' | 'googleColor' | 'githubColor' | 'addColor' | 'transparentColor';
  IconButton?: React.ElementType;
}