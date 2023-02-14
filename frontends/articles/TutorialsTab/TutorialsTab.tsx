import {
  ApiErrorBoundary,
  ArticleSkeleton,
  Button,
  Divider,
  Pagination,
  StorysetImage,
  Tutorial,
} from 'components';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect } from 'react';
import { useAppDispatch } from 'store';
import { useCreateTutorialMutation, useLazyGetAllTutorialsQuery } from 'store/apis';
import { setTutorial } from 'store/states';
import { TArticleStatus } from 'types';
import { ARTICLES_SKELETON_COUNT, PAGINATION_SIZE } from 'variables';

export const TutorialsTab: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createTutorial] = useCreateTutorialMutation();
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

  const createTutorialHandler = async (): Promise<void> => {
    const res = await createTutorial().unwrap();
    dispatch(setTutorial(res));
    router.push(`/user/tutorials/${res.id}`);
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
          <div className='text-center'>
            <StorysetImage
              width={400}
              height={400}
              src='/storyset/write_article.svg'
              storysetUri='creativity'
            />
            <p>Maqola to&apos;plamlarini yarating va bilimlaringizni ulashing</p>
            <Button color='outline-dark' onClick={createTutorialHandler}>
              To&apos;plam yaratish
            </Button>
          </div>
        )}
        {fetchTutorialsRes.data?.list.map((tutorial) => {
          return (
            <Fragment key={tutorial.id}>
              <Divider />
              <Tutorial {...tutorial} className='my-1 pointer' />
            </Fragment>
          );
        })}
        {data && <Divider />}
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
