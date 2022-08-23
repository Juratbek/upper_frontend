import { ArticleStatus, Button, Divider, Select } from 'components';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { TArticleStatus } from 'types';
import { ARTICLE_STATUSES } from 'variables/article';

import { ARTICLE_SIDEBAR_CONTENTS } from './UserArticlesSidebar.constants';

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
  const {
    query: { status, id },
  } = useRouter();

  const BTN = ARTICLE_SIDEBAR_CONTENTS[status as string];

  const fullDeleteArticle = (): void => {
    console.log('full delete', id);
  };

  const deleteArticle = (): void => {
    console.log('delete', id);
  };

  return (
    <>
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status as TArticleStatus} />
          <div className='d-flex'>
            {status === ARTICLE_STATUSES.DELETED ? (
              <Button color='outline-red' className='me-1' onClick={fullDeleteArticle}>
                To`liq o`chirish
              </Button>
            ) : (
              <Button color='outline-red' className='me-1' onClick={deleteArticle}>
                O`chirish
              </Button>
            )}
            <Button className='flex-1' onClick={(): void => BTN.callback(id)}>
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
