import { IIconProps } from './types';

export const SaveIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' role='icon'>
    <path
      d='M16.0166 3.66675H7.98327C6.20827 3.66675 5 4.73333 5 6.5V21.5L11.2249 17.7751C11.6583 17.5334 12.3583 17.5334 12.7833 17.7751L19 21.5V6.5C18.9917 4.73333 17.7916 3.66675 16.0166 3.66675Z'
      fill='white'
      fillOpacity='0.2'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
