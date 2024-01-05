import { FC, HTMLAttributes } from 'react';

import classes from './Clickable.module.scss';

export const Clickable: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`${classes.root} ${className}`} {...props}>
    {children}
  </button>
);
