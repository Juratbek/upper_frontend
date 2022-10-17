import { ApiErrorBoundary, Blog, BlogSkeleton, Button } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchBlogQuery } from 'store/apis';
import { SEARCH_PAGE_TAB_IDS, SIDEBAR_BLOGS_SKELETON_COUNT } from 'variables';

export const BlogsTab: FC = () => {
  const [searchBlog, searchBlogRes] = useLazySearchBlogQuery();
  const {
    query: { search, tab },
  } = useRouter();

  useEffect(() => {
    if (search && tab === SEARCH_PAGE_TAB_IDS.blogs && search.length > 1) {
      searchBlog(search as string);
    }
  }, [search]);

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton size='large' className='px-3 py-2' />}
      fallbackItemCount={SIDEBAR_BLOGS_SKELETON_COUNT}
      res={searchBlogRes}
      className='tab'
    >
      {searchBlogRes.data?.map((blog) => (
        <div className='d-flex align-items-center justify-content-between px-3 py-2' key={blog.id}>
          <Blog {...blog} isLink />
          <Button color='outline-dark'>Follow</Button>
        </div>
      ))}
    </ApiErrorBoundary>
  );
};
