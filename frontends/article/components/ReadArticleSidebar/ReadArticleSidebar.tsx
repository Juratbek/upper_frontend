import { Divider } from 'components';
import { useAppSelector } from 'store';
import { getArticleAuthor } from 'store/states';
import { addAmazonUri } from 'utils';

import { Author } from '../Author';

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);

  if (!articleAuthor) return <></>;

  return (
    <>
      <Author {...addAmazonUri(articleAuthor)} className='mt-2' />
      <Divider className='my-2' />
    </>
  );
};
