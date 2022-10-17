import { Button, Divider, SidebarArticle, SidebarBlog, SidebarSearch } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetSidebarArticleSuggestionsQuery,
  useGetSidebarBlogSuggestionsQuery,
} from 'store/apis';
import { openLoginModal, openRegisterModal } from 'store/states';
import { getArticleAuthor } from 'store/states/readArticle';
import { replaceAll } from 'utils';

import { ADDITIONAL_SIDEBAR_CONTENTS, SIDEBAR_CONTENTS } from './Sidebar.constants';
import classes from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter();
  const { isAuthenticated } = useAuth();
  const articleAuthor = useAppSelector(getArticleAuthor);
  const articleSuggestionsRes = useGetSidebarArticleSuggestionsQuery();
  const blogSuggestionsRes = useGetSidebarBlogSuggestionsQuery();

  const loginHandler = (): void => {
    dispatch(openLoginModal());
  };

  const registerHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const suggestedArticles = useMemo(() => {
    const { isError, isLoading, error, data } = articleSuggestionsRes;
    if (isLoading) return 'Loading...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    return data?.map((article, index) => (
      <div key={article.id}>
        <SidebarArticle {...article} />
        {index !== data.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
      </div>
    ));
  }, [articleSuggestionsRes]);

  const suggestedBlogs = useMemo(() => {
    const { isError, isLoading, error, data } = blogSuggestionsRes;
    if (isLoading) return 'Loading...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    return data?.map((blog, index) => (
      <div key={blog.id}>
        <SidebarBlog {...blog} />
        {index !== data.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
      </div>
    ));
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
        <h3>Siz uchun maqolalar</h3>
        {suggestedArticles}
        <Divider className='my-2' />
        <h3>Kuzatib boring</h3>
        {suggestedBlogs}
      </>
    );
  }, [pathname, isAuthenticated, articleAuthor, suggestedArticles, suggestedBlogs]);

  return <div className={classes.sidebar}>{content}</div>;
};
