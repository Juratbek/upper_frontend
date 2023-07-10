import { ChangeableText } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useChangeTutorialNameMutation } from 'store/apis';
import { addTutorialSection, changeTutorialName, getTutorialName } from 'store/states';
import { ITutorialSection } from 'types';
import { ICONS } from 'variables';

import classes from './Name.module.scss';

const AddFolderIcon = ICONS.addFolder;

export const Name: FC = () => {
  const tutorialName = useAppSelector(getTutorialName);
  const [isFocused, setIsFocused] = useState(false);
  const [sendChangeNameReq, changeNameRes] = useChangeTutorialNameMutation();
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = {
      id: '',
      name: "Bo'lim nomi",
      items: [],
      defaultFocused: true,
    };
    dispatch(addTutorialSection(newSection));
  };

  const tutorialNameChangeHandler = (name: string): void => {
    if (!id) return;
    sendChangeNameReq({ id: +id, name }).then(() => {
      dispatch(changeTutorialName(name));
    });
  };

  const isFocusedHandler = (value: boolean) => () => setIsFocused(value);

  return (
    <div className={classes.container}>
      <ChangeableText
        value={tutorialName}
        onSubmit={tutorialNameChangeHandler}
        loading={changeNameRes.isLoading}
        onFocus={isFocusedHandler(true)}
        onBlur={isFocusedHandler(false)}
      />
      {!isFocused && (
        <span className={classes.icon} onClick={addSectionHandler}>
          <AddFolderIcon />
        </span>
      )}
    </div>
  );
};
