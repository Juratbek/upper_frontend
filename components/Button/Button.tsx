import { Spinner } from 'components';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button: FC<IButtonProps> = ({ children, loading = false, ...props }) => {
  const { color = 'dark' } = props;
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
    <button {...props} className={className} disabled={props.disabled || loading}>
      {loading ? (
        <div className='px-3'>
          <Spinner className={classes.spinner} color={color} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
