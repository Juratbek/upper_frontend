import { ApiErrorBoundary, Blog, Button, TabBody, TabsHeader } from 'components';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'frontends/blog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLazyGetBlogByIdQuery } from 'store/apis';
import { IBlogSmall } from 'types';

export const blog: IBlogSmall = {
  id: 1,
  name: 'Boymurodov Samandar',
  imgUrl: '',
};

const isBeeingFollowed = false;

export default function BlogPage(): JSX.Element {
  const {
    query: { id },
  } = useRouter();
  const [fetchBlogById, fetchBlogByIdRes] = useLazyGetBlogByIdQuery();

  useEffect(() => {
    if (id) {
      fetchBlogById(+id);
    }
  }, [id]);

  return (
    <main className='container'>
      <ApiErrorBoundary
        res={fetchBlogByIdRes}
        className='d-flex align-items-center justify-content-between p-2'
      >
        {fetchBlogByIdRes.data && (
          <>
            <Blog {...fetchBlogByIdRes.data} avaratSize='extra-large' />
            {isBeeingFollowed ? (
              <Button color='outline-dark' disabled className='test'>
                Kuzatib borilmoqda
              </Button>
            ) : (
              <Button>Kuzatib borish</Button>
            )}
          </>
        )}
      </ApiErrorBoundary>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </main>
  );
}
