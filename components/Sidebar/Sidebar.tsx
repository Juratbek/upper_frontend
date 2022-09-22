import { Button, Divider, SidebarArticle, SidebarBlog, SidebarSearch } from 'components';
import { Author } from 'frontends/article';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetSidebarArticleSuggestionsQuery } from 'store/apis';
import { openLoginModal, openRegisterModal } from 'store/states';
import { getArticleAuthor } from 'store/states/readArticle';
import { IBlogMedium, IBlogSmall, ISidebarArticle } from 'types';
import { replaceAll } from 'utils';

import { SIDEBAR_CONTENTS } from './Sidebar.constants';
import classes from './Sidebar.module.css';

const author: IBlogSmall = {
  id: 1,
  name: 'Samandar',
  imgUrl: 'awda',
};

const articles: ISidebarArticle[] = [
  {
    id: 1,
    title: 'Article title Lorem Ipsum is simply dummy',
    imgUrl: '',
    author,
  },
  {
    id: 2,
    title: 'Article title',
    imgUrl: '',
    author,
  },
  {
    id: 3,
    title: 'Article title',
    imgUrl: '',
    author,
  },
];

const blogs: IBlogMedium[] = [
  {
    id: 1,
    name: 'Samandar Boymurodov',
    imgUrl: 'url',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    articlesCount: 100,
    followersCount: 20,
  },
  {
    id: 2,
    name: 'Blog 2',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articlesCount: 100,
    followersCount: 20,
  },
  {
    id: 3,
    name: 'Blog 3',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articlesCount: 100,
    followersCount: 20,
  },
];

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter();
  const { status: authStatus } = useAuth();
  const articleAuthor = useAppSelector(getArticleAuthor);
  const articleSuggestionsRes = useGetSidebarArticleSuggestionsQuery();

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
        {index !== articles.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
      </div>
    ));
  }, [articleSuggestionsRes]);

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
    const isPublishedArticlePage = pathname === '/articles/[id]';

    return (
      <>
        {authStatus === 'unauthenticated' && (
          <div className='d-flex justify-content-around'>
            <Button color='outline-dark' onClick={loginHandler}>
              Kirish
            </Button>
            <Button className='float-right' onClick={registerHandler}>
              Ro`yxatdan o`tish
            </Button>
          </div>
        )}
        {articleAuthor && isPublishedArticlePage && <Author {...articleAuthor} className='mt-2' />}
        <Divider className='my-2' />
        <SidebarSearch />
        <h2>Siz uchun maqolalar</h2>
        {suggestedArticles}
        <Divider className='my-2' />
        <h2>Kuzatib boring</h2>
        {blogs.map((blog, index) => (
          <div key={blog.id}>
            <SidebarBlog {...blog} />
            {index !== articles.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
          </div>
        ))}
      </>
    );
  }, [pathname, authStatus, articleAuthor, suggestedArticles]);

  return <div className={classes.sidebar}>{content}</div>;
};
