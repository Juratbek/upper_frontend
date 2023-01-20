import { ApiErrorBoundary, BlogSkeleton, Follower } from 'components';
import { useInfiniteScrollV2 } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetBlogFollowersQuery } from 'store/apis';
import { IBlogMedium } from 'types';
import { addAmazonUri } from 'utils';
import { BLOG_TAB_IDS } from 'variables';

export const FollowersTab: FC = () => {
  const {
    query: { id, tab },
  } = useRouter();
  const {
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    list: followersList,
    isLoading,
  } = useInfiniteScrollV2<IBlogMedium>(useLazyGetBlogFollowersQuery);

  const fetchNextPageHandler = (): void => {
    id && fetchNextPage({ blogId: +id });
  };

  useEffect(() => {
    if (id && tab === BLOG_TAB_IDS.followers) {
      fetchFirstPage({ blogId: +id });
    }
  }, [id]);

  const followers = useMemo(() => {
    if (isLoading)
      return Array(3)
        .fill('')
        .map((_, index) => <BlogSkeleton key={index} className='px-3 py-2 w-50 w-mobile-100' />);
    if (!followersList || followersList.length === 0)
      return <p className='text-center'>Kuzatuvchilar yo`q</p>;
    return followersList.map((blog) => (
      <div className='d-flex align-items-center justify-content-between px-3 py-2' key={blog.id}>
        <Follower {...addAmazonUri(blog)} />
      </div>
    ));
  }, [followersList]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<BlogSkeleton className='px-3 py-2 w-50 w-mobile-100' />}
      dataLength={followersList.length}
      next={fetchNextPageHandler}
      scrollableTarget='comments'
    >
      {followers}
    </InfiniteScroll>
  );
};
