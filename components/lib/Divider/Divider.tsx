import { FC, useMemo } from 'react';
import { getClassName } from 'utils/common';

import classes from './Divider.module.scss';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({
  className = '',
  type = 'horisontal',
  color,
}): JSX.Element => {
  const rootClassName = useMemo(
    () =>
      getClassName(
        classes.divider,
        className,
        classes[`divider--${type}`],
        color && classes[`divider--${color}`],
      ),
    [className, type, color],
  );

  return <div className={rootClassName} />;
};