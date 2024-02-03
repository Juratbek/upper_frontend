import { ButtonHTMLAttributes, FC } from 'react';

import classes from './Clickable.module.scss';

export const Clickable: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`${classes.root} ${className}`} {...props}>
    {children}
  </button>
);
