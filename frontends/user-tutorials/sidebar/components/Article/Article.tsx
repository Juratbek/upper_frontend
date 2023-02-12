import { ChangeableText } from 'components';
import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';
import { useAppDispatch } from 'store';
import { useEditTutorialSectionMutation } from 'store/apis';
import {
  addTutorialArticleByTarget,
  editTutorialSection,
  IAddTutorialArticleBytargetPayloadAction,
  removeArticleModalHandler,
  setSelectedArticle,
} from 'store/states';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { UUID_SIZE } from '../../TutorialSidebar.constants';
import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

const PlusIcon = ICONS.plus;

export const Article: FC<IArticleProps> = ({ article, section, onClick }) => {
  const dispatch = useAppDispatch();
  const [edsitSection, edsitSectionRes] = useEditTutorialSectionMutation();
  const isLoading = edsitSectionRes.isLoading;
  const {
    query: { id },
  } = useRouter();

  const changeArticleNameNandler = async (name: string): Promise<void> => {
    if (!id) return Promise.reject();

    const editedArticles = section.articles.map((a) => (a.id === article.id ? { ...a, name } : a));
    const res = await edsitSection({
      section: { ...section, articles: editedArticles },
      tutorialId: +id,
    }).unwrap();
    dispatch(editTutorialSection(res));
  };

  const openRemoveArticleModal = (event: MouseEvent<HTMLSpanElement>): void => {
    event.stopPropagation();
    dispatch(removeArticleModalHandler(true));
    dispatch(setSelectedArticle(article));
  };

  const addArticleHandler = (event: MouseEvent<HTMLSpanElement>): void => {
    event.stopPropagation();
    const payload: IAddTutorialArticleBytargetPayloadAction = {
      section,
      article: { id: uuid(UUID_SIZE), name: 'Maqola nomi', defaultFocused: true, new: true },
      target: article,
    };
    dispatch(addTutorialArticleByTarget(payload));
  };

  return (
    <div className={classes.header}>
      <ChangeableText
        value={article.name}
        defaultFocused={article.defaultFocused}
        onSubmit={changeArticleNameNandler}
        loading={isLoading}
        onClick={onClick}
      />
      {!isLoading && (
        <div className={classes.actions}>
          <span
            className={classes.icon}
            style={{ transform: 'rotate(45deg)' }}
            onClick={openRemoveArticleModal}
          >
            <PlusIcon />
          </span>
          <span className={classes.icon} onClick={addArticleHandler}>
            <PlusIcon />
          </span>
        </div>
      )}
    </div>
  );
};
