import { Comments, Divider } from 'components';
import { useAppSelector } from 'store';
import { getIsCommentsSidebarOpen } from 'store/states';
import { getArticleAuthor } from 'store/states/readArticle';

import { Author } from '../Author';

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);
  const isCommentsSidebarOpen = useAppSelector(getIsCommentsSidebarOpen);

  if (!articleAuthor) return <></>;

  return (
    <>
      <Comments isOpen={isCommentsSidebarOpen} />
      <Author {...articleAuthor} className='mt-2' />
      <Divider className='my-2' />
    </>
  );
};
