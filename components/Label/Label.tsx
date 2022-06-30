import { FC } from 'react';

import classes from './Label.module.css';
import { ILabelProps } from './Label.types';

export const Label: FC<ILabelProps> = ({ name, className }) => {
  return <span className={`${classes.label} ${className}`}>{name}</span>;
};
