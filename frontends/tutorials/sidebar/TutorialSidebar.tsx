import { ChangeableText } from 'components';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useChangeTutorialNameMutation, useLazyGetTutorialByIdQuery } from 'store/apis';
import {
  addTutorialSection,
  changeTutorialName,
  clearTutorial,
  getTutorialName,
  getTutorialSections,
  setTutorial,
} from 'store/states';
import { ITutorialSection } from 'types';
import { uuid } from 'utils';
import { ICONS } from 'variables';

import { RemoveArticleModal, RemoveSectionModal, Section } from './components';
import classes from './TutorialSidebar.module.scss';

const AddFolderIcon = ICONS.addFolder;

export const TutorialSidebar: FC = () => {
  const [changeName, changeNameRes] = useChangeTutorialNameMutation();
  const [getById] = useLazyGetTutorialByIdQuery();
  const {
    query: { id },
  } = useRouter();
  const tutorialName = useAppSelector(getTutorialName);
  const sections = useAppSelector(getTutorialSections);
  const dispatch = useAppDispatch();

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = {
      id: uuid(),
      name: "Bo'lim nomi",
      articles: [],
      defaultFocused: true,
      new: true,
    };
    dispatch(addTutorialSection(newSection));
  };

  const tutorialNameChangeHandler = (name: string): void => {
    if (!id) return;
    changeName({ id: +id, name }).then(() => {
      dispatch(changeTutorialName(name));
    });
  };

  useEffect(() => {
    if (!tutorialName && id) {
      getById(+id).then((res) => {
        res.data && dispatch(setTutorial(res.data));
      });
    }

    return () => {
      dispatch(clearTutorial());
    };
  }, [id]);

  return (
    <div className={classes.root}>
      <RemoveArticleModal />
      <RemoveSectionModal />
      <div className={classes.header}>
        <ChangeableText
          value={tutorialName}
          onSubmit={tutorialNameChangeHandler}
          loading={changeNameRes.isLoading}
        />
        <span className={classes.icon} onClick={addSectionHandler}>
          <AddFolderIcon />
        </span>
      </div>
      <div className={classes.body}>
        {sections?.map((section) => (
          <Fragment key={section.id}>
            <Section section={section} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
