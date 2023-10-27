import { Button, Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { useAppRouter } from 'hooks/useAppRouter/useAppRouter';
import { FC, useCallback, useRef } from 'react';
import { useCreateArticleMutation } from 'store/apis';
import { ICONS } from 'variables';

import { Profile } from '../profile';
import classes from './Header.module.scss';

const Logo = ICONS.logo;

export const Header: FC = () => {
  const { themeColors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const { push } = useAppRouter();

  const createArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ blocks: [], labels: [], title: '' }).unwrap();
      push(`/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
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
        <Button
          loading={createArticleRes.isLoading}
          className={classes['write-article-btn']}
          onClick={createArticleHandler}
          loader={'Yaratilmoqda...'}
        >
          + Maqola yozish
        </Button>
        <Profile />
      </div>
    </header>
  );
};
