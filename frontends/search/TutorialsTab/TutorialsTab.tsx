import { ApiErrorBoundary, BlogSkeleton, PublishedTutorial, StorysetImage } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchPublishedTutorialQuery } from 'store/apis';
import { IPublishedTutorialMedim } from 'types';
import { addTutorialAmazonUri } from 'utils';
import { SEARCH_PAGE_TAB_IDS, SIDEBAR_BLOGS_SKELETON_COUNT } from 'variables';

export const TutorialsTab: FC = () => {
  const [searchTutorial, searchTutorialRes] = useLazySearchPublishedTutorialQuery();
  const {
    query: { search, tab },
  } = useRouter();

  useEffect(() => {
    if (search && tab === SEARCH_PAGE_TAB_IDS.tutorials && search.length > 1) {
      searchTutorial({ search: search.toString() });
    }
  }, [search, tab]);

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton size='large' className='px-3 py-2' />}
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
      className={
        searchTutorialRes?.isUninitialized || searchTutorialRes.data?.length === 0
          ? ''
          : 'tab d-flex mt-2'
      }
      style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
    >
      {searchTutorialRes.data?.length === 0 && (
        <div className='text-center mt-5'>
          <StorysetImage storysetUri='data' width={300} height={300} src='/storyset/no_data.svg' />
          <h3>To&apos;plamlar topilmadi</h3>
        </div>
      )}
      {searchTutorialRes.data?.map((tutorial) => (
        <div key={tutorial.id} className='mb-2'>
          <PublishedTutorial {...addTutorialAmazonUri<IPublishedTutorialMedim>(tutorial)} />
        </div>
      ))}
    </ApiErrorBoundary>
  );
};
