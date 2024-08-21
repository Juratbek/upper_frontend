import { Badge, Link } from 'components/lib';
import { BLUE } from 'constants/colors';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { getClassName } from 'utils';

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
  const { themeColors } = useTheme();

  return (
    <Link {...props} className={rootClassName}>
      {Icon && <Icon width={20} height={20} color={active ? BLUE[500] : themeColors.icon} />}
      <p className='m-0 flex-1'>{text}</p>
      {Boolean(badge) && (
        <Badge color='red' className={classes.badge}>
          {badge}
        </Badge>
      )}
    </Link>
  );
};
