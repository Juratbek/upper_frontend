import { Alert, ArticleStatus, Button, Divider, IOption, Modal, Select } from 'components';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetLabelsQuery,
  useUpdateArticleMutaion,
  useUpdateArticleStatusMutation,
} from 'store/apis';
import { getArticle, getEditor, setArticle } from 'store/states';
import { ILabel, TArticleStatus } from 'types';
import { convertLabelsToOptions } from 'utils';
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
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>(
    convertLabelsToOptions(article?.labels),
  );
  const [updateArticle, { isLoading: isUpdatingArticle }] = useUpdateArticleMutaion();
  const [updateArticleStatus, updateArticleStatusResponse] = useUpdateArticleStatusMutation();
  const { data: labels } = useGetLabelsQuery();
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
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));
    const updated = await updateArticle({ id: article.id, title, blocks, labels }).unwrap();
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
        await updateArticleStatus({ id: article.id, status });
        dispatch(setArticle({ ...article, status }));
        closeModal();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
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
                loading={isUpdatingArticle}
                onClick={(): void => clickHandler(button)}
              >
                {button.text}
              </Button>
            ))}
            {article.hasNotpublishedChanges && (
              <Button className='flex-auto m-1 mb-0'>Nashr qilish</Button>
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
          defaultValues={selectedLabels}
          options={convertLabelsToOptions(labels)}
        />
      )}
    </>
  );
};
