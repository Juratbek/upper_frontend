import { FC, useMemo } from 'react';
import { getClassName } from 'utils/common';

import classes from './Divider.module.css';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({ className = '' }): JSX.Element => {
  const rootClassName = useMemo(() => getClassName(classes.divider, className), [className]);

  return <div className={rootClassName} />;
};
