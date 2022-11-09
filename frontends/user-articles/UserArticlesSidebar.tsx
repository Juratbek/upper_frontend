import { Alert, ArticleStatus, Button, Divider, IOption, Modal, MultiSelect } from 'components';
import { useShortCut, useUrlParams } from 'hooks';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useLazySearchLabelsQuery,
  useUpdateArticleMutaion,
  useUpdateArticleStatusMutation,
} from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import { TArticleStatus } from 'types';
import {
  convertLabelsToOptions,
  convertOptionsToLabels,
  removeAmazonUriFromImgBlocks,
  validateArticle,
} from 'utils';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  ARTICLE_ACTIONS,
  ARTICLE_SIDEBAR_BUTTONS,
  ARTICLE_SIDEBAR_MODAL_CONTENTS,
} from './UserArticlesSidebar.constants';
import { IArticleSidebarAction, TArticleAction } from './UserArticlesSidebar.types';

export const UserArticlesSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { location } = useUrlParams();
  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<TArticleAction>();
  const [alert, setAlert] = useState<string>();
  const [updateArticle, { isLoading: isUpdatingArticle }] = useUpdateArticleMutaion();
  const [updateArticleStatus, updateArticleStatusResponse] = useUpdateArticleStatusMutation();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();

  const isLoading = useMemo(
    () => isUpdatingArticle || updateArticleStatusResponse.isLoading,
    [isUpdatingArticle, updateArticleStatusResponse.isLoading],
  );
  const status = article?.status;

  const BUTTONS = ARTICLE_SIDEBAR_BUTTONS[status as TArticleStatus];
  const MODAL = action && ARTICLE_SIDEBAR_MODAL_CONTENTS[action];

  const closeModal = (): void => {
    setIsModalOpen(false);
    setAction(undefined);
    updateArticleStatusResponse.reset();
  };

  const openModal = (action: TArticleAction): void => {
    setIsModalOpen(true);
    setAction(action);
  };

  const saveChanges = async (): Promise<void> => {
    if (!editor || !article) return Promise.reject();

    const editorData = await editor?.save();
    const blocks = removeAmazonUriFromImgBlocks(editorData.blocks);
    const title = blocks.find((block) => block.type === 'header')?.data.text;

    const updatedArticle = await updateArticle({ ...article, title, blocks }).unwrap();
    dispatch(setArticle({ ...article, ...updatedArticle }));
    setAlert('');
  };

  const clickHandler = (button: IArticleSidebarAction): void => {
    if (button.shouldOpenModal) {
      return openModal(button.action);
    }
    if (button.action === ARTICLE_ACTIONS.save) {
      saveChanges();
    }
  };

  const confirmAction = async (): Promise<void> => {
    if (!MODAL || !article || !editor) return;
    const { status, shouldValidate } = MODAL.btn;
    if (shouldValidate) {
      const editorData = await editor?.save();
      const blocks = editorData.blocks;
      const message = validateArticle(article, blocks);
      if (message) return setAlert(message);
    }
    if (status) {
      try {
        const updatedArticle = await updateArticleStatus({ id: article.id, status }).unwrap();
        dispatch(setArticle({ ...article, ...updatedArticle }));
        closeModal();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    const selectedLabels = convertOptionsToLabels(options);
    dispatch(setLabels(selectedLabels));
  };

  const SearchLabels = (value: string): void => {
    value && searchLabels(value);
  };

  const isSavePressed = useShortCut('s');
  const isPublishPressed = useShortCut('p');

  useEffect(() => {
    if (isSavePressed) saveChanges();
    if (isPublishPressed) openModal(ARTICLE_ACTIONS.publish);
  }, [isSavePressed, isPublishPressed]);

  return (
    <>
      {MODAL && (
        <Modal size='small' isOpen={isModalOpen} close={closeModal}>
          {alert && (
            <Alert color='red' onClose={(): void => setAlert('')} className='mb-1'>
              <div>{alert}</div>
              <a href={`${location.origin}/docs`} target='_blank' className='link' rel='noreferrer'>
                Yo`riqnomani o`qish
              </a>
            </Alert>
          )}
          <p className='text-center'>
            <strong>“Maqola sarlavhasi”</strong> maqolani {MODAL.text || ''}
          </p>
          <div className='justify-content-around d-flex'>
            <Button color='outline-dark' onClick={closeModal}>
              Yo`q
            </Button>
            <Button color={MODAL.btn.color || 'dark'} onClick={confirmAction} loading={isLoading}>
              {MODAL.btn.text}
            </Button>
          </div>
        </Modal>
      )}
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status}>
            {article.publishedArticleId && (
              <Link href={`/articles/${article.publishedArticleId}`}>
                <a target={'_blank'}>Nashr varyantini ko&apos;rish</a>
              </Link>
            )}
          </ArticleStatus>
          <div className='d-flex flex-wrap m--1'>
            {BUTTONS.map((button, index) => (
              <Button
                key={index}
                className='flex-auto m-1 mb-0'
                color={button.color}
                loading={isLoading}
                onClick={(): void => clickHandler(button)}
              >
                {button.text}
              </Button>
            ))}
            {article.hasNotpublishedChanges && (
              <Button
                className='flex-auto m-1 mb-0'
                onClick={(): void => openModal(ARTICLE_ACTIONS.publish)}
                loading={isLoading}
              >
                Nashr qilish
              </Button>
            )}
          </div>
        </>
      )}
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      {article && (
        <div className='mb-1'>
          <label htmlFor='labels' className='mb-1 d-block'>
            Teglar
          </label>
          <MultiSelect
            onChange={labelsChangeHandler}
            disabled={status === ARTICLE_STATUSES.DELETED}
            onInputDebounce={SearchLabels}
            defaultValues={convertLabelsToOptions(article.labels)}
            renderItem={(item): JSX.Element => {
              return (
                <div className='p-1 pointer'>
                  <h4 className='m-0'>{item.label}</h4>
                  <p className='m-0 mt-1 fs-1'>{item.description}</p>
                </div>
              );
            }}
            options={convertLabelsToOptions(searchLabelsRes.data)}
            inputPlacegolder='Qidirish uchun yozing'
          />
        </div>
      )}
    </>
  );
};
