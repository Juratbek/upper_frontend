import { BlogSkeleton, Follower } from 'components';
import { useInfiniteScrollV2 } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetCurrentBlogFollowersQuery } from 'store/apis';
import { IBlogMedium } from 'types';
import { addAmazonUri } from 'utils';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

export const FollowersTab: FC = () => {
  const {
    query: { tab },
  } = useRouter();
  const {
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    list: followersList,
    isLoading,
  } = useInfiniteScrollV2<IBlogMedium>(useLazyGetCurrentBlogFollowersQuery);

  const followers = useMemo(() => {
    if (isLoading)
      return Array(3)
        .fill('')
        .map((_, index) => <BlogSkeleton key={index} className='px-3 py-2 w-50 w-mobile-100' />);
    if (followersList?.length === 0) return <p className='text-center'>Kuzatuvchilar yo`q</p>;
    return followersList?.map((follower) => (
      <Fragment key={follower.id}>
        <Follower {...addAmazonUri(follower)} className='px-3 py-2' />
      </Fragment>
    ));
  }, []);

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.followers) {
      fetchFirstPage();
    }
  }, [tab]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<BlogSkeleton className='px-3 py-2 w-50 w-mobile-100' />}
      dataLength={followersList.length}
      next={fetchNextPage}
      scrollableTarget='comments'
    >
      {followers}
    </InfiniteScroll>
  );
};
