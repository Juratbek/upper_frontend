import { FC } from 'react';

import classes from './Clickable.module.scss';
import { IClickableProps } from './Clickable.types';

export const Clickable: FC<IClickableProps> = ({ children, className, ...props }) => (
  <button className={`${classes.root} ${className}`} {...props}>
    {children}
  </button>
);
