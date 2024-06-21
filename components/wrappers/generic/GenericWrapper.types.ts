import { ReactNode } from 'react';

export interface IGenericWrapperProps {
  header?: ReactNode;
  isHeaderHidden?: boolean;
  isNavigationHidden?: boolean;
  isSidebarHidden?: boolean;
  areNavigationAndSidebarEqual?: boolean;
  desktopNavigation?: ReactNode;
  tabletNavigation?: ReactNode;
  mobileNavigation?: ReactNode;
  children?: ReactNode;
  sidebar?: ReactNode;
  classes?: {
    main?: string;
    root?: string;
  };
}
