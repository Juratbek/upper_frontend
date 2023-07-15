import { Alert, ApiErrorBoundary, Button, Tooltip, TutorialSidebarSkeleton } from 'components';
import { useTheme, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetTutorialByIdQuery, useUpdateArticleMutation } from 'store/apis';
import {
  clearTutorial,
  getTutorialName,
  getTutorialSections,
  publishTutorialModalHandler,
  setTutorial,
} from 'store/states';
import { validateTutorial } from 'utils';
import { ICONS } from 'variables';

import {
  Name,
  PublishTutorialModal,
  RemoveArticleModal,
  RemoveSectionModal,
  Section,
} from './components';
import classes from './TutorialSidebar.module.scss';

export const TutorialSidebar: FC = () => {
  const [getById, getByIdRes] = useLazyGetTutorialByIdQuery();
  const [, updateRes] = useUpdateArticleMutation({
    fixedCacheKey: 'update-article',
  });
  const [alert, setAlert] = useState<string>();
  const {
    query: { id },
  } = useRouter();
  const { setParams } = useUrlParams();
  const tutorialName = useAppSelector(getTutorialName);
  const sections = useAppSelector(getTutorialSections);
  const dispatch = useAppDispatch();
  const { themeColors } = useTheme();
  const { data: tutorial } = getByIdRes;

  const publishHandler = (): void => {
    const { isValid, message, cause, itemId } = validateTutorial(sections);
    // if tutorial is valid clear alert and open publish modal;
    if (isValid) {
      setAlert('');
      dispatch(publishTutorialModalHandler({ isOpen: true }));
      return;
    }
    // if there is an item with no assigned article select this item
    if (cause === 'article-not-assigned') {
      setParams({ itemId, articleId: '' });
    }
    setAlert(message);
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

  const alertComponent = useMemo(
    () => (
      <Alert
        show={Boolean(alert)}
        className='mt-1 mx-1'
        onClose={(): void => setAlert('')}
        color='red'
      >
        {alert}
      </Alert>
    ),
    [alert],
  );

  const StatusIcon = useMemo(() => {
    const { isLoading, isError } = updateRes;
    if (isLoading) return { component: ICONS.uploading, tooltip: 'Saqlanmoqda...' };
    if (isError)
      return {
        component: ICONS.uploadError,
        tooltip: 'Saqlashda xatolik yuz berdi. Iltimos internet aloqasini tekshiring',
      };
    return { component: ICONS.uploadSuccess, tooltip: 'Saqlangan' };
  }, [updateRes]);

  return (
    <div className={classes.root}>
      <RemoveArticleModal />
      <RemoveSectionModal />
      <PublishTutorialModal />
      {alertComponent}
      <ApiErrorBoundary
        res={getByIdRes}
        memoizationDependencies={[tutorialName, sections, StatusIcon]}
        fallback={<TutorialSidebarSkeleton withActionIcons />}
      >
        <div className='px-2 py-1 d-flex f-gap-2 align-items-center'>
          <Button className='w-100' onClick={publishHandler}>
            {tutorial?.status === 'PUBLISHED' ? 'Qayta nashr qilish' : 'Nashr qilish'}
          </Button>
          <Tooltip tooltip={StatusIcon.tooltip} position='left'>
            <StatusIcon.component color={themeColors.icon} width={30} height={30} />
          </Tooltip>
        </div>

        <div className={classes.header}>
          <Name />
        </div>
        <div>
          {sections?.map((section) => (
            <Fragment key={section.id}>
              <Section section={section} />
            </Fragment>
          ))}
        </div>
      </ApiErrorBoundary>
    </div>
  );
};
