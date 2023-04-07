import { Badge } from 'components';
import { useTheme } from 'hooks';
import { FC, useState } from 'react';
import { getClassName } from 'utils';
import { UPPER_BLUE_COLOR } from 'variables';

import classes from './NavItem.module.scss';
import { INavItemProps } from './NavItem.types';

export const NavItem: FC<INavItemProps> = ({ active, icon, badge, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { themeColors } = useTheme();
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
      {badge ? <Badge color='outline-blue'>{badge}</Badge> : null}
      <a className={iconClassName}>
        <Icon color={active || isHovered ? UPPER_BLUE_COLOR : themeColors.icon} />
      </a>
    </div>
  );
};
