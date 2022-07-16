import { FC } from 'react';

import classes from './Label.module.css';
import { ILabelProps } from './Label.types';

export const Label: FC<ILabelProps> = ({ className, children }) => {
  return <span className={`${classes.label} ${className}`}>{children}</span>;
};
