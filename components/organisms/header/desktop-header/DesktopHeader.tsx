import { Button } from 'components/lib';
import { Logo, SearchInput } from 'components/molecules';
import { Profile } from 'components/organisms';
import { useAuth } from 'hooks';
import { useAppRouter } from 'hooks/useAppRouter/useAppRouter';
import { FC, useCallback } from 'react';
import { useAppDispatch } from 'store';
import { useCreateArticle } from 'store/clients/article';
import { openAuthModal } from 'store/states';

import classes from './DesktopHeader.module.scss';

export const DesktopHeader: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAuth();
  const { push } = useAppRouter();
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: ({ id }) => push(`/user/articles/${id}`),
  });

  const createArticleHandler = useCallback(() => {
    if (isAuthenticated) {
      createArticle();
    } else {
      dispatch(openAuthModal());
    }
  }, []);

  return (
    <header className={`${classes.header} container`}>
      <div className={classes['left-container']}>
        <Logo />
      </div>
      <SearchInput inputContainerClassName={classes['main-container']} />
      <div className={classes['right-container']}>
        {!isLoading && (
          <Button
            loading={createArticleRes.isPending}
            className={classes['write-article-btn']}
            onClick={createArticleHandler}
            loader={'Yaratilmoqda...'}
          >
            + Maqola yozish
          </Button>
        )}
        {isAuthenticated && <Profile />}
      </div>
    </header>
  );
};
