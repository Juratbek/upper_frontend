import { FC, HTMLAttributes, useState } from 'react';
import { TIconComponent } from 'types';
import { getClassName } from 'utils';

import classes from './NavItem.module.scss';

interface INavItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: TIconComponent;
  active?: boolean;
}

export const NavItem: FC<INavItemProps> = ({ active, icon, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icon;
  const iconClassName = getClassName(classes.icon, active && classes['icon--active']);

  const toggleHover = (): void => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div {...props} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <a className={iconClassName}>
        <Icon {...((active || isHovered) && { color: 'white' })} />
      </a>
    </div>
  );
};
