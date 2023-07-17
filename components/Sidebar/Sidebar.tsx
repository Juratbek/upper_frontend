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
import { useAuth, useDevice, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useLazyGetSidebarArticleSuggestionsQuery,
  useLazyGetSidebarBlogSuggestionsQuery,
} from 'store/apis';
import { closeSidebar, getArticleAuthor, getIsSidebarOpen, openLoginModal } from 'store/states';
import { addAmazonUri, addUriToArticleImages, getClassName, replaceAll } from 'utils';
import { SIDEBAR_ARTICLES_SKELETON_COUNT, WEB_APP_ROOT_DIR } from 'variables';

import { ADDITIONAL_SIDEBAR_CONTENTS, SIDEBAR_CONTENTS } from './Sidebar.constants';
import classes from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const articleAuthor = useAppSelector(getArticleAuthor);
  const isSidebarOpen = useAppSelector(getIsSidebarOpen);
  const [fetchArticleSuggestions, articleSuggestionsRes] =
    useLazyGetSidebarArticleSuggestionsQuery();
  const [fetchBlogSuggestions, blogSuggestionsRes] = useLazyGetSidebarBlogSuggestionsQuery();
  const { isMobile } = useDevice({ isMobile: true });
  const { themeColors } = useTheme();
  const rootClassName = getClassName(
    classes.container,
    isSidebarOpen && classes['container--open'],
  );

  const loginHandler = (): void => {
    dispatch(openLoginModal());
  };

  const writeArticleHandler = (): void => {
    dispatch(openLoginModal("Maqola yozish uchun profilingizga kiring, yoki ro'yxatdan o'ting"));
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
    const { data, isSuccess } = blogSuggestionsRes;

    // if there is no suggested blogs render nothing;
    if (isSuccess && data.length === 0) return null;

    return (
      <ApiErrorBoundary
        fallback={<BlogSkeleton className='my-2' />}
        fallbackItemCount={SIDEBAR_ARTICLES_SKELETON_COUNT}
        res={blogSuggestionsRes}
      >
        <Divider className='my-2' color='medium-gray' />
        <h3>Obuna bo&apos;ling</h3>
        {data?.map((blog, index) => (
          <div key={blog.id}>
            <SidebarBlog {...addAmazonUri(blog)} />
            {index !== data.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
          </div>
        ))}
      </ApiErrorBoundary>
    );
  }, [blogSuggestionsRes]);

  const content: JSX.Element = useMemo(() => {
    const pathname = router.pathname.replace(WEB_APP_ROOT_DIR, '');
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
            <div className='d-flex justify-content-between f-gap-1'>
              <Button color='outline-dark' onClick={loginHandler}>
                Profilga kirish
              </Button>
              <Button className='flex-1' onClick={writeArticleHandler}>
                Maqola yozish
              </Button>
            </div>
            <Divider className='my-2' color='medium-gray' />
          </>
        )}
        {AdditionalComponent && <AdditionalComponent />}
        <SidebarSearch />
        <h3>Siz uchun maqolalar</h3>
        {suggestedArticles}
        {suggestedBlogs}
      </>
    );
  }, [router.pathname, isAuthenticated, articleAuthor, suggestedArticles, suggestedBlogs]);

  return (
    <div className={rootClassName}>
      <div className={classes.outside} onClick={closeSidebarHandler}>
        <div className={classes.closeIcon}>&#10005;</div>
      </div>
      <div
        className={classes.sidebar}
        style={{
          overflowY: 'auto',
          backgroundColor: themeColors.bg,
        }}
      >
        {content}
      </div>
    </div>
  );
};
