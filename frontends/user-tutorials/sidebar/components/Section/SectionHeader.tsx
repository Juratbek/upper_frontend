import { ChangeableText, IconButton } from 'components';
import { useClickOutside, useModal, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch } from 'store';
import { useSaveTutorialSectionMutation } from 'store/apis';
import {
  addTutorialSectionByTarget,
  addTutorialSectionItem,
  editTutorialSection,
  setSelectedSection,
  toggleRemoveSectionModal,
} from 'store/states';
import { ITutorialSection } from 'types';
import { ICONS } from 'variables';

import classes from './Section.module.scss';

const PlusIcon = ICONS.plus;

export const SectionHeader: FC<{ section: ITutorialSection }> = ({ section }) => {
  const [isAddPopoverOpen, , { close: closeAddPopover, open: openAddPopover }] = useModal(false);
  const { themeColors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const {
    query: { id },
  } = useRouter();
  const [popoverRef] = useClickOutside(closeAddPopover, '[data-action="open-add-popover"]');
  const dispatch = useAppDispatch();
  const [saveSection] = useSaveTutorialSectionMutation();

  const addSectionItem = (): void => {
    dispatch(addTutorialSectionItem(section));
    closeAddPopover();
  };

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = {
      id: '',
      name: "Bo'lim nomi",
      items: [],
      defaultFocused: true,
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

    const res = await saveSection({
      tutorialId: +id,
      section: { ...section, name },
      targetSection: section.target,
    }).unwrap();
    dispatch(editTutorialSection(res));
  };

  const isFocusedHandler = (value: boolean) => () => setIsFocused(value);

  const addPopover = (
    <div
      ref={popoverRef}
      className={`${classes['add-popover']} ${isAddPopoverOpen && classes.open}`}
      style={{ backgroundColor: themeColors.popover.bg }}
    >
      <ul>
        <li onClick={addSectionHandler}>Bo&apos;lim qo&apos;shish</li>
        <li onClick={addSectionItem}>Maqola qo&apos;shish</li>
      </ul>
    </div>
  );

  return (
    <div className={classes.header}>
      <ChangeableText
        value={section.name}
        onSubmit={submitHandler}
        defaultFocused={section.defaultFocused}
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
