import {
  ApiErrorBoundary,
  PublishedTutorial,
  StorysetImage,
  TutorialCardSkeleton,
} from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchPublishedTutorialQuery } from 'store/apis';
import { IPublishedTutorialMedim } from 'types';
import { addTutorialAmazonUri, getClassName } from 'utils';
import { SEARCH_PAGE_TAB_IDS, SIDEBAR_BLOGS_SKELETON_COUNT } from 'variables';

import classes from './TutorialsTab.module.scss';

export const TutorialsTab: FC = () => {
  const [searchTutorial, searchTutorialRes] = useLazySearchPublishedTutorialQuery();
  const {
    query: { search, tab },
  } = useRouter();
  const tabClassName = getClassName(
    searchTutorialRes?.isUninitialized || searchTutorialRes.data?.length === 0
      ? ''
      : `tab d-flex mt-2 ${classes.tab}`,
  );

  useEffect(() => {
    if (search && tab === SEARCH_PAGE_TAB_IDS.tutorials && search.length > 1) {
      searchTutorial({ search: search.toString() });
    }
  }, [search, tab]);

  return (
    <ApiErrorBoundary
      fallback={<TutorialCardSkeleton />}
      fallbackItemCount={SIDEBAR_BLOGS_SKELETON_COUNT}
      defaultComponent={
        <div className='text-center mt-5'>
          <StorysetImage
            storysetUri='data'
            width={300}
            height={300}
            src='/storyset/search_data.svg'
          />
        </div>
      }
      res={searchTutorialRes}
      className={tabClassName}
    >
      {searchTutorialRes.data?.length === 0 && (
        <div className='text-center mt-5'>
          <StorysetImage storysetUri='data' width={300} height={300} src='/storyset/no_data.svg' />
          <h3>To&apos;plamlar topilmadi</h3>
        </div>
      )}
      {searchTutorialRes.data?.map((tutorial) => (
        <div key={tutorial.id} className={classes.item}>
          <PublishedTutorial {...addTutorialAmazonUri<IPublishedTutorialMedim>(tutorial)} />
        </div>
      ))}
    </ApiErrorBoundary>
  );
};
