import { Clickable, Divider } from 'components/lib';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { openCommentsModal } from 'store/states';
import { IArticle } from 'types';
import { ICONS } from 'variables';

import classes from './ArticleFooter.module.scss';

const Like = ICONS.like;
const Dislike = ICONS.dislike;
const CommentIcon = ICONS.comment;
const SaveIcon = ICONS.save;
const ShareIcon = ICONS.share;

export const ArticleFooter: FC<{ article: IArticle }> = ({ article }) => {
  const dispatch = useDispatch();

  const commentClickHandler = (): unknown => dispatch(openCommentsModal());

  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Like />
        <span className={classes['like-count']}>{article.viewCount}</span>
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Dislike />
      </div>
      <Clickable onClick={commentClickHandler} className={classes['comment-container']}>
        <CommentIcon />
      </Clickable>
      <div className={classes['actions-container']}>
        <Clickable>
          <SaveIcon />
        </Clickable>
        <Clickable>
          <ShareIcon />
        </Clickable>
      </div>
    </div>
  );
};
