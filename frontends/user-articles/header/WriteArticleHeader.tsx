import { Button } from 'components/lib';
import { Logo } from 'components/molecules';
import { Profile } from 'components/organisms';
import { useAppRouter } from 'hooks';
import { FC, useCallback } from 'react';

import classes from './WriteArticleHeader.module.scss';

export const WriteArticleHeader: FC = () => {
  const { push, query } = useAppRouter();

  const publishHandler = useCallback(() => {
    const { id } = query;

    if (!id || isNaN(+id)) {
      console.error('Article id is not provided');
      return;
    }

    push(`/user/articles/publish/${id}`);
  }, [query.id]);

  return (
    <header className={`${classes.container} container`}>
      <Logo />
      <div className={classes['right-block']}>
        <Button onClick={publishHandler}>Nashr qilish</Button>
        <Profile />
      </div>
    </header>
  );
};
