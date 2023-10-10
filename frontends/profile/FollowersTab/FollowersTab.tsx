import { ApiErrorBoundary, BlogSkeleton, Button, Follower, StorysetImage } from 'components';
import { useInfiniteScrollV2 } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment, useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCreateArticleMutation, useLazyGetCurrentBlogSubscribersQuery } from 'store/apis';
import { IBlogMedium } from 'types';
import { addAmazonUri } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

export const FollowersTab: FC = () => {
  const {
    query: { tab },
    push,
  } = useRouter();
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const subscribersRes = useInfiniteScrollV2<IBlogMedium>(useLazyGetCurrentBlogSubscribersQuery);
  const { fetchFirstPage, hasMore, fetchNextPage, list: subscribers } = subscribersRes;

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.followers) {
      fetchFirstPage();
    }
  }, [tab]);

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

  const subscribersRender = useMemo(() => {
    if (subscribers.length === 0) {
      return (
        <div className='text-center'>
          <StorysetImage
            width={250}
            height={250}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
          <p>Obunachilar hozircha yo&apos;q</p>
          <p>Obunachilar yig&apos;ish uchun maqola yozing va bilimlaringizni ulashing</p>
          <Button
            onClick={writeArticleHandler}
            loading={createArticleRes.isLoading}
            disabled={createArticleRes.isSuccess}
            color='outlined'
          >
            Maqola yozish
          </Button>
        </div>
      );
    }
    return subscribers.map((subscriber) => (
      <Fragment key={subscriber.id}>
        <Follower {...addAmazonUri(subscriber)} className='px-3 py-2' />
      </Fragment>
    ));
  }, [subscribers]);

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton className='px-3 py-2 w-50 w-mobile-100' />}
      fallbackItemCount={3}
      res={subscribersRes}
      memoizationDependencies={[createArticleRes.isLoading, createArticleRes.isSuccess]}
    >
      <InfiniteScroll
        hasMore={hasMore}
        loader={Array(3)
          .fill('')
          .map((_, index) => (
            <BlogSkeleton key={index} className='px-3 py-2' />
          ))}
        dataLength={subscribers.length}
        next={fetchNextPage}
        scrollableTarget='main'
      >
        {subscribersRender}
      </InfiniteScroll>
    </ApiErrorBoundary>
  );
};
