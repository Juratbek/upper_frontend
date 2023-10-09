import { Spinner } from 'components';
import { useTheme } from 'hooks';
import { forwardRef, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Component(
  { children, loading = false, rounded = false, ...props },
  ref,
) {
  const { color = 'primary', size = 'medium' } = props;
  const { theme } = useTheme();
  const className = useMemo(
    () =>
      getClassName(
        classes.button,
        classes[color],
        props.className,
        loading && classes.loading,
        rounded && classes.rounded,
      ),
    [props.className, color, props.disabled, size, theme, loading],
  );

  const loader = useMemo(() => {
    if (typeof props.loader === 'function') return props.loader();
    if (props.loader) return props.loader;
    return <Spinner className={classes.spinner} />;
  }, [props.loader, color]);

  const content = useMemo(() => {
    if (loading) return loader;
    return children;
  }, [loading, children]);

  return (
    <button ref={ref} {...props} className={className} disabled={props.disabled || loading}>
      {content}
    </button>
  );
});
