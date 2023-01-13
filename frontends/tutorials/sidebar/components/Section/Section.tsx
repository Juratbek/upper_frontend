import { ChangeableText } from 'components';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTutorialSection } from 'store/states';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { Article } from '../Article/Article';
import classes from './Section.module.scss';
import { ISectionProps } from './Section.types';

const PlusIcon = ICONS.plus;

export const Section: FC<ISectionProps> = ({ section }) => {
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const dispatch = useDispatch();

  const openAddItemsPopover = (): void => {
    setIsAddPopoverOpen(true);
  };

  const addArticleHandler = (): unknown =>
    dispatch(
      editTutorialSection({
        ...section,
        articles: [...section.articles, { id: uuid(5), name: 'Yangi maqola' }],
      }),
    );

  const changeSectionName = (name: string): unknown =>
    dispatch(editTutorialSection({ ...section, name }));

  return (
    <div>
      <div className={classes.header}>
        <ChangeableText
          value={section.name}
          onSubmit={changeSectionName}
          defaultFocused={section.defaultFocused}
        />
        <div className={classes.actions}>
          <span className={classes.icon} onClick={openAddItemsPopover}>
            <PlusIcon />
          </span>
          <div className={`${classes['add-popover']} ${isAddPopoverOpen && classes.open}`}>
            <ul>
              <li onClick={addArticleHandler}>Maqola qo&apos;shish</li>
              <li>Bo&apos;lim qo&apos;shish</li>
            </ul>
          </div>
        </div>
      </div>
      <ul className={classes.articles}>
        {section.articles.map((article) => (
          <li key={article.id}>
            <Article article={article} sectionId={section.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
