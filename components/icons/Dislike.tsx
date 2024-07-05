import { IIconProps } from './types';

export const DislikeIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg width={width} role='icon' height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M17 13L13 22C12.2044 22 11.4413 21.6839 10.8787 21.1213C10.3161 20.5587 10 19.7956 10 19V15H4.34003C4.05012 15.0033 3.76297 14.9435 3.49846 14.8248C3.23395 14.7061 2.99842 14.5313 2.80817 14.3125C2.61793 14.0937 2.47753 13.8362 2.39669 13.5577C2.31586 13.2793 2.29652 12.9866 2.34003 12.7L3.72003 3.7C3.79235 3.22309 4.0346 2.78839 4.40212 2.47599C4.76965 2.16359 5.2377 1.99454 5.72003 2H17M17 13V2M17 13H19.67C20.236 13.01 20.7859 12.8119 21.2154 12.4432C21.645 12.0745 21.9242 11.5609 22 11V4C21.9242 3.43905 21.645 2.9255 21.2154 2.55681C20.7859 2.18813 20.236 1.98999 19.67 2H17'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
