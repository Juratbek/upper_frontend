import { ChangeableText } from 'components';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { addTutorialArticle, changeTutorialArticle } from 'store/states';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

const PlusIcon = ICONS.plus;

export const Article: FC<IArticleProps> = ({ article, section }) => {
  const dispatch = useAppDispatch();

  const changeArticleNameNandler = (name: string): unknown =>
    dispatch(changeTutorialArticle({ section, article: { ...article, name } }));

  const addArticle = (): unknown =>
    dispatch(addTutorialArticle({ section, article: { id: uuid(), name: 'Maqola nomi' } }));

  return (
    <div className={classes.header}>
      <ChangeableText value={article.name} defaultFocused onSubmit={changeArticleNameNandler} />
      <div className={classes.actions}>
        <span className={classes.icon} onClick={addArticle}>
          <PlusIcon />
        </span>
      </div>
    </div>
  );
};
