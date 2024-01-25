import { SearchInput } from 'components';
import { AuthButton, Logo } from 'components/molecules';
import { FC } from 'react';

import classes from './LandingHeader.module.scss';

export const LandingHeader: FC = () => {
  return (
    <div className={`${classes.root} container`}>
      <Logo />
      <SearchInput />
      <AuthButton>Kirish</AuthButton>
    </div>
  );
};
