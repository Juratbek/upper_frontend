import { useTheme } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Label.module.scss';
import { ILabelProps } from './Label.types';

export const Label: FC<ILabelProps> = ({ children, color, ...props }) => {
  const { themeColors } = useTheme();
  const className = useMemo(
    () => getClassName(classes.label, props.className, classes[`label--${color}`]),
    [color, props.className],
  );
  return (
    <span {...props} className={className} style={{ color: themeColors.label.color }}>
      {children}
    </span>
  );
};
