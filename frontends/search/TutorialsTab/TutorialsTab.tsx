import { ApiErrorBoundary, BlogSkeleton, PublishedTutorial } from 'components';
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
      res={searchTutorialRes}
      className='tab d-flex mt-2'
      style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
    >
      {searchTutorialRes.data?.length === 0 && (
        <h3 className='text-center'>To&apos;plamlar topilmadi</h3>
      )}
      {searchTutorialRes.data?.map((tutorial) => (
        <div key={tutorial.id} className='mb-2'>
          <PublishedTutorial {...addTutorialAmazonUri<IPublishedTutorialMedim>(tutorial)} />
        </div>
      ))}
    </ApiErrorBoundary>
  );
};
