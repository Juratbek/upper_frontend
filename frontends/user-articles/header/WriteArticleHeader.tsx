import { Button } from 'components/lib';
import { Logo } from 'components/molecules';
import { Profile } from 'components/organisms';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openPublishModal } from 'store/states/publishModal';

import classes from './WriteArticleHeader.module.scss';

export const WriteArticleHeader: FC = () => {
  const dispatch = useDispatch();

  const publishHandler = useCallback(() => {
    dispatch(openPublishModal());
  }, []);

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
