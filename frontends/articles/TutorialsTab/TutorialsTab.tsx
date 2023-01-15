import {
  ApiErrorBoundary,
  ArticleSkeleton,
  Button,
  Divider,
  Pagination,
  Tutorial,
} from 'components';
import { useUrlParams } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import { useLazyGetAllTutorialsQuery } from 'store/apis';
import { TArticleStatus } from 'types';
import { ARTICLES_SKELETON_COUNT, PAGINATION_SIZE } from 'variables';

export const TutorialsTab: FC = () => {
  const [fetchTutorials, fetchTutorialsRes] = useLazyGetAllTutorialsQuery();
  const {
    query: { tab, page },
  } = useRouter();
  const { setParam } = useUrlParams();

  useEffect(() => {
    if (tab) {
      const p = (page as unknown as number) || 1;
      fetchTutorials({ statuses: [tab as TArticleStatus], page: p - 1 });
    }
  }, [tab, page]);

  const changePage = (page: number): void => {
    setParam('page', page);
  };

  const { data } = fetchTutorialsRes;

  return (
    <div>
      <ApiErrorBoundary
        res={fetchTutorialsRes}
        fallback={<ArticleSkeleton className='px-2 py-2' />}
        fallbackItemCount={ARTICLES_SKELETON_COUNT}
        className='tab'
      >
        {fetchTutorialsRes.data?.list.length === 0 && (
          <div className='text-center mt-3'>
            <h2>To&apos;plamlar mavjud emas</h2>
            <Link href='/tutorials/create'>
              <a>
                <Button color='outline-dark'>To&apos;plam yaratish</Button>
              </a>
            </Link>
          </div>
        )}
        {fetchTutorialsRes.data?.list.map((tutorial) => {
          return (
            <Fragment key={tutorial.id}>
              <Tutorial {...tutorial} className='my-1 pointer' />
              <Divider />
            </Fragment>
          );
        })}
      </ApiErrorBoundary>
      <div className='text-center'>
        {data && (
          <Pagination
            count={data.totalItemCount / PAGINATION_SIZE}
            className='my-3'
            onPageChange={changePage}
          />
        )}
      </div>
    </div>
  );
};
