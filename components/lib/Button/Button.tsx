import { Spinner } from 'components/lib';
import { useTheme } from 'hooks';
import { forwardRef, useMemo } from 'react';
import { getClassName } from 'utils/common';
import { computeStyles } from 'utils/style';

import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Component(
  { children, loading = false, ...props },
  ref,
) {
  const { color = 'primary', size = 'medium' } = props;
  const { theme } = useTheme();
  const className = useMemo(
    () => getClassName(classes.button, props.className, loading && classes.loading),
    [props.className, props.disabled, size, theme, loading],
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

  const style = useMemo(
    () =>
      computeStyles(
        {
          backgroundColor: `var(--btn-${color}-bg)`,
          color: `var(--btn-${color}-text)`,
          border: `1px solid var(--btn-${color}-border)`,
        },
        props.style,
      ),
    [props.style, color],
  );

  return (
    <button
      ref={ref}
      {...props}
      className={className}
      disabled={props.disabled ?? loading}
      style={style}
    >
      {content}
    </button>
  );
});
