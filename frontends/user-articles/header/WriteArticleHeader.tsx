import { useMutationState } from '@tanstack/react-query';
import { Button, Link } from 'components/lib';
import { Logo, UploadStatus } from 'components/molecules';
import { Profile } from 'components/organisms';
import { useAppRouter } from 'hooks';
import { FC } from 'react';

import classes from './WriteArticleHeader.module.scss';

export const WriteArticleHeader: FC = () => {
  const { query } = useAppRouter();
  const { id } = query;
  const mutations = useMutationState({
    filters: { mutationKey: ['update-article', Number(id)] },
    select: (mutation) => mutation.state,
  });
  const updateArticleMutation = mutations.at(-1);

  return (
    <header className={`${classes.container} container`}>
      <Logo />
      <div className={classes['right-block']}>
        <Link href={`/user/articles/publish/${id}`}>
          <Button>Nashr qilish</Button>
        </Link>
        {updateArticleMutation && (
          <UploadStatus status={updateArticleMutation.status} error={updateArticleMutation.error} />
        )}
        <Profile />
      </div>
    </header>
  );
};
