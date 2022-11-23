import { TabBody, TabsHeader } from 'components';
import { HOME_TAB_MENUS, HOME_TABS } from 'frontends/home';
import { useAuth } from 'hooks';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();

  const tabMenus = useMemo(
    () => (isAuthenticated ? HOME_TAB_MENUS : HOME_TAB_MENUS.filter((menu) => !menu.private)),
    [isAuthenticated],
  );

  return (
    <main className='container'>
      <h1 className='mb-1'>UPPER - Yanada yuqoriroq</h1>
      <TabsHeader tabs={tabMenus} />
      <TabBody tabs={HOME_TABS} />
    </main>
  );
};

export default Home;
