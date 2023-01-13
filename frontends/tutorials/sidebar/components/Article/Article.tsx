import { ChangeableText } from 'components';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { changeTutorialArticle } from 'store/states';
import { ICONS } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

const PlusIcon = ICONS.plus;

export const Article: FC<IArticleProps> = ({ article, sectionId }) => {
  const dispatch = useAppDispatch();

  const changeArticleNameNandler = (name: string): unknown =>
    dispatch(changeTutorialArticle({ sectionId, article: { ...article, name } }));

  return (
    <div className={classes.header}>
      <ChangeableText value={article.name} defaultFocused onSubmit={changeArticleNameNandler} />
      <div className={classes.actions}>
        <span className={classes.icon}>
          <PlusIcon />
        </span>
      </div>
    </div>
  );
};
