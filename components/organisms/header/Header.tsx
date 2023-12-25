import { useDevice } from 'hooks';
import { FC } from 'react';

import { DesktopHeader } from './desktop-header/DesktopHeader';
import { MobileHeader } from './mobile-header/MobileHeader';
import { TabletHeader } from './tablet-header/TabletHeader';

export const Header: FC = () => {
  const { isMobile, isTablet } = useDevice();

  if (isMobile) return <MobileHeader />;
  if (isTablet) return <TabletHeader />;

  return <DesktopHeader />;
};
