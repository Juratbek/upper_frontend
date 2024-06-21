import { BottomNavigation, Header, MainNavigation, Sidebar } from 'components/organisms';
import { useDevice } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import { COMMON_SPACE_FROM_TOP } from '.';
import classes from './GenericWrapper.module.scss';
import { IGenericWrapperProps } from './GenericWrapper.types';

export const GenericWrapper: FC<IGenericWrapperProps> = ({
  children,
  sidebar = <Sidebar />,
  ...props
}) => {
  const header = useMemo(() => {
    if (props.isHeaderHidden) return null;
    return props.header ?? <Header />;
  }, [props.header, props.isHeaderHidden]);

  return (
    <div className='flex-1'>
      {header}
      <div className={getClassName(classes.root, props.classes?.root)}>
        <nav
          className={getClassName(
            classes.navigation,
            props.areNavigationAndSidebarEqual && classes['normal-column'],
          )}
          style={{ top: COMMON_SPACE_FROM_TOP }}
        >
          <NavigationComponent {...props} />
        </nav>
        <main className={getClassName(classes.main, props.classes?.main, 'container')}>
          {children}
        </main>
        <aside
          className={getClassName(
            classes.sidebar,
            props.areNavigationAndSidebarEqual && classes['normal-column'],
          )}
          style={{ top: COMMON_SPACE_FROM_TOP }}
        >
          {props.isSidebarHidden ? null : sidebar}
        </aside>
      </div>
    </div>
  );
};

const NavigationComponent: FC<
  Pick<
    IGenericWrapperProps,
    'desktopNavigation' | 'tabletNavigation' | 'mobileNavigation' | 'isNavigationHidden'
  >
> = (props) => {
  const { isDesktop, isTablet, isMobile } = useDevice();

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
};
