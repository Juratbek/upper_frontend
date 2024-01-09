import { ReactNode } from 'react';

export interface IGenericWrapperProps {
  header?: ReactNode;
  isNavigationHidden?: boolean;
  desktopNavigation?: ReactNode;
  tabletNavigation?: ReactNode;
  mobileNavigation?: ReactNode;
  children?: ReactNode;
  sidebar?: ReactNode;
}
