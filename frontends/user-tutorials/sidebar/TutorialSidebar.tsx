import { Button, ChangeableText } from 'components';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useChangeTutorialNameMutation, useLazyGetTutorialByIdQuery } from 'store/apis';
import {
  addTutorialSection,
  changeTutorialName,
  clearTutorial,
  getTutorialName,
  getTutorialSections,
  publishTutorialModalHandler,
  setTutorial,
} from 'store/states';
import { ITutorialSection } from 'types';
import { uuid, validateTutorial } from 'utils';
import { ICONS } from 'variables';

import {
  PublishTutorialModal,
  RemoveArticleModal,
  RemoveSectionModal,
  Section,
} from './components';
import { UUID_SIZE } from './TutorialSidebar.constants';
import classes from './TutorialSidebar.module.scss';

const AddFolderIcon = ICONS.addFolder;

export const TutorialSidebar: FC = () => {
  const [changeName, changeNameRes] = useChangeTutorialNameMutation();
  const [getById, getByIdRes] = useLazyGetTutorialByIdQuery();
  const {
    query: { id },
  } = useRouter();
  const tutorialName = useAppSelector(getTutorialName);
  const sections = useAppSelector(getTutorialSections);
  const dispatch = useAppDispatch();
  const { data: tutorial } = getByIdRes;

  const addSectionHandler = (): void => {
    const newSection: ITutorialSection = {
      id: uuid(UUID_SIZE),
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

  const publishHandler = (): void => {
    validateTutorial(sections);
    dispatch(publishTutorialModalHandler({ isOpen: true }));
  };

  const shouldShowPublishBtn = useMemo(() => {
    if (tutorialName && sections.length > 0) {
      const firstSectionArticles = sections[0].articles;
      return firstSectionArticles.length > 0 || sections.length > 1;
    }
    return false;
  }, [tutorialName, sections]);

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
      <PublishTutorialModal />
      {shouldShowPublishBtn && (
        <>
          <div className='px-2 py-1'>
            <Button className='w-100' onClick={publishHandler}>
              {tutorial?.status === 'PUBLISHED' ? 'Qayta nashr qilish' : 'Nashr qilish'}
            </Button>
          </div>
        </>
      )}

      <div className={classes.header}>
        <ChangeableText
          value={tutorialName}
          onSubmit={tutorialNameChangeHandler}
          loading={changeNameRes.isLoading}
        />
        {!changeNameRes.isLoading && (
          <span className={classes.icon} onClick={addSectionHandler}>
            <AddFolderIcon />
          </span>
        )}
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
