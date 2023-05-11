import { ApiErrorBoundary, BlogSkeleton, Button, Follower, StorysetImage } from 'components';
import { useRouter } from 'next/router';
import { FC, Fragment, useCallback, useEffect } from 'react';
import { useCreateArticleMutation, useLazyGetCurrentBlogFollowersQuery } from 'store/apis';
import { addAmazonUri } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

export const FollowersTab: FC = () => {
  const {
    query: { tab },
    push,
  } = useRouter();
  const [fetchFollowers, fetchFollowersRes] = useLazyGetCurrentBlogFollowersQuery();
  const { data: followers } = fetchFollowersRes;
  const [createArticle, createArticleRes] = useCreateArticleMutation();

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.followers) {
      fetchFollowers();
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

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton className='px-3 py-2 w-50 w-mobile-100' />}
      fallbackItemCount={3}
      res={fetchFollowersRes}
      memoizationDependencies={[createArticleRes.isLoading, createArticleRes.isSuccess]}
    >
      {followers?.length === 0 && (
        <div className='text-center'>
          <StorysetImage
            width={300}
            height={300}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
          <p>Kuzatuvchilar hozircha yo&apos;q</p>
          <p>Kuzatuvchilar yig&apos;ish uchun maqola yozing va bilimlaringizni ulashing</p>
          <Button
            onClick={writeArticleHandler}
            loading={createArticleRes.isLoading}
            disabled={createArticleRes.isSuccess}
            color='outline-dark'
          >
            Maqola yozish
          </Button>
        </div>
      )}
      {followers?.map((follower) => (
        <Fragment key={follower.id}>
          <Follower {...addAmazonUri(follower)} className='px-3 py-2' />
        </Fragment>
      ))}
    </ApiErrorBoundary>
  );
};
