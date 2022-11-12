import { Badge } from 'components';
import { FC, useState } from 'react';
import { getClassName } from 'utils';

import classes from './NavItem.module.scss';
import { INavItemProps } from './NavItem.types';

export const NavItem: FC<INavItemProps> = ({ active, icon, badge, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icon;
  const iconClassName = getClassName(classes.icon);
  const rootClassName = getClassName(
    props.className,
    classes.root,
    active && classes['root--active'],
  );

  const toggleHover = (): void => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div {...props} className={rootClassName} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      {badge ? <Badge color={active || isHovered ? 'outline-blue' : 'blue'}>{badge}</Badge> : null}
      <a className={iconClassName}>
        <Icon {...((active || isHovered) && { color: 'white' })} />
      </a>
    </div>
  );
};
