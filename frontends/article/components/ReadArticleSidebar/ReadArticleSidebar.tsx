import { ApiErrorBoundary, Divider, SidebarTutorial } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from 'store';
import { useLazyGetPublishedTutorialsByArticleIdQuery } from 'store/apis';
import { getArticleAuthor } from 'store/states';
import { addAmazonUri } from 'utils';
import { addTutorialAmazonUri } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import { Author } from '../Author';

const HeartIcon = ICONS.heart;

export const ReadArticleSidebar = (): JSX.Element => {
  const articleAuthor = useAppSelector(getArticleAuthor);
  const {
    query: { id },
  } = useRouter();
  const [fetchPublishedTutorials, fetchPublishedTutorialsRes] =
    useLazyGetPublishedTutorialsByArticleIdQuery();
  const { data: tutorials = [] } = fetchPublishedTutorialsRes;

  // useEffect(() => {
  //   id && fetchPublishedTutorials(+id);
  // }, [id]);

  if (!articleAuthor) return <></>;

  return (
    <>
      <Author {...addAmazonUri(articleAuthor)} className='mt-2' />
      {Boolean(articleAuthor.cardNumber) && (
        <Link href={`${WEB_APP_ROOT_DIR}/blogs/${articleAuthor.id}/support`}>
          <a className='link d-flex mt-2'>
            <span className='sponsor-icon'>
              <HeartIcon />
            </span>
            <h4 className='m-0'>Blog faoliyatiga hissa qo&apos;shing</h4>
          </a>
        </Link>
      )}
      <Divider className='my-2' />
      <ApiErrorBoundary res={fetchPublishedTutorialsRes} className='mb-2'>
        {tutorials?.length > 0 && <h3 className='mb-1'>To&apos;plamlar</h3>}
        {tutorials?.map((tutorial, index) => (
          <div key={tutorial.id}>
            <SidebarTutorial {...addTutorialAmazonUri(tutorial)} />
            {index + 1 !== tutorials.length && <Divider className='my-1' />}
          </div>
        ))}
      </ApiErrorBoundary>
    </>
  );
};
