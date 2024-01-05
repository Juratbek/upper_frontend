import { BottomNavigation, Header, MainNavigation, Sidebar } from 'components/organisms';
import { useDevice } from 'hooks';
import { FC, useMemo } from 'react';

import classes from './GenericWrapper.module.scss';
import { IGenericWrapperProps } from './GenericWrapper.types';

export const GenericWrapper: FC<IGenericWrapperProps> = ({
  children,
  sidebar = <Sidebar />,
  ...props
}) => {
  const { isDesktop, isTablet, isMobile, type } = useDevice();

  const navigation = useMemo(() => {
    const { desktopNavigation, tabletNavigation, mobileNavigation } = props;

    if (isDesktop) {
      return desktopNavigation ?? <MainNavigation />;
    }

    if (isTablet) {
      return tabletNavigation ?? <BottomNavigation />;
    }

    if (isMobile) {
      return mobileNavigation ?? <BottomNavigation />;
    }

    return <MainNavigation />;
  }, [type]);

  const header = useMemo(() => {
    return props.header ?? <Header />;
  }, [props.header]);

  return (
    <>
      {header}
      <div className={`${classes.root} container`}>
        <nav className={classes.navigation}>{navigation}</nav>
        <main className={classes.main}>{children}</main>
        <aside className={classes.sidebar}>{sidebar}</aside>
      </div>
    </>
  );
};
