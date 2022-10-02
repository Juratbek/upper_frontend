import { ApiErrorBoundary, ArticleImg, Author, Divider, SearchInput } from 'components';
import { useClickOutside } from 'hooks';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useLazySearchArticleQuery, useLazySearchBlogQuery } from 'store/apis';

import classes from './SidebarSearch.module.scss';

export const SidebarSearch: FC = () => {
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
  };

  const blogs = useMemo(() => {
    const { data: blogs } = searchBlogRes;
    return (
      <ApiErrorBoundary res={searchBlogRes}>
        {!blogs || blogs.length === 0 ? (
          <p>Bloglar yo`q</p>
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
  }, [searchBlogRes.data]);

  const articles = useMemo(
    () => (
      <ApiErrorBoundary res={searchArticleRes}>
        {searchArticleRes.data?.length === 0 ? (
          <p>Bloglar yo`q</p>
        ) : (
          searchArticleRes.data?.map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <div className={classes.article}>
                <ArticleImg imgUrl={article.imgUrl} size='micro' className={classes.img} />
                <h4 className='m-0'>{article.title}</h4>
              </div>
            </Link>
          ))
        )}
      </ApiErrorBoundary>
    ),
    [searchArticleRes.data],
  );

  return (
    <div className={classes.container} ref={ref}>
      <SearchInput onFocus={openResultsContainer} onDebounce={search} />
      <div className={`${classes['results-container']} ${!isResultsContainerOpen && 'd-none'}`}>
        <h4 className='m-0'>Bloglar</h4>
        <Divider />
        {blogs}
        <h4 className='m-0'>Maqolalar</h4>
        <Divider />
        {articles}
      </div>
    </div>
  );
};
