import { ReactNode } from 'react';

export interface IGenericWrapperProps {
  header?: ReactNode;
  desktopNavigation?: ReactNode;
  tabletNavigation?: ReactNode;
  mobileNavigation?: ReactNode;
  children?: ReactNode;
  sidebar?: ReactNode;
}
