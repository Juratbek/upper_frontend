import { SearchInput, TabsHeader } from 'components';
import { TabBody } from 'components/TabBody/TabBody';
import type { NextPage } from 'next';
import classes from 'styles/Search.module.css';
import { SEARCH_TAB_MENUS, SEARCH_TABS } from 'variables/Search.constants';

const SearchPage: NextPage = () => {
  return (
    <div>
      <main className='container'>
        <h1 className='mb-1'>Qidirish</h1>
        <SearchInput className={`${classes['search-input']} mb-2`} />
        <TabsHeader tabs={SEARCH_TAB_MENUS} />
        <TabBody tabs={SEARCH_TABS} />
      </main>
    </div>
  );
};

export default SearchPage;
