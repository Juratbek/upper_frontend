import { IIconProps } from './types';

export const CommentIcon = ({
  width = 24,
  height = 24,
  color = 'black',
  variant = 'outlined',
}: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    {variant === 'fulfilled' && (
      <path
        d='M2 19.7307V6.05541C2 4.82811 2.99492 3.83319 4.22222 3.83319H19.7778C21.0051 3.83319 22 4.82811 22 6.05541V15.51C22 16.7373 21.0051 17.7322 19.7778 17.7322H7.5125C6.83742 17.7322 5.77723 18.5662 5.77723 18.5662L3.5 19.9999C3.5 19.9999 2 20.5163 2 19.7307Z'
        fill='#007AFF'
      />
    )}
    {variant === 'outlined' && (
      <path
        d='M2 19.6392V5.96392C2 4.73662 2.99492 3.7417 4.22222 3.7417H19.7778C21.0051 3.7417 22 4.73662 22 5.96392V15.4185C22 16.6458 21.0051 17.6407 19.7778 17.6407H7.5125C6.83742 17.6407 5.77723 18.4747 5.77723 18.4747L3.18724 20.0556C3.18724 20.0556 2 20.7213 2 19.6392Z'
        stroke={color}
        strokeWidth='1.4'
      />
    )}
    <path d='M6.5 13.0915H17.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M6.50101 9.09153L15.501 9.09149'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
