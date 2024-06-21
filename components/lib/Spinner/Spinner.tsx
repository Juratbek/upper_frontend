import { FC } from 'react';
import { getClassName } from 'utils/common';

import classes from './Spinner.module.scss';
import { ISpinnerProps } from './Spinner.types';

export const Spinner: FC<ISpinnerProps> = ({ variant = 'primary', className, style }) => {
  const rootClassName = getClassName(classes.spinner, classes[`spinner--${variant}`], className);
  return <div role='spinner' className={rootClassName} style={style} />;
};
