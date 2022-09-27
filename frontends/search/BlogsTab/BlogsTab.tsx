import { Blog, Button } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazySearchBlogQuery } from 'store/apis';
import { SEARCH_PAGE_TAB_IDS } from 'variables';

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

  const blogs = useMemo(() => {
    const { data: blogs, isLoading, isFetching, isError, isSuccess, error } = searchBlogRes;
    if (isLoading || isFetching) return 'Yuklanmoqda...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (isSuccess)
      return blogs.map((blog) => (
        <div className='d-flex align-items-center justify-content-between px-3 py-2' key={blog.id}>
          <Blog {...blog} isLink />
          <Button color='outline-dark'>Follow</Button>
        </div>
      ));
  }, [searchBlogRes]);

  return <div className='tab'>{blogs}</div>;
};
