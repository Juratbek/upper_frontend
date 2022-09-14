import { ArticleStatus, Button, Divider, Modal, Select } from 'components';
import { FC, useState } from 'react';
import { useAppSelector } from 'store';
import { useGetLabelsQuery } from 'store/apis';
import { getArticle } from 'store/states';
import { convertToOptions } from 'utils';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  ARTICLE_ACTIONS,
  ARTICLE_SIDEBAR_CONTENTS,
  ARTICLE_SIDEBAR_MODAL_CONTENTS,
} from './UserArticlesSidebar.constants';
import { ARTICLE_SIDEBAR_BUTTONS } from './UserArticlesSidebar.constants';
import { TArticleAction } from './UserArticlesSidebar.types';

export const UserArticlesSidebar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<TArticleAction>('');
  const article = useAppSelector(getArticle);
  const { data: labels } = useGetLabelsQuery();
  const status = article?.status;

  const BTN = ARTICLE_SIDEBAR_CONTENTS[status as string];
  const MODAL = ARTICLE_SIDEBAR_MODAL_CONTENTS[status as string]?.[action];

  const closeModal = (): void => {
    setIsModalOpen(false);
    setAction('');
  };

  const openModal = (action: TArticleAction): void => {
    setIsModalOpen(true);
    setAction(action);
  };

  const deleteArticle = (action: TArticleAction): void => {
    openModal(action);
  };

  return (
    <>
      {MODAL && (
        <Modal size='small' isOpen={isModalOpen} close={closeModal}>
          <p>
            <strong>“Maqola sarlavhasi”</strong> maqolani {MODAL.text || ''}
          </p>
          <div className='justify-content-around d-flex'>
            <Button color='outline-dark' onClick={closeModal}>
              Yo`q
            </Button>
            <Button color={MODAL.btn.color || 'dark'}>{MODAL.btn.text}</Button>
          </div>
        </Modal>
      )}
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status} />
          <div className='d-flex'>
            <Button
              color='outline-red'
              className='me-1'
              onClick={(): void =>
                deleteArticle(
                  status === ARTICLE_STATUSES.DELETED
                    ? ARTICLE_ACTIONS.fullDelete
                    : ARTICLE_ACTIONS.delete,
                )
              }
            >
              {status === ARTICLE_STATUSES.DELETED ? 'To`liq o`chirish' : 'O`chirish'}
            </Button>
            <Button
              className='flex-1'
              color={BTN.color}
              onClick={(): void => openModal(BTN.action)}
            >
              {BTN.text}
            </Button>
          </div>
          <div className='d-flex flex-wrap m--1'>
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.delete].includes(status) && (
              <Button color='outline-red' className='flex-auto m-1'>
                O`chirish
              </Button>
            )}
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.fullDelete].includes(status) && (
              <Button color='outline-red' className='flex-auto m-1'>
                To`liq o`chirish
              </Button>
            )}
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.publish].includes(status) && (
              <Button className='flex-auto m-1'>Nashr qilish</Button>
            )}
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.republish].includes(status) && (
              <Button className='flex-auto m-1'>Qayta nashr qilish</Button>
            )}
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.restore].includes(status) && (
              <Button className='flex-auto m-1'>Tiklash</Button>
            )}
            {ARTICLE_SIDEBAR_BUTTONS[ARTICLE_ACTIONS.unpublish].includes(status) && (
              <Button className='flex-auto m-1'>Nashrni bekor qilish</Button>
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
          disabled={[ARTICLE_STATUSES.DELETED].includes(status as string)}
          defaultValues={convertToOptions(article?.labels, 'id', 'name')}
          options={convertToOptions(labels, 'id', 'name')}
        />
      )}
    </>
  );
};
