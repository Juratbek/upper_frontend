import { Logo as LogoImage } from 'components/icons';
import { Link } from 'components/lib';
import { useTheme } from 'hooks';
import { FC } from 'react';

import classes from './Logo.module.scss';

export const Logo: FC = () => {
  const { themeColors } = useTheme();

  return (
    <Link href='/' className={classes.container}>
      <LogoImage color={themeColors.icon} />
    </Link>
  );
};
