export interface IIconProps {
  color?: string;
  variant?: 'outlined' | 'fulfilled';
  width?: number;
  height?: number;
  opacity?: number;
}

export type TIconComponent = (props: IIconProps) => JSX.Element;
