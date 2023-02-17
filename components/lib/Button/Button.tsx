import { Spinner } from 'components';
import { useTheme } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button: FC<IButtonProps> = ({ children, loading = false, ...props }) => {
  const { color = 'dark', size = 'medium' } = props;
  const { theme } = useTheme();
  const className = useMemo(
    () =>
      getClassName(
        classes.button,
        classes[`theme-${theme}`],
        props.disabled ? classes[`${color}-disabled`] : classes[color],
        classes[size],
        props.className,
      ),
    [props.className, color, props.disabled, size, theme],
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
