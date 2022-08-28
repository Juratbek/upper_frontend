import { TabBody, TabsHeader } from 'components';
import { HOME_TAB_MENUS, HOME_TABS } from 'frontends/home';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className='container'>
      <h1 className='mb-1'>UDAS - Birgalikda osonroq</h1>
      <TabsHeader tabs={HOME_TAB_MENUS} />
      <TabBody tabs={HOME_TABS} />
    </main>
  );
};

export default Home;
