import { Button, Link } from 'components/lib';
import { Logo } from 'components/molecules';
import { Profile } from 'components/organisms';
import { useAppRouter } from 'hooks';
import { FC } from 'react';

import classes from './WriteArticleHeader.module.scss';

export const WriteArticleHeader: FC = () => {
  const { query } = useAppRouter();
  const { id } = query;

  return (
    <header className={`${classes.container} container`}>
      <Logo />
      <div className={classes['right-block']}>
        <Link href={`/user/articles/publish/${id}`}>
          <Button>Nashr qilish</Button>
        </Link>
        <Profile />
      </div>
    </header>
  );
};
