import { Clickable, Divider } from 'components/lib';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDislike, useLike } from 'store/clients/published-article';
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
  const { mutate: like } = useLike(article.id);
  const { mutate: dislike } = useDislike(article.id);

  const commentClickHandler = (): unknown => dispatch(openCommentsModal());

  const likeHandler = (): unknown => like(article.id);

  const dislikeHandler = (): unknown => dislike(article.id);

  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Clickable onClick={likeHandler}>
          <Like />
        </Clickable>
        <span className={classes['like-count']}>12</span>
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Clickable onClick={dislikeHandler}>
          <Dislike />
        </Clickable>
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
