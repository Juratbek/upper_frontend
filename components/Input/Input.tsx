import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Input.module.scss';
import { TInputProps } from './Input.types';

export const Input: FC<TInputProps> = ({ className, ...props }) => {
  const rootClassName = getClassName(className, classes.input);

  return <input {...props} className={rootClassName} />;
};
