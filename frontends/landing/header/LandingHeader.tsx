import { SearchInput } from 'components';
import { AuthButton, Logo } from 'components/molecules';
import { MobileHeader, TabletHeader } from 'components/organisms';
import { useDevice } from 'hooks';
import { FC, useMemo } from 'react';

import classes from './LandingHeader.module.scss';

export const LandingHeader: FC = () => {
  const { isMobile, isTablet } = useDevice();

  const content = useMemo(() => {
    if (isMobile) return <MobileHeader />;
    if (isTablet) return <TabletHeader />;

    return (
      <div className={`container ${classes.desktop}`}>
        <Logo />
        <SearchInput />
        <AuthButton>Kirish</AuthButton>
      </div>
    );
  }, [isMobile, isTablet]);

  return <div className={classes.root}>{content}</div>;
};
