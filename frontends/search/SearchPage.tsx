import { Head, SearchInput, StorysetImage, TabBody, TabsHeader } from 'components';
import { useUrlParams } from 'hooks';
import { FC, useEffect, useRef } from 'react';

import { SEARCH_TAB_MENUS, SEARCH_TABS } from './Search.constants';
import classes from './Search.module.scss';

const searchParamKey = 'search';

export const SearchPage: FC = () => {
  const { setParam, getParam, isReady } = useUrlParams();
  const searchValue = getParam(searchParamKey);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = (value: string): void => {
    value && setParam(searchParamKey, value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!isReady) return <></>;

  if (!searchValue) {
    return (
      <div className='d-flex flex-1 align-items-center justify-content-center flex-col'>
        <StorysetImage
          storysetUri='data'
          width={250}
          height={250}
          className='mb-2'
          src='/storyset/search_data.svg'
        />
        <SearchInput
          className={classes['initial-search-input']}
          ref={inputRef}
          placeholder='Qidirish uchun yozing'
          onDebounce={search}
        />
        <div style={{ height: '10rem' }} />
      </div>
    );
  }

  return (
    <div className='container'>
      <Head title='Qidirish' url='/search' />
      <SearchInput
        className={`${classes['search-input']} my-2`}
        placeholder='Qidirish uchun yozing'
        onDebounce={search}
        defaultValue={searchValue}
      />
      <TabsHeader tabs={SEARCH_TAB_MENUS} />
      <TabBody tabs={SEARCH_TABS} />
    </div>
  );
};
