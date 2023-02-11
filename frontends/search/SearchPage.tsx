import { Head, SearchInput, TabBody, TabsHeader } from 'components';
import { useUrlParams } from 'hooks';
import { FC } from 'react';

import { SEARCH_TAB_MENUS, SEARCH_TABS } from './Search.constants';
import classes from './Search.module.scss';

export const SearchPage: FC = () => {
  const { setParam } = useUrlParams();

  const search = (value: string): void => {
    value && setParam('search', value);
  };

  return (
    <div className='container'>
      <Head title='Qidirish' url='/search' />
      <SearchInput
        className={`${classes['search-input']} my-2`}
        placeholder='Qidirish uchun yozing'
        onDebounce={search}
      />
      <TabsHeader tabs={SEARCH_TAB_MENUS} />
      <TabBody tabs={SEARCH_TABS} />
    </div>
  );
};
