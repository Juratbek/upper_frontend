import { Divider } from 'components/lib';
import { FC } from 'react';
import { IArticle } from 'types';
import { ICONS } from 'variables';

import classes from './ArticleFooter.module.scss';

const Like = ICONS.like;
const Dislike = ICONS.dislike;

export const ArticleFooter: FC<{ article: IArticle }> = ({ article }) => {
  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Like />
        <span className={classes['like-count']}>{article.viewCount}</span>
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Dislike />
      </div>
    </div>
  );
};
