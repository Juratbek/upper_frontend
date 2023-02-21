import { Button, Head, TabBody, TabsHeader } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useCreateTutorialMutation } from 'store/apis';
import { setTutorial } from 'store/states';
import { checkAuthInServer } from 'utils';
import { ARTICLES_TAB_MENUS, ARTICLES_TABS, TAB_IDS } from 'variables';

export default function ArticlesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [createTutorial] = useCreateTutorialMutation();
  const router = useRouter();
  const { query } = router;

  const createTutorialHandler = async (): Promise<void> => {
    const res = await createTutorial().unwrap();
    dispatch(setTutorial(res));
    router.push(`/user/tutorials/${res.id}`);
  };

  const button = useMemo(() => {
    const currentTab = query.tab as string;
    if (currentTab === TAB_IDS.articles) {
      return (
        <Link href='/write-article'>
          <Button color='outline-dark'>Maqola yozish</Button>
        </Link>
      );
    }
    if (currentTab === TAB_IDS.tutorials) {
      return (
        <Button color='outline-dark' onClick={createTutorialHandler}>
          To&apos;plam yaratish
        </Button>
      );
    }
  }, [query.tab]);

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
