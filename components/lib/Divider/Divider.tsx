import { FC, useMemo } from 'react';
import { getClassName } from 'utils/common/common';
import { computeStyles } from 'utils/style';

import classes from './Divider.module.scss';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({
  className = '',
  type = 'horisontal',
  color = 'primary',
  my,
  ...props
}): JSX.Element => {
  const rootClassName = useMemo(
    () => getClassName(classes.divider, className, classes[`divider--${type}`]),
    [className, type],
  );
  const style = computeStyles(
    { backgroundColor: `var(--divider-${color}-background)` },
    props.style,
    Boolean(my) && { marginTop: my, marginBottom: my },
  );

  return <div className={rootClassName} {...props} style={style} />;
};
