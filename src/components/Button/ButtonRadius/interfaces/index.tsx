// Export interface ButtonRadiusProps
export interface ButtonRadiusProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textChildren: string,
  classNameButton?: 'btnRadiusWriteColor' | 'btnRadiusTertiaryColor' | 'redColor';
  routeTo?: string;
}