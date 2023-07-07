import { ChangeableText, IconButton } from 'components';
import { useClickOutside, useModal } from 'hooks';
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
import { ITutorialSection } from 'types';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { UUID_SIZE } from '../../TutorialSidebar.constants';
import classes from './Section.module.scss';

const PlusIcon = ICONS.plus;

export const SectionHeader: FC<{ section: ITutorialSection }> = ({ section }) => {
  const sections = useAppSelector(getTutorialSections);
  const [isAddPopoverOpen, , { close: closeAddPopover, open: openAddPopover }] = useModal(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    query: { id },
  } = useRouter();
  const [popoverRef] = useClickOutside(closeAddPopover, '[data-action="open-add-popover"]');
  const dispatch = useAppDispatch();
  const [addSection] = useAddTutorialSectionMutation();
  const [editSection] = useEditTutorialSectionMutation();

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
      new: true,
      target: section,
    };
    dispatch(addTutorialSectionByTarget({ newSection, targetSection: section }));
    closeAddPopover();
  };

  const openRemoveSectionModal = (): void => {
    dispatch(setSelectedSection(section));
    dispatch(toggleRemoveSectionModal());
  };

  const submitHandler = async (name: string): Promise<void> => {
    if (!id) return Promise.reject();

    if (section.new) {
      const res = await addSection({
        tutorialId: +id,
        newSection: { ...section, name },
        targetSection: section.target,
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

  const isFocusedHandler = (value: boolean) => () => setIsFocused(value);

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

  return (
    <div className={classes.header}>
      <ChangeableText
        value={section.name}
        onSubmit={submitHandler}
        defaultFocused={section.new}
        onFocus={isFocusedHandler(true)}
        onBlur={isFocusedHandler(false)}
      />
      {!isFocused && (
        <div className={classes.actions}>
          <IconButton
            className={classes.icon}
            style={{ transform: 'rotate(45deg)' }}
            onClick={openRemoveSectionModal}
          >
            <PlusIcon />
          </IconButton>
          <IconButton
            className={classes.icon}
            data-action='open-add-popover'
            onClick={openAddPopover}
          >
            <PlusIcon />
          </IconButton>
        </div>
      )}
      {addPopover}
    </div>
  );
};
