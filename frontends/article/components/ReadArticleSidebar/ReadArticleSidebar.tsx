import { Comments, Divider } from 'components';
import { useAppSelector } from 'store';
import { getArticleAuthor } from 'store/states/readArticle';

import { Author } from '../Author';

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);

  if (!articleAuthor) return <></>;

  return (
    <>
      <Comments />
      <Author {...articleAuthor} className='mt-2' />
      <Divider className='my-2' />
    </>
  );
};
