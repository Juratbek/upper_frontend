import { Divider } from 'components';
import Link from 'next/link';
import { useAppSelector } from 'store';
import { getArticleAuthor } from 'store/states/readArticle';
import { addAmazonUri, appDynamic } from 'utils';
import { ICONS } from 'variables';

import { Author } from '../Author';

const DynamicComments = appDynamic(() => import('components/Comments'));
const HeartIcon = ICONS.heart;

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);

  if (!articleAuthor) return <></>;

  return (
    <>
      <DynamicComments />
      <Author {...addAmazonUri(articleAuthor)} className='mt-2' />
      {Boolean(articleAuthor.cardNumber) && (
        <Link href={`/blogs/${articleAuthor.id}/support`}>
          <a className='link d-flex mt-2'>
            <span className='sponsor-icon'>
              <HeartIcon />
            </span>
            <h4 className='m-0'>Blog faoliyatiga hissa qo&apos;shing</h4>
          </a>
        </Link>
      )}
      <Divider className='my-2' />
    </>
  );
};
