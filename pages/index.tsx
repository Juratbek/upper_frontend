import { TabBody, TabsHeader } from 'components';
import { HOME_TAB_MENUS, HOME_TABS } from 'frontends/home';
import { useAuth } from 'hooks';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const Home: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const tabMenus = useMemo(() => {
    if (isLoading) return [];
    return isAuthenticated ? HOME_TAB_MENUS : HOME_TAB_MENUS.filter((menu) => !menu.private);
  }, [isAuthenticated]);

  return (
    <div className='container'>
      <h1 className='mb-1'>UPPER - Yanada yuqoriroq</h1>
      <TabsHeader tabs={tabMenus} />
      <TabBody tabs={HOME_TABS} />
    </div>
  );
};

export default Home;
