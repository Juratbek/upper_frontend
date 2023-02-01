import { Head, SearchInput, TabBody, TabsHeader } from 'components';
import { useUrlParams } from 'hooks';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import classes from 'styles/Search.module.scss';
import { SEARCH_TAB_MENUS, SEARCH_TABS } from 'variables/Search.constants';

const SearchPage: NextPage = () => {
  const { setParam, getParam, isReady } = useUrlParams();

  const search = (value: string): void => {
    value && setParam('search', value);
  };

  const searchInput = useMemo(() => {
    if (isReady) {
      return (
        <SearchInput
          defaultValue={getParam('search')}
          className={`${classes['search-input']} my-2`}
          placeholder='Qidirish uchun yozing'
          onDebounce={search}
        />
      );
    }
  }, [isReady]);

  return (
    <div className='container'>
      <Head title='Qidirish' url='/search' />
      {searchInput}
      <TabsHeader tabs={SEARCH_TAB_MENUS} />
      <TabBody tabs={SEARCH_TABS} />
    </div>
  );
};

export default SearchPage;
