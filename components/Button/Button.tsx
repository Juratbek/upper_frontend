import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button: FC<IButtonProps> = ({ children, color = 'dark', ...props }) => {
  const className = useMemo(
    () =>
      getClassName(
        classes.button,
        props.disabled ? `${classes[`${color}-disabled`]}` : classes[color],
        props.className,
      ),
    [props.className, color],
  );

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
