import { IIconProps } from './types';

export const NotificationIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg role='icon' width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <mask id='path-2-inside-1_630_4298' fill='white'>
      <path d='M4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5V17C19.5 17.5523 19.0523 18 18.5 18H5.5C4.94772 18 4.5 17.5523 4.5 17V10.5Z' />
    </mask>
    <path
      d='M4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5V17C19.5 17.5523 19.0523 18 18.5 18H5.5C4.94772 18 4.5 17.5523 4.5 17V10.5Z'
      stroke={color}
      strokeWidth='2.8'
      mask='url(#path-2-inside-1_630_4298)'
    />
    <path
      d='M16 17C16 17.5253 15.8965 18.0454 15.6955 18.5307C15.4945 19.016 15.1999 19.457 14.8284 19.8284C14.457 20.1999 14.016 20.4945 13.5307 20.6955C13.0454 20.8965 12.5253 21 12 21C11.4747 21 10.9546 20.8965 10.4693 20.6955C9.98396 20.4945 9.54301 20.1999 9.17157 19.8284C8.80014 19.457 8.5055 19.016 8.30448 18.5307C8.10346 18.0454 8 17.5253 8 17L12 17H16Z'
      fill={color}
    />
    <path d='M7 18H17V19H7V18Z' fill={color == 'black' ? 'white' : color} />
  </svg>
);
