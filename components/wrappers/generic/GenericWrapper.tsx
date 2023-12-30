import { BottomNavigation, MainNavigation, Sidebar } from 'components/organisms';
import { useDevice } from 'hooks';
import { FC, useMemo } from 'react';

import classes from './GenericWrapper.module.scss';
import { IGenericWrapperProps } from './GenericWrapper.types';

export const GenericWrapper: FC<IGenericWrapperProps> = ({
  children,
  sidebar = <Sidebar />,
  ...props
}) => {
  const { isDesktop } = useDevice();

  const navigation = useMemo(() => {
    const { navigation } = props;

    if (navigation === null) return navigation;

    if (navigation) return navigation;

    if (isDesktop) return <MainNavigation />;

    return <BottomNavigation />;
  }, [props.navigation, isDesktop]);

  return (
    <div className={`${classes.root} container`}>
      <nav className={classes.navigation}>{navigation}</nav>
      <main className={classes.main}>{children}</main>
      <aside className={classes.sidebar}>{sidebar}</aside>
    </div>
  );
};
