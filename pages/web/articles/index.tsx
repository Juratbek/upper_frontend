import { Button, Head, TabBody, TabsHeader } from 'components';
import { ARTICLES_TAB_MENUS, ARTICLES_TABS } from 'frontends/articles';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useCreateArticleMutation } from 'store/apis';
import { checkAuthInServer } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

export default function ArticlesPage(): JSX.Element {
  const router = useRouter();
  const [createArticle, createArticleRes] = useCreateArticleMutation();

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      router.push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

  return (
    <div className='container'>
      <Head title='Arxiv' url='/articles' />
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Maqolalaringiz</h1>
        <Button
          onClick={writeArticleHandler}
          loading={createArticleRes.isLoading}
          color='outline-dark'
          loader='Maqola yaratilmoqda...'
        >
          Maqola yozish
        </Button>
      </div>
      <TabsHeader tabs={ARTICLES_TAB_MENUS} />
      <TabBody tabs={ARTICLES_TABS} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
