import {
  ApiErrorBoundary,
  Button,
  Divider,
  SidebarArticle,
  SidebarArticleSkeleton,
  SidebarSearch,
} from 'components';
import { useAuth, useDevice, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetSidebarArticleSuggestionsQuery } from 'store/apis';
import { closeSidebar, getArticleAuthor, getIsSidebarOpen, openAuthModal } from 'store/states';
import { addUriToArticleImages, getClassName, replaceAll } from 'utils';
import { SIDEBAR_ARTICLES_SKELETON_COUNT, WEB_APP_ROOT_DIR } from 'variables';

import { ConnectTelegram } from './components';
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
  const { isMobile } = useDevice({ isMobile: true });
  const { themeColors } = useTheme();
  const rootClassName = getClassName(
    classes.container,
    isSidebarOpen && classes['container--open'],
  );

  const closeSidebarHandler = (): void => {
    dispatch(closeSidebar());
  };

  const writeArticleHandler = (): void => {
    dispatch(openAuthModal('Maqola yozish uchun profilingizga kiring'));
  };

  useEffect(() => {
    fetchArticleSuggestions();
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
            <Button className='w-100' onClick={writeArticleHandler}>
              Maqola yozish
            </Button>
            <Divider className='my-2' color='medium-gray' />
          </>
        )}
        {AdditionalComponent && <AdditionalComponent />}
        <SidebarSearch />
        <h3>Siz uchun maqolalar</h3>
        {suggestedArticles}
        <ConnectTelegram />
      </>
    );
  }, [router.pathname, isAuthenticated, articleAuthor, suggestedArticles]);

  return (
    <div className={rootClassName}>
      <div className={classes.outside} onClick={closeSidebarHandler}>
        <div className={classes.closeIcon}>&#10005;</div>
      </div>
      <div
        className={classes.sidebar}
        style={{
          backgroundColor: themeColors.bg,
        }}
      >
        {content}
      </div>
    </div>
  );
};
