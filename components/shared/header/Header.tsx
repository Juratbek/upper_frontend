import { Button, Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useAuth, useTheme } from 'hooks';
import { useAppRouter } from 'hooks/useAppRouter/useAppRouter';
import { FC, useCallback, useRef } from 'react';
import { useAppDispatch } from 'store';
import { useCreateArticle } from 'store/clients/article';
import { openAuthModal } from 'store/states';
import { ICONS } from 'variables';

import { Profile } from '../profile';
import classes from './Header.module.scss';

const Logo = ICONS.logo;

export const Header: FC = () => {
  const { themeColors } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { push } = useAppRouter();
  const { mutate: createArticle, ...createArticleRes } = useCreateArticle({
    onSuccess: (id) => push(`/user/articles/${id}`),
  });

  const createArticleHandler = useCallback(() => {
    if (isAuthenticated) {
      createArticle();
      return;
    } else {
      dispatch(openAuthModal());
    }
  }, []);

  return (
    <header className={`${classes.header} container`} ref={containerRef}>
      <div className={classes['left-container']}>
        <Link href='/' className={classes.logo}>
          <Logo color={themeColors.icon} />
        </Link>
      </div>
      <SearchInput className={classes['main-container']} />
      <div className={classes['right-container']}>
        {!isLoading && (
          <Button
            loading={createArticleRes.isLoading}
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
