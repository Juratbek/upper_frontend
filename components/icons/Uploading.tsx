import { IIconProps } from './types';

export const UploadingIcon = ({ color = 'black', width = 20, height = 20 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <g>
      <path
        d='M12 16V10M12 10L9 12M12 10L15 12M23 15C23 12.7909 21.2091 11 19 11C18.9764 11 18.9532 11.0002 18.9297 11.0006C18.4447 7.60802 15.5267 5 12 5C9.20335 5 6.79019 6.64004 5.66895 9.01082C3.06206 9.18144 1 11.3498 1 13.9999C1 16.7613 3.23858 19.0001 6 19.0001L19 19C21.2091 19 23 17.2091 23 15Z'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
