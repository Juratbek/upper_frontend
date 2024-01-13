import { SearchInput } from 'components';
import { Button } from 'components/lib';
import { Logo } from 'components/molecules';
import { FC } from 'react';

import classes from './LandingHeader.module.scss';

export const LandingHeader: FC = () => {
  return (
    <div className={`${classes.root} container`}>
      <Logo />
      <SearchInput />
      <Button>Kirish</Button>
    </div>
  );
};
