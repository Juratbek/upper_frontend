import { forwardRef } from 'react';
import { getClassName } from 'utils';

import classes from './Input.module.scss';
import { TInputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, TInputProps>(function withRef(
  { className, ...props },
  ref,
) {
  const rootClassName = getClassName(className, classes.input);

  return <input {...props} ref={ref} className={rootClassName} />;
});
