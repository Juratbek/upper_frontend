import { BlogSkeleton, Follower, StorysetImage } from 'components';
import { useInfiniteScrollV2 } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetBlogSubscribersQuery } from 'store/apis';
import { IBlogMedium } from 'types';
import { addAmazonUri } from 'utils';
import { BLOG_TAB_IDS } from 'variables';

export const FollowersTab: FC = () => {
  const {
    query: { id, tab },
  } = useRouter();
  const infiniteScrollApi = useInfiniteScrollV2<IBlogMedium>(useLazyGetBlogSubscribersQuery, {
    shouldBeInvalidated: true,
  });

  const {
    list: subscribersList,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    isSuccess,
  } = infiniteScrollApi;

  const fetchNextPageHandler = (): void => {
    id && fetchNextPage({ articleId: +id });
  };

  useEffect(() => {
    if (id && tab === BLOG_TAB_IDS.followers) {
      fetchFirstPage({ id: +id });
    }
  }, [id]);

  const subscribers = useMemo(() => {
    if (isSuccess && subscribersList?.length === 0)
      return (
        <div className='text-center'>
          <StorysetImage
            width={250}
            height={250}
            src='/storyset/subscriber.svg'
            storysetUri='creativity'
          />
          <p>Bloglarga obuna bo&apos;ling va yangi maqolalar haqida Xabarlar oling</p>
        </div>
      );
    return subscribersList.map((blog) => (
      <div className='d-flex align-items-center justify-content-between px-3 py-2' key={blog.id}>
        <Follower {...addAmazonUri(blog)} />
      </div>
    ));
  }, [subscribersList]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={Array(3)
        .fill('')
        .map((_, index) => (
          <BlogSkeleton key={index} className='px-3 py-2' />
        ))}
      dataLength={subscribersList.length}
      next={fetchNextPageHandler}
      scrollableTarget='main'
    >
      {subscribers}
    </InfiniteScroll>
  );
};
