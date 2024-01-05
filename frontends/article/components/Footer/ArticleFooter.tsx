import { Divider } from 'components/lib';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
// import { openCommentsModal } from 'store/states';
import { ICONS } from 'variables';

import classes from './ArticleFooter.module.scss';

const Like = ICONS.like;
const Dislike = ICONS.dislike;

export const ArticleFooter: FC = () => {
  const dispatch = useDispatch();

  // const commentClickHandler = (): unknown => dispatch(openCommentsModal());

  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Like />
        <span className={classes['like-count']}>12</span>
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Dislike />
      </div>
    </div>
  );
};
