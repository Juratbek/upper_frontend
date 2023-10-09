import { Link } from 'components/lib';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './NavItem.module.scss';
import { INavItemProps } from './NavItem.types';

export const NavItem: FC<INavItemProps> = ({ children, active, className, ...props }) => {
  const rootClassName = getClassName(classes.root, active && classes.active, className);
  return (
    <Link {...props} className={rootClassName}>
      {children}
    </Link>
  );
};
