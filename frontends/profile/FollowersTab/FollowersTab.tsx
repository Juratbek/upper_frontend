import { ApiErrorBoundary, BlogSkeleton, Button, Follower, StorysetImage } from 'components';
import Link from 'next/link';
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
          <Link href='/write-article'>
            <a>
              <Button color='outline-dark'>Maqola yozish</Button>
            </a>
          </Link>
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
