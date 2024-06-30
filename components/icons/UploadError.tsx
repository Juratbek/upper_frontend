import { IIconProps } from './types';

export const UploadErrorIcon = ({ color = 'black', width = 20, height = 20 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <g>
      <path
        d='M19 19H6C3.23858 19 1 16.7614 1 14C1 11.35 3.06162 9.18137 5.6685 9.01074C6.00446 8.30038 6.45733 7.65576 7.00088 7.10107M19 19L5 5M19 19L21 21M10 5.28988C10.6337 5.10128 11.305 5 12 5C15.5267 5 18.4442 7.60802 18.9292 11.0006C18.9528 11.0002 18.9773 11 19.001 11C21.2101 11 22.9995 12.7909 22.9995 15C22.9995 15.9459 22.672 16.8152 22.123 17.5'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
