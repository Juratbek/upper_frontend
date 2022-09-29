import { ApiErrorBoundary, Follower } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetBlogFollowersQuery } from 'store/apis';
import { BLOG_TAB_IDS } from 'variables';

export const FollowersTab: FC = () => {
  const {
    query: { id, tab },
  } = useRouter();
  const [fetchFollowers, fetchFollowerRes] = useLazyGetBlogFollowersQuery();

  useEffect(() => {
    if (id && tab === BLOG_TAB_IDS.followers) {
      fetchFollowers(+id);
    }
  }, [id]);

  const followers = useMemo(() => {
    const { data: followers } = fetchFollowerRes;
    if (!followers || followers.length === 0)
      return <p className='text-center'>Kuzatuvchilar yo`q</p>;
    return followers.map((blog) => (
      <div className='d-flex align-items-center justify-content-between px-3 py-2' key={blog.id}>
        <Follower {...blog} />
      </div>
    ));
  }, [fetchFollowerRes.data]);

  return (
    <ApiErrorBoundary res={fetchFollowerRes} className='tab'>
      {followers}
    </ApiErrorBoundary>
  );
};
