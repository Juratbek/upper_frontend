import { Badge } from 'components';
import { useTheme } from 'hooks';
import { FC, useState } from 'react';
import { getClassName } from 'utils';

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
      {badge ? <Badge>{badge}</Badge> : null}
      <a className={iconClassName}>
        <Icon color={themeColors.icon} {...((active || isHovered) && { color: '#54a9eb' })} />
      </a>
    </div>
  );
};
