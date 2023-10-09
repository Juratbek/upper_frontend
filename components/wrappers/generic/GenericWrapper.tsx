import { Navigation, Sidebar } from 'components/shared';
import { FC } from 'react';

import classes from './GenericWrapper.module.scss';
import { IGenericWrapperProps } from './GenericWrapper.types';

export const GenericWrapper: FC<IGenericWrapperProps> = ({
  navigation = <Navigation />,
  children,
  sidebar = <Sidebar />,
}) => {
  return (
    <div className={`${classes.root} container`}>
      <nav className={classes.navigation}>{navigation}</nav>
      <main className={classes.main}>{children}</main>
      <aside className={classes.sidebar}>{sidebar}</aside>
    </div>
  );
};
