import { useTheme } from 'hooks';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './IconButton.module.scss';
import { IIconButtonProps } from './IconButton.types';

export const IconButton: FC<IIconButtonProps> = ({ children, ...props }) => {
  const { theme } = useTheme();
  const className = getClassName(props.className, classes.button, classes[theme]);

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
