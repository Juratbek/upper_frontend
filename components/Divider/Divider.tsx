import { FC, useMemo } from 'react';
import { getClassName } from 'utils/common';

import classes from './Divider.module.scss';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({
  className = '',
  type = 'horisontal',
}): JSX.Element => {
  const rootClassName = useMemo(
    () => getClassName(classes.divider, className, classes[`divider--${type}`]),
    [className, type],
  );

  return <div className={rootClassName} />;
};
