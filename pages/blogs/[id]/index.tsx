import { ApiErrorBoundary, Blog, Button, TabBody, TabsHeader } from 'components';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'frontends/blog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  useFollowBlogMutation,
  useLazyGetBlogByIdQuery,
  useUnfollowBlogMutation,
} from 'store/apis';

export default function BlogPage(): JSX.Element {
  const {
    query: { id },
  } = useRouter();
  const [fetchBlogById, fetchBlogByIdRes] = useLazyGetBlogByIdQuery();
  const [followBlog] = useFollowBlogMutation();
  const [unfollowBlog] = useUnfollowBlogMutation();
  const { data: blog } = fetchBlogByIdRes;

  useEffect(() => {
    if (id) {
      fetchBlogById(+id);
    }
  }, [id]);

  const follow = (): void => {
    id && followBlog(+id);
  };

  const unfollow = (): void => {
    id && unfollowBlog(+id);
  };

  return (
    <main className='container'>
      <ApiErrorBoundary
        res={fetchBlogByIdRes}
        className='d-flex align-items-center justify-content-between p-2'
      >
        {blog && (
          <>
            <Blog {...blog} avaratSize='extra-large' />
            {blog.isFollowed ? (
              <Button color='outline-dark' onClick={unfollow}>
                Kuzatishni bekor qilish
              </Button>
            ) : (
              <Button onClick={follow}>Kuzatib borish</Button>
            )}
          </>
        )}
      </ApiErrorBoundary>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </main>
  );
}
