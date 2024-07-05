import { IIconProps } from './types';

export const CopyIcon = ({
  width = 24,
  height = 24,
  color = '#003D80',
  opacity = 1,
}: IIconProps) => (
  <svg role='icon' width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M6.00044 6.12787L6 15.75C6 18.75 6.75 19.5 9.50344 19.492L9.75 19.5L16.3716 19.5011C16.0624 20.3744 15.2293 21 14.25 21H9C6 21 4.5 19.492 4.5 16.5V8.25C4.5 7.27017 5.12631 6.43663 6.00044 6.12787ZM17.25 3C18.4926 3 19.5 4.00736 19.5 5.25V15.75C19.5 16.9926 18.4926 18 17.25 18H9.75C8.25 18 7.5 17.25 7.5 15.75V5.25C7.5 4.00736 8.50736 3 9.75 3H17.25ZM17.25 4.5H9.75C9.33579 4.5 9 4.83579 9 5.25V15.75C9 16.1642 9.33579 16.5 9.75 16.5H17.25C17.6642 16.5 18 16.1642 18 15.75V5.25C18 4.83579 17.6642 4.5 17.25 4.5Z'
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);
