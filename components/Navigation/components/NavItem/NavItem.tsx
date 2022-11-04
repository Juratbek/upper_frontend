import { FC, HTMLAttributes, useState } from 'react';
import { TIconComponent } from 'types';
import { getClassName } from 'utils';

import classes from './NavItem.module.scss';

interface INavItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: TIconComponent;
  isActive?: boolean;
}

export const NavItem: FC<INavItemProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = props.icon;
  const iconClassName = getClassName(classes.icon, props.isActive && classes['icon--active']);

  const toggleHover = (): void => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div {...props} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <a className={iconClassName}>
        <Icon {...((props.isActive || isHovered) && { color: 'white' })} />
      </a>
    </div>
  );
};
