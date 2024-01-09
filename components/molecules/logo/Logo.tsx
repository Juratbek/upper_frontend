import { Link } from 'components/lib';
import { FC } from 'react';
import { ICONS } from 'variables/icons';

import classes from './Logo.module.scss';

const LogoImage = ICONS.logo;

export const Logo: FC = () => {
  return (
    <Link href='/' className={classes.container}>
      <LogoImage />
    </Link>
  );
};
