import {
  ApiErrorBoundary,
  ArticleImg,
  Author,
  BlogSkeleton,
  SearchInput,
  SidebarSearchArticleSkeleton,
} from 'components';
import { Divider } from 'components/lib';
import { useClickOutside, useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useLazySearchBlogQuery, useLazySearchPublishedArticleQuery } from 'store/apis';
import { addAmazonUri, addUriToArticleImages } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './SidebarSearch.module.scss';

export const SidebarSearch: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isResultsContainerOpen, setIsResultsContainerOpen] = useState<boolean>(false);
  const [searchArticle, searchArticleRes] = useLazySearchPublishedArticleQuery();
  const [searchBlog, searchBlogRes] = useLazySearchBlogQuery();
  const { themeColors } = useTheme();

  const openResultsContainer = (): void => setIsResultsContainerOpen(true);

  const closeResultsContainer = (): void => setIsResultsContainerOpen(false);

  const [ref] = useClickOutside(closeResultsContainer);

  const search = (value: string): void => {
    if (!value || value.length <= 1) return;
    searchArticle({ search: value, size: 3 });
    searchBlog({ search: value, size: 3 });
    setInputValue(value);
  };

  const blogs = useMemo(() => {
    const { data: blogs } = searchBlogRes;
    return (
      <ApiErrorBoundary
        fallback={<BlogSkeleton size='small' className='p-1' />}
        res={searchBlogRes}
      >
        {!blogs || blogs.length === 0 ? (
          <p className='m-1'>Bloglar yo&apos;q</p>
        ) : (
          blogs.map((blog) => (
            <Link
              href={`${WEB_APP_ROOT_DIR}/blogs/${blog.id}`}
              key={blog.id}
              onClick={closeResultsContainer}
              className={classes.blog}
            >
              <Author {...addAmazonUri(blog)} />
            </Link>
          ))
        )}
      </ApiErrorBoundary>
    );
  }, [searchBlogRes]);

  const articles = useMemo(
    () => (
      <ApiErrorBoundary
        fallback={<SidebarSearchArticleSkeleton className='p-1' />}
        res={searchArticleRes}
      >
        {addUriToArticleImages(searchArticleRes.data).map((article) => (
          <Link
            href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`}
            key={article.id}
            onClick={closeResultsContainer}
          >
            <div className={classes.article}>
              <h4 dangerouslySetInnerHTML={{ __html: article.title }} className='m-0'></h4>
              <ArticleImg imgUrl={article.imgUrl} size='micro' className={classes.img} />
            </div>
          </Link>
        ))}
      </ApiErrorBoundary>
    ),
    [searchArticleRes],
  );

  const content = useMemo(() => {
    if (!inputValue) return <p className='m-1'>Qidirish uchun yozing</p>;

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

    if (!(hasBlogsContent || hasArticlesContent)) return <p className='m-1'>Ma`lumot topilmadi</p>;
    return (
      <>
        {hasBlogsContent && (
          <>
            <h4 className='m-1'>Bloglar</h4>
            {blogs}
            <Divider />
          </>
        )}
        {hasArticlesContent && (
          <>
            <h4 className='m-1'>Maqolalar</h4>
            {articles}
          </>
        )}
      </>
    );
  }, [searchBlogRes, searchArticleRes, inputValue]);

  return (
    <div className={classes.container} ref={ref}>
      <SearchInput onFocus={openResultsContainer} onDebounce={search} />
      <div
        className={`${classes['results-container']} ${!isResultsContainerOpen && 'd-none'}`}
        style={{ backgroundColor: themeColors.popover.bg, borderColor: themeColors.popover.border }}
      >
        {content}
      </div>
    </div>
  );
};
