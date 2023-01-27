import { ApiErrorBoundary, BlogSkeleton, Follower } from 'components';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import { useLazyGetCurrentBlogFollowersQuery } from 'store/apis';
import { addAmazonUri } from 'utils';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

export const FollowersTab: FC = () => {
  const {
    query: { tab },
  } = useRouter();
  const [fetchFollowers, fetchFollowersRes] = useLazyGetCurrentBlogFollowersQuery();
  const { data: followers } = fetchFollowersRes;

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.followers) {
      fetchFollowers();
    }
  }, [tab]);

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton className='px-3 py-2 w-50 w-mobile-100' />}
      fallbackItemCount={3}
      res={fetchFollowersRes}
    >
      {followers?.length === 0 && <p className='text-center'>Kuzatuvchilar yo&apos;q</p>}
      {followers?.map((follower) => (
        <Fragment key={follower.id}>
          <Follower {...addAmazonUri(follower)} className='px-3 py-2' />
        </Fragment>
      ))}
    </ApiErrorBoundary>
  );
};
