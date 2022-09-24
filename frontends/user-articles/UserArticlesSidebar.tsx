import { Alert, ArticleStatus, Button, Divider, IOption, Modal, Select } from 'components';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetLabelsQuery,
  useUpdateArticleMutaion,
  useUpdateArticleStatusMutation,
} from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import { TArticleStatus } from 'types';
import { convertLabelsToOptions, convertOptionsToLabels } from 'utils';
import { TELEGRAM_BOT } from 'variables';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  ARTICLE_ACTIONS,
  ARTICLE_SIDEBAR_BUTTONS,
  ARTICLE_SIDEBAR_MODAL_CONTENTS,
} from './UserArticlesSidebar.constants';
import { IArticleSidebarAction, TArticleAction } from './UserArticlesSidebar.types';

export const UserArticlesSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<TArticleAction>();
  const [updateArticle, { isLoading: isUpdatingArticle }] = useUpdateArticleMutaion();
  const [updateArticleStatus, updateArticleStatusResponse] = useUpdateArticleStatusMutation();
  const { data: labels } = useGetLabelsQuery();
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
    const blocks = editorData.blocks;
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const updated = await updateArticle({ ...article, title, blocks }).unwrap();
    dispatch(setArticle(updated));
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
    if (!MODAL || !article) return;
    const status = MODAL.btn.status;
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

  return (
    <>
      {MODAL && (
        <Modal size='small' isOpen={isModalOpen} close={closeModal}>
          {updateArticleStatusResponse.isError && (
            <Alert>
              Xatolik yuz berdi. Iltimos bu haqda{' '}
              <a href={TELEGRAM_BOT.link} className='link'>
                {TELEGRAM_BOT.name}
              </a>{' '}
              telegram botiga habar bering
              <br />
              <p className='overflow-wrap'>{JSON.stringify(updateArticleStatusResponse.error)}</p>
            </Alert>
          )}
          <p>
            <strong>“Maqola sarlavhasi”</strong> maqolani {MODAL.text || ''}
          </p>
          <div className='justify-content-around d-flex'>
            <Button color='outline-dark' onClick={closeModal}>
              Yo`q
            </Button>
            <Button color={MODAL.btn.color || 'dark'} onClick={confirmAction}>
              {MODAL.btn.text}
            </Button>
          </div>
        </Modal>
      )}
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status}>
            <Link href={`/articles/${article.publishedArticleId}`}>
              Nashr varyantini ko&apos;rish
            </Link>
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
              >
                Nashr qilish
              </Button>
            )}
          </div>
        </>
      )}
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <label htmlFor='labels' className='mb-1 d-block'>
        Teglar
      </label>
      {article && labels && (
        <Select
          onChange={labelsChangeHandler}
          disabled={[ARTICLE_STATUSES.DELETED].includes(status as TArticleStatus)}
          defaultValues={convertLabelsToOptions(article.labels)}
          options={convertLabelsToOptions(labels)}
        />
      )}
    </>
  );
};
