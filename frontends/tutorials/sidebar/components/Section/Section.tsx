import { ChangeableText } from 'components';
import { useClickOutside } from 'hooks';
import { FC, useState } from 'react';
import { useAppDispatch } from 'store';
import {
  addTutorialArticle,
  addTutorialSection,
  editTutorialSection,
  setSelectedSection,
  toggleRemoveSectionModal,
} from 'store/states';
import { ITutorialSection } from 'types';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { Article } from '../Article/Article';
import classes from './Section.module.scss';
import { ISectionProps } from './Section.types';

const PlusIcon = ICONS.plus;

export const Section: FC<ISectionProps> = ({ section }) => {
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const dispatch = useAppDispatch();

  const closeAddPopover = (): void => setIsAddPopoverOpen(false);
  const [popoverRef] = useClickOutside(closeAddPopover, '[data-action="open-add-popover"]');

  const openAddItemsPopover = (): void => setIsAddPopoverOpen(true);

  const openRemoveArticleModal = (): void => {
    dispatch(setSelectedSection(section));
    dispatch(toggleRemoveSectionModal());
  };

  const addArticleHandler = (): void => {
    const newArticle = { section, article: { id: uuid(5), name: 'Maqola nomi' } };
    dispatch(addTutorialArticle(newArticle));
    closeAddPopover();
  };

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = { id: uuid(), name: "Bo'lim nomi", articles: [] };
    dispatch(addTutorialSection(newSection));
    closeAddPopover();
  };

  const changeSectionName = (name: string): unknown =>
    dispatch(editTutorialSection({ ...section, name }));

  const addPopover = (
    <div
      ref={popoverRef}
      className={`${classes['add-popover']} ${isAddPopoverOpen && classes.open}`}
    >
      <ul>
        <li onClick={addArticleHandler}>Maqola qo&apos;shish</li>
        <li onClick={addSectionHandler}>Bo&apos;lim qo&apos;shish</li>
      </ul>
    </div>
  );

  return (
    <div>
      <div className={classes.header}>
        <ChangeableText value={section.name} onSubmit={changeSectionName} defaultFocused />
        <div className={classes.actions}>
          <span
            className={classes.icon}
            style={{ transform: 'rotate(45deg)' }}
            onClick={openRemoveArticleModal}
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
        {addPopover}
      </div>
      <ul className={classes.articles}>
        {section.articles.map((article) => (
          <li key={article.id}>
            <Article article={article} section={section} />
          </li>
        ))}
      </ul>
    </div>
  );
};
