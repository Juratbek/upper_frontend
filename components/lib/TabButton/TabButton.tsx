import { forwardRef, useMemo } from 'react';
import { getClassName } from 'utils';
import { computeStyles } from 'utils/style';

import classes from './TabButton.module.scss';
import { IButtonProps } from './TabButton.types';

export const TabButton = forwardRef<HTMLButtonElement, IButtonProps>(function Component(
  { children, ...props },
  ref,
) {
  const { color = 'primary' } = props;
  const rootClassName = useMemo(
    () => getClassName(classes.button, classes[color], props.className),
    [props.className, color, props.disabled],
  );
  const style = computeStyles(
    {
      backgroundColor: `var(--tab-btn-${props.color}-bg)`,
      color: `var(--tab-btn-${props.color}-text)`,
      border: `1px solid var(--tab-btn-${props.color}-border)`,
    },
    props.style,
  );

  return (
    <button ref={ref} {...props} className={rootClassName} style={style}>
      {children}
    </button>
  );
});
