import { FC, useMemo } from 'react';

import classes from './Button.module.css';
import { IButtonProps } from './Button.types';

export const Button: FC<IButtonProps> = ({ children, color = 'dark', ...props }) => {
  const className = useMemo(
    () => `${classes.button} ${classes[color]} ${props.className}`,
    [props.className, color],
  );

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
