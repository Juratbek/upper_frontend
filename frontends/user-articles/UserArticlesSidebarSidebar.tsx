import { ArticleStatus, Button, Divider, Modal, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { TArticleStatus } from 'types';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  ARTICLE_ACTIONS,
  ARTICLE_SIDEBAR_CONTENTS,
  ARTICLE_SIDEBAR_MODAL_CONTENTS,
} from './UserArticlesSidebar.constants';
import { TArticleAction } from './UserArticlesSidebar.types';

const options = [
  {
    label: 'JavaScript',
    value: 1,
  },
  {
    label: 'TypeScript',
    value: 2,
  },
  {
    label: 'HTML',
    value: 3,
  },
  {
    label: 'CSS',
    value: 4,
  },
];

export const UserArticlesSidebar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<TArticleAction>('');
  const {
    query: { status, id },
  } = useRouter();

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
          <ArticleStatus className='mb-1' status={status as TArticleStatus} />
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
        </>
      )}
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <label htmlFor='labels' className='mb-1 d-block'>
        Teglar
      </label>
      <Select
        disabled={[ARTICLE_STATUSES.DELETED].includes(status as string)}
        defaultValues={options.slice(0, 2)}
        options={options}
      />
    </>
  );
};
