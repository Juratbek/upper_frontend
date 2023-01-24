import {
  ApiErrorBoundary,
  ArticleImg,
  Author,
  BlogSkeleton,
  Divider,
  SearchInput,
  SidebarSearchArticleSkeleton,
} from 'components';
import { SEARCH_RESULTS_SIZE } from 'components/Sidebar/Sidebar.constants';
import { useClickOutside } from 'hooks';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useLazySearchBlogQuery, useLazySearchPublishedArticleQuery } from 'store/apis';
import { addAmazonUri, addUriToArticleImages } from 'utils';

import classes from './SidebarSearch.module.scss';

export const SidebarSearch: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isResultsContainerOpen, setIsResultsContainerOpen] = useState<boolean>(false);
  const [searchArticle, searchArticleRes] = useLazySearchPublishedArticleQuery();
  const [searchBlog, searchBlogRes] = useLazySearchBlogQuery();

  const openResultsContainer = (): void => setIsResultsContainerOpen(true);

  const closeResultsContainer = (): void => setIsResultsContainerOpen(false);

  const [ref] = useClickOutside(closeResultsContainer);

  const search = (value: string): void => {
    if (!value || value.length <= 1) return;
    searchArticle({ search: value, size: SEARCH_RESULTS_SIZE });
    searchBlog({ search: value, size: SEARCH_RESULTS_SIZE });
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
          <p className='my-1'>Bloglar yo&apos;q</p>
        ) : (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <a onClick={closeResultsContainer}>
                <div className={classes.blog}>
                  <Author {...addAmazonUri(blog)} />
                </div>
              </a>
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
        {addUriToArticleImages(searchArticleRes.data).map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <a onClick={closeResultsContainer}>
              <div className={classes.article}>
                <h4 className='m-0'>{article.title}</h4>
                <ArticleImg imgUrl={article.imgUrl} size='micro' className={classes.img} />
              </div>
            </a>
          </Link>
        ))}
      </ApiErrorBoundary>
    ),
    [searchArticleRes],
  );

  const content = useMemo(() => {
    if (!inputValue) return <p className='my-1'>Qidirish uchun yozing</p>;

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

    if (!(hasBlogsContent || hasArticlesContent)) return <p className='my-1'>Ma`lumot topilmadi</p>;
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
