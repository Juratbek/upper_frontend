import { BottomNavigation, Header, MainNavigation, Sidebar } from 'components/organisms';
import { useDevice } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './GenericWrapper.module.scss';
import { IGenericWrapperProps } from './GenericWrapper.types';

export const GenericWrapper: FC<IGenericWrapperProps> = ({
  children,
  sidebar = <Sidebar />,
  ...props
}) => {
  const { isDesktop, isTablet, isMobile, type } = useDevice();

  const navigation = useMemo(() => {
    const { desktopNavigation, tabletNavigation, mobileNavigation, isNavigationHidden } = props;

    if (isNavigationHidden) return null;

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
  }, [type, props]);

  const header = useMemo(() => {
    if (props.isHeaderHidden) return null;
    return props.header ?? <Header />;
  }, [props.header, props.isHeaderHidden]);

  return (
    <div className='flex-1'>
      {header}
      <div className={getClassName(classes.root, 'container', props.classes?.root)}>
        <nav className={classes.navigation}>{navigation}</nav>
        <main className={getClassName(classes.main, props.classes?.main)}>{children}</main>
        <aside className={classes.sidebar}>{sidebar}</aside>
      </div>
    </div>
  );
};
