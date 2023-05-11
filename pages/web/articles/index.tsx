import { Button, Head, TabBody, TabsHeader } from 'components';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useCreateArticleMutation, useCreateTutorialMutation } from 'store/apis';
import { setTutorial } from 'store/states';
import { checkAuthInServer } from 'utils';
import { ARTICLES_TAB_MENUS, ARTICLES_TABS, TAB_IDS, WEB_APP_ROOT_DIR } from 'variables';

export default function ArticlesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [createTutorial] = useCreateTutorialMutation();
  const router = useRouter();
  const { query } = router;
  const [createArticle, createArticleRes] = useCreateArticleMutation();

  const createTutorialHandler = async (): Promise<void> => {
    const res = await createTutorial().unwrap();
    dispatch(setTutorial(res));
    router.push(`/user/tutorials/${res.id}`);
  };

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      router.push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

  const button = useMemo(() => {
    const currentTab = query.tab as string;
    if (currentTab === TAB_IDS.articles) {
      return (
        <Button
          onClick={writeArticleHandler}
          loading={createArticleRes.isLoading}
          color='outline-dark'
        >
          Maqola yozish
        </Button>
      );
    }
    if (currentTab === TAB_IDS.tutorials) {
      return (
        <Button color='outline-dark' onClick={createTutorialHandler}>
          To&apos;plam yaratish
        </Button>
      );
    }
  }, [query.tab, createArticleRes.isLoading]);

  return (
    <div className='container'>
      <Head title='Arxiv' url='/articles' />
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Arxiv</h1>
        {button}
      </div>
      <TabsHeader tabs={ARTICLES_TAB_MENUS} />
      <TabBody tabs={ARTICLES_TABS} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
