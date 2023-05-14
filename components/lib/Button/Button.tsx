import { Spinner } from 'components';
import { useTheme } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import { BUTTON_SPINNER_COLORS } from './Button.constants';
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
        loading && classes.loading,
      ),
    [props.className, color, props.disabled, size, theme, loading],
  );

  return (
    <button {...props} className={className} disabled={props.disabled || loading}>
      {loading ? (
        <Spinner className={classes.spinner} color={BUTTON_SPINNER_COLORS[color]} />
      ) : (
        children
      )}
    </button>
  );
};
