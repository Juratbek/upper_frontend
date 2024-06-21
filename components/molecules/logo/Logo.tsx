import { Link } from 'components/lib';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables/icons';

import classes from './Logo.module.scss';

const LogoImage = ICONS.logo;

export const Logo: FC = () => {
  const { themeColors } = useTheme();

  return (
    <Link href='/' className={classes.container}>
      <LogoImage color={themeColors.icon} />
    </Link>
  );
};
