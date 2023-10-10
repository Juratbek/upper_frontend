import { ApiErrorBoundary, Blog, BlogSkeleton, Button, StorysetImage } from 'components';
import { SEARCH_PAGE_TAB_IDS } from 'frontends/search/Search.constants';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLazySearchBlogQuery } from 'store/apis';
import { addAmazonUri } from 'utils';
import { SIDEBAR_BLOGS_SKELETON_COUNT } from 'variables';

export const BlogsTab: FC = () => {
  const [searchBlog, searchBlogRes] = useLazySearchBlogQuery();
  const {
    query: { search, tab },
  } = useRouter();

  useEffect(() => {
    if (search && tab === SEARCH_PAGE_TAB_IDS.blogs && search.length > 1) {
      searchBlog({ search: search.toString() });
    }
  }, [search, tab]);

  return (
    <ApiErrorBoundary
      fallback={<BlogSkeleton size='large' className='px-3 py-2' />}
      defaultComponent={
        <div className='text-center mt-5'>
          <StorysetImage
            storysetUri='data'
            width={250}
            height={250}
            src='/storyset/search_data.svg'
          />
        </div>
      }
      fallbackItemCount={SIDEBAR_BLOGS_SKELETON_COUNT}
      res={searchBlogRes}
      className='tab'
    >
      {searchBlogRes.data?.length === 0 && (
        <div className='text-center mt-5'>
          <StorysetImage storysetUri='data' width={250} height={250} src='/storyset/no_data.svg' />
          <h3>Blog topilmadi</h3>
        </div>
      )}
      {searchBlogRes.data?.map((blog) => (
        <div
          className='d-flex align-items-center justify-content-between px-3 py-2 px-xs-1'
          key={blog.id}
        >
          <Blog {...addAmazonUri(blog)} isLink />
          <Button color='outlined'>Follow</Button>
        </div>
      ))}
    </ApiErrorBoundary>
  );
};
