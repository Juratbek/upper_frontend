import { Badge, Link } from 'components/lib';
import { FC } from 'react';
import { getClassName } from 'utils';
import { BLUE } from 'variables/colors';

import classes from './NavItem.module.scss';
import { INavItemProps } from './NavItem.types';

export const NavItem: FC<INavItemProps> = ({
  active,
  icon: Icon,
  text,
  className,
  badge,
  ...props
}) => {
  const rootClassName = getClassName(classes.root, active && classes.active, className);
  return (
    <Link {...props} className={rootClassName}>
      {Icon && <Icon width={20} height={20} color={active ? BLUE[500] : 'black'} />}
      {text}
      {Boolean(badge) && <Badge>{badge}</Badge>}
    </Link>
  );
};
