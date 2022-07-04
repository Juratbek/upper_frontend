import { TabsHeader } from 'components';
import { TabBody } from 'components/TabBody/TabBody';
import type { NextPage } from 'next';
import { SEARCH_TAB_MENUS, SEARCH_TABS } from 'variables/Search.constants';

const SearchPage: NextPage = () => {
  return (
    <div>
      <main className='container'>
        <h1>Qidirish</h1>
        <TabsHeader tabs={SEARCH_TAB_MENUS} />
        <TabBody tabs={SEARCH_TABS} />
      </main>
    </div>
  );
};

export default SearchPage;
