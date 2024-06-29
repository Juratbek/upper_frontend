import { IIconProps } from './types';

export const SettingsIcon = ({ width = 20, height = 22, color = 'black' }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M12.3043 2H11.8643C11.3339 2 10.4594 2.12493 10.0843 2.5C9.70922 2.87507 9.8643 3.46957 9.8643 4V4.18C9.86394 4.53073 9.77135 4.87519 9.59583 5.17884C9.42032 5.48248 9.16803 5.73464 8.8643 5.91L8.4343 6.16C8.13026 6.33554 7.78537 6.42795 7.4343 6.42795C7.08322 6.42795 6.73833 6.33554 6.4343 6.16L6.2843 6.08C5.82536 5.81526 5.46017 5.36729 4.94834 5.50415C4.4365 5.64101 3.81985 6.35154 3.5543 6.81L3.3343 7.19C3.06956 7.64893 2.9138 8.49232 3.05066 9.00415C3.18753 9.51599 3.60583 9.65445 4.0643 9.92L4.2143 10.02C4.51657 10.1945 4.76792 10.4451 4.94335 10.7468C5.11878 11.0486 5.21219 11.391 5.2143 11.74V12.25C5.2157 12.6024 5.12395 12.949 4.94834 13.2545C4.77273 13.5601 4.5195 13.8138 4.2143 13.99L4.0643 14.08C3.60583 14.3456 3.18753 14.4923 3.05066 15.0042C2.9138 15.516 3.06956 16.3511 3.3343 16.81L3.5543 17.19C3.81985 17.6485 4.43151 18.3673 4.94335 18.5042C5.45518 18.641 5.82536 18.1847 6.2843 17.92L6.4343 17.84C6.73833 17.6645 7.08322 17.5721 7.4343 17.5721C7.78537 17.5721 8.13026 17.6645 8.4343 17.84L8.8643 18.09C9.16803 18.2654 9.42032 18.5175 9.59583 18.8212C9.77135 19.1248 9.86394 19.4693 9.8643 19.82V20C9.8643 20.5304 9.70922 21.1249 10.0843 21.5C10.4594 21.875 11.3339 22 11.8643 22H12.3043C12.8347 22 13.7231 21.8751 14.0981 21.5C14.4732 21.1249 14.3043 20.5304 14.3043 20V19.82C14.3047 19.4693 14.3972 19.1248 14.5728 18.8212C14.7483 18.5175 15.0006 18.2654 15.3043 18.09L15.7343 17.84C16.0383 17.6645 16.3832 17.5721 16.7343 17.5721C17.0854 17.5721 17.4303 17.6645 17.7343 17.84L17.8843 17.92C18.3432 18.1847 18.8885 18.641 19.4003 18.5042C19.9121 18.3673 20.3487 17.6485 20.6143 17.19L20.8343 16.8C21.099 16.3411 21.235 15.516 21.0981 15.0042C20.9613 14.4923 20.5628 14.3356 20.1043 14.07L19.9543 13.99C19.6491 13.8138 19.3959 13.5601 19.2202 13.2545C19.0446 12.949 18.9529 12.6024 18.9543 12.25V11.75C18.9529 11.3976 19.0446 11.051 19.2202 10.7455C19.3959 10.4399 19.6491 10.1862 19.9543 10.01L20.1043 9.92C20.5628 9.65445 21.013 9.51599 21.1499 9.00415C21.2868 8.49232 21.099 7.64893 20.8343 7.19L20.6143 6.81C20.3487 6.35154 19.9121 5.64101 19.4003 5.50415C18.8885 5.36729 18.3432 5.81526 17.8843 6.08L17.7343 6.16C17.4303 6.33554 17.0854 6.42795 16.7343 6.42795C16.3832 6.42795 16.0383 6.33554 15.7343 6.16L15.3043 5.91C15.0006 5.73464 14.7483 5.48248 14.5728 5.17884C14.3972 4.87519 14.3047 4.53073 14.3043 4.18V4C14.3043 3.46957 14.4594 2.87503 14.0843 2.49996C13.7092 2.12488 12.8347 2 12.3043 2Z'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12.0977 16C14.3068 16 16.0977 14.2091 16.0977 12C16.0977 9.79086 14.3068 8 12.0977 8C9.88852 8 8.09766 9.79086 8.09766 12C8.09766 14.2091 9.88852 16 12.0977 16Z'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
