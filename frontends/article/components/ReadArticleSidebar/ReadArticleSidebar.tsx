import { Divider } from 'components';
import { useAppSelector } from 'store';
import { getArticleAuthor } from 'store/states/readArticle';
import { appDynamic } from 'utils';

import { Author } from '../Author';

const DynamicComments = appDynamic(() => import('components/Comments'));

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);

  if (!articleAuthor) return <></>;

  return (
    <>
      <DynamicComments />
      <Author {...articleAuthor} className='mt-2' />
      <Divider className='my-2' />
    </>
  );
};
