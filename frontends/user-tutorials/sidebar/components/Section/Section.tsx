import { ChangeableText } from 'components';
import { useClickOutside, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useAddTutorialSectionMutation, useEditTutorialSectionMutation } from 'store/apis';
import {
  addTutorialArticle,
  addTutorialSectionByTarget,
  editTutorialSection,
  getTutorialSections,
  IAddTutorialArticlePayloadAction,
  setSelectedSection,
  toggleRemoveSectionModal,
} from 'store/states';
import { ITutorialArticle, ITutorialSection } from 'types';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { UUID_SIZE } from '../../TutorialSidebar.constants';
import { Article } from '../Article/Article';
import classes from './Section.module.scss';
import { ISectionProps } from './Section.types';

const PlusIcon = ICONS.plus;

export const Section: FC<ISectionProps> = ({ section }) => {
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const sections = useAppSelector(getTutorialSections);
  const [addSection, addSectionRes] = useAddTutorialSectionMutation();
  const [editSection, editSectionRes] = useEditTutorialSectionMutation();
  const {
    query: { id },
  } = useRouter();
  const { setParams } = useUrlParams();
  const dispatch = useAppDispatch();
  const isLoading = addSectionRes.isLoading || editSectionRes.isLoading;

  const closeAddPopover = (): void => setIsAddPopoverOpen(false);
  const [popoverRef] = useClickOutside(closeAddPopover, '[data-action="open-add-popover"]');

  const openAddItemsPopover = (): void => setIsAddPopoverOpen(true);

  const openRemoveSectionModal = (): void => {
    dispatch(setSelectedSection(section));
    dispatch(toggleRemoveSectionModal());
  };

  const addArticleHandler = (): void => {
    const payload: IAddTutorialArticlePayloadAction = {
      section,
      article: { id: uuid(UUID_SIZE), name: 'Maqola nomi', defaultFocused: true, new: true },
    };
    dispatch(addTutorialArticle(payload));
    closeAddPopover();
  };

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = {
      id: uuid(UUID_SIZE),
      name: "Bo'lim nomi",
      articles: [],
      defaultFocused: true,
      new: true,
    };
    dispatch(addTutorialSectionByTarget({ newSection, targetSection: section }));
    closeAddPopover();
  };

  const submitHandler = async (name: string): Promise<void> => {
    if (!id) return Promise.reject();

    if (section.new) {
      const targetSection = sections.reduce<ITutorialSection | undefined>((target, s, index) => {
        if (s.id === section.id && index > 1 && index !== sections.length - 1)
          return sections[index - 1];

        return target;
      }, undefined);

      const res = await addSection({
        tutorialId: +id,
        newSection: { ...section, name },
        targetSection: targetSection,
      }).unwrap();
      dispatch(editTutorialSection(res));
      return Promise.resolve();
    }

    const res = await editSection({
      tutorialId: +id,
      section: { ...section, name },
    }).unwrap();
    dispatch(editTutorialSection(res));
  };

  const addPopover = (
    <div
      ref={popoverRef}
      className={`${classes['add-popover']} ${isAddPopoverOpen && classes.open}`}
    >
      <ul>
        <li onClick={addSectionHandler}>Bo&apos;lim qo&apos;shish</li>
        <li onClick={addArticleHandler}>Maqola qo&apos;shish</li>
      </ul>
    </div>
  );

  const selectArticle = (article: ITutorialArticle): void => {
    setParams({ sectionId: section.id, articleId: article.id, alert: '' });
  };

  return (
    <div>
      <div className={classes.header}>
        <ChangeableText
          value={section.name}
          onSubmit={submitHandler}
          defaultFocused={section.defaultFocused}
          loading={isLoading}
        />
        {!isLoading && (
          <div className={classes.actions}>
            <span
              className={classes.icon}
              style={{ transform: 'rotate(45deg)' }}
              onClick={openRemoveSectionModal}
            >
              <PlusIcon />
            </span>
            <span
              className={classes.icon}
              data-action='open-add-popover'
              onClick={openAddItemsPopover}
            >
              <PlusIcon />
            </span>
          </div>
        )}
        {addPopover}
      </div>
      <ul className={classes.articles}>
        {section.articles.map((article) => (
          <li key={article.id}>
            <Article
              article={article}
              section={section}
              onClick={(): void => selectArticle(article)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
