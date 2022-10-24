import {
  ApiErrorBoundary,
  ArticleImg,
  Author,
  BlogSkeleton,
  Divider,
  SearchInput,
  SidebarSearchArticleSkeleton,
} from 'components';
import { useClickOutside } from 'hooks';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useLazySearchArticleQuery, useLazySearchBlogQuery } from 'store/apis';

import classes from './SidebarSearch.module.scss';

export const SidebarSearch: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isResultsContainerOpen, setIsResultsContainerOpen] = useState<boolean>(false);
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();
  const [searchBlog, searchBlogRes] = useLazySearchBlogQuery();

  const openResultsContainer = (): void => {
    setIsResultsContainerOpen(true);
  };

  const [ref] = useClickOutside(() => {
    setIsResultsContainerOpen(false);
  });

  const search = (value: string): void => {
    if (!value || value.length <= 1) return;
    searchArticle(value);
    searchBlog(value);
    setInputValue(value);
  };

  const blogs = useMemo(() => {
    const { data: blogs } = searchBlogRes;
    return (
      <ApiErrorBoundary
        fallback={<BlogSkeleton size='small' className='py-1' />}
        res={searchBlogRes}
      >
        {!blogs || blogs.length === 0 ? (
          <p className='my-1'>Bloglar yo`q</p>
        ) : (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <div className={classes.blog}>
                <Author {...blog} />
              </div>
            </Link>
          ))
        )}
      </ApiErrorBoundary>
    );
  }, [searchBlogRes]);

  const articles = useMemo(
    () => (
      <ApiErrorBoundary
        fallback={<SidebarSearchArticleSkeleton className='py-1' />}
        res={searchArticleRes}
      >
        {searchArticleRes.data?.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <div className={classes.article}>
              <h4 className='m-0'>{article.title}</h4>
              <ArticleImg imgUrl={article.imgUrl} size='micro' className={classes.img} />
            </div>
          </Link>
        ))}
      </ApiErrorBoundary>
    ),
    [searchArticleRes],
  );

  const content = useMemo(() => {
    if (!inputValue) return <p className='my-1'>Type something to search</p>;

    const hasBlogsContent = !(
      searchBlogRes.isSuccess &&
      !searchBlogRes.isFetching &&
      searchBlogRes.data.length === 0
    );
    const hasArticlesContent = !(
      searchArticleRes.isSuccess &&
      !searchArticleRes.isFetching &&
      searchArticleRes.data.length === 0
    );
    return (
      <>
        {hasBlogsContent && (
          <>
            <h4 className='m-0 mb-1'>Bloglar</h4>
            <Divider />
            {blogs}
          </>
        )}
        {hasArticlesContent && (
          <>
            <h4 className='m-0 mb-1'>Maqolalar</h4>
            <Divider />
            {articles}
          </>
        )}
      </>
    );
  }, [searchBlogRes, searchArticleRes, inputValue]);

  return (
    <div className={classes.container} ref={ref}>
      <SearchInput onFocus={openResultsContainer} onDebounce={search} />
      <div className={`${classes['results-container']} ${!isResultsContainerOpen && 'd-none'}`}>
        {content}
      </div>
    </div>
  );
};
