import { ChangeableText, IconButton } from 'components';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useState } from 'react';
import { useAppDispatch } from 'store';
import { useSaveTutorialSectionItemMutation } from 'store/apis';
import {
  addTutorialSectionItemByTarget,
  editTutorialSectionItem,
  IAddTutorialArticleBytargetPayloadAction,
  removeArticleModalHandler,
  setSelectedArticle,
} from 'store/states';
import { ICONS } from 'variables';

import classes from './SectionItem.module.scss';
import { ISectionItemProps } from './SectionItem.types';

const PlusIcon = ICONS.plus;

export const SectionItem: FC<ISectionItemProps> = ({ item, section, onClick }) => {
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [saveSectionItem, saveSectionItemRes] = useSaveTutorialSectionItemMutation();
  const isLoading = saveSectionItemRes.isLoading;
  const {
    query: { id },
  } = useRouter();

  const articleNameSubmitHandler = async (name: string): Promise<void> => {
    if (!id) return Promise.reject();

    const res = await saveSectionItem({
      sectionId: section.id,
      tutorialId: +id,
      item: { ...item, name },
      targetItem: item.target,
    }).unwrap();
    dispatch(editTutorialSectionItem({ section, item: res, isNew: !Boolean(item.id) }));
  };

  const openRemoveArticleModal = (event: MouseEvent<HTMLSpanElement>): void => {
    event.stopPropagation();
    dispatch(removeArticleModalHandler(true));
    dispatch(setSelectedArticle(item));
  };

  const addSectionItem = (event: MouseEvent<HTMLSpanElement>): void => {
    event.stopPropagation();
    const payload: IAddTutorialArticleBytargetPayloadAction = {
      section,
      target: item,
    };
    dispatch(addTutorialSectionItemByTarget(payload));
  };

  const isFocusedHandler = (value: boolean) => () => setIsFocused(value);

  return (
    <div className={classes.header}>
      <ChangeableText
        value={item.name}
        defaultFocused={item.defaultFocused}
        onSubmit={articleNameSubmitHandler}
        loading={isLoading}
        onClick={onClick}
        onBlur={isFocusedHandler(false)}
        onFocus={isFocusedHandler(true)}
      />
      {!isFocused && (
        <div className={classes.actions}>
          <IconButton
            className={classes.icon}
            style={{ transform: 'rotate(45deg)' }}
            onClick={openRemoveArticleModal}
          >
            <PlusIcon />
          </IconButton>
          <IconButton className={classes.icon} onClick={addSectionItem}>
            <PlusIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
