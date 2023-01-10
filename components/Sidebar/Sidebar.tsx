import {
  ApiErrorBoundary,
  Button,
  Divider,
  SidebarArticle,
  SidebarArticleSkeleton,
  SidebarBlog,
  SidebarSearch,
} from 'components';
import { BlogSkeleton } from 'components/skeletons';
import { useAuth, useDevice } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useLazyGetSidebarArticleSuggestionsQuery,
  useLazyGetSidebarBlogSuggestionsQuery,
} from 'store/apis';
import {
  closeSidebar,
  getArticleAuthor,
  getIsCommentsSidebarOpen,
  getIsSidebarOpen,
  openLoginModal,
  openRegisterModal,
} from 'store/states';
import { addAmazonUri, addUriToArticleImages, getClassName, replaceAll } from 'utils';
import { SIDEBAR_ARTICLES_SKELETON_COUNT } from 'variables';

import { ADDITIONAL_SIDEBAR_CONTENTS, SIDEBAR_CONTENTS } from './Sidebar.constants';
import classes from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter();
  const { isAuthenticated } = useAuth();
  const articleAuthor = useAppSelector(getArticleAuthor);
  const isSidebarOpen = useAppSelector(getIsSidebarOpen);
  const [fetchArticleSuggestions, articleSuggestionsRes] =
    useLazyGetSidebarArticleSuggestionsQuery();
  const [fetchBlogSuggestions, blogSuggestionsRes] = useLazyGetSidebarBlogSuggestionsQuery();
  const { isMobile } = useDevice({ isMobile: true });
  const isCommentsSidebarOpen = useAppSelector(getIsCommentsSidebarOpen);
  const rootClassName = getClassName(
    classes.container,
    isSidebarOpen && classes['container--open'],
  );

  const loginHandler = (): void => {
    dispatch(openLoginModal());
  };

  const registerHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const closeSidebarHandler = (): void => {
    dispatch(closeSidebar());
  };

  useEffect(() => {
    fetchArticleSuggestions();
    fetchBlogSuggestions();
  }, [isMobile]);

  const suggestedArticles = useMemo(() => {
    const { data } = articleSuggestionsRes;
    return (
      <ApiErrorBoundary
        fallback={<SidebarArticleSkeleton />}
        fallbackItemCount={SIDEBAR_ARTICLES_SKELETON_COUNT}
        res={articleSuggestionsRes}
      >
        {data?.length === 0 && <h5>Maqolalar mavjud emas</h5>}
        {data &&
          addUriToArticleImages(data).map((article, index) => (
            <div key={article.id}>
              <SidebarArticle {...article} />
              {index !== data.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
            </div>
          ))}
      </ApiErrorBoundary>
    );
  }, [articleSuggestionsRes]);

  const suggestedBlogs = useMemo(() => {
    const { data } = blogSuggestionsRes;
    return (
      <ApiErrorBoundary
        fallback={<BlogSkeleton className='my-2' />}
        fallbackItemCount={SIDEBAR_ARTICLES_SKELETON_COUNT}
        res={blogSuggestionsRes}
      >
        {data?.length === 0 && <h5>Bloglar mavjud emas</h5>}
        {data &&
          data.map((blog, index) => (
            <div key={blog.id}>
              <SidebarBlog {...addAmazonUri(blog)} />
              {index !== data.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
            </div>
          ))}
      </ApiErrorBoundary>
    );
  }, [blogSuggestionsRes]);

  const content: JSX.Element = useMemo(() => {
    const ContentComponent = SIDEBAR_CONTENTS[pathname];
    if (ContentComponent) return <ContentComponent />;

    const key = Object.keys(SIDEBAR_CONTENTS).find((key) => {
      if (!key.includes('*')) return false;
      const match = replaceAll(key, '*', '');
      return pathname.startsWith(match);
    });

    if (key) {
      const ContentComponent = SIDEBAR_CONTENTS[key];
      return <ContentComponent />;
    }

    const AdditionalComponent = ADDITIONAL_SIDEBAR_CONTENTS[pathname];

    return (
      <>
        {!isAuthenticated && (
          <>
            <div className='d-flex justify-content-around'>
              <Button color='outline-dark' onClick={loginHandler}>
                Kirish
              </Button>
              <Button className='float-right' onClick={registerHandler}>
                Ro`yxatdan o`tish
              </Button>
            </div>
            <Divider className='my-2' />
          </>
        )}
        {AdditionalComponent && <AdditionalComponent />}
        <SidebarSearch />
        {!isCommentsSidebarOpen && (
          <>
            <h3>Siz uchun maqolalar</h3>
            {suggestedArticles}
            <Divider className='my-2' />
            <h3>Kuzatib boring</h3>
            {suggestedBlogs}
          </>
        )}
      </>
    );
  }, [pathname, isAuthenticated, articleAuthor, suggestedArticles, suggestedBlogs]);

  return (
    <div className={rootClassName}>
      <div className={classes.outside} onClick={closeSidebarHandler}>
        <div className={classes.closeIcon}>&#10005;</div>
      </div>
      <div
        className={classes.sidebar}
        style={{ overflowY: isCommentsSidebarOpen ? 'hidden' : 'auto' }}
      >
        {content}
      </div>
    </div>
  );
};
