import { FC } from 'react';

import { ArticleFooter } from '../Footer/ArticleFooter';
import classes from './ReadArticleBottomBar.module.scss';

export const ReadArticleBottomBar: FC = () => {
  return (
    <div className={classes.root}>
      <div className={`${classes.body} container`}>
        <ArticleFooter />
      </div>
    </div>
  );
};
