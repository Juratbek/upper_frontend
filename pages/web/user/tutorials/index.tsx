import { Button, Head, TabBody, TabsHeader } from 'components';
import { USER_TUTORIALS_TAB_MENUS, USER_TUTORIALS_TABS } from 'frontends/user-tutorials';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useCreateTutorialMutation } from 'store/apis';
import { checkAuthInServer } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

export default function TutorialsPage(): JSX.Element {
  const router = useRouter();
  const [createTutorial, createTutorialRes] = useCreateTutorialMutation();

  const writeArticleHandler = useCallback(async () => {
    try {
      const res = await createTutorial().unwrap();
      router.push(`${WEB_APP_ROOT_DIR}/user/articles/${res.id}`);
    } catch (err) {
      alert('Maqola yaratishda xatolik yuz berdi');
    }
  }, []);

  return (
    <div className='container'>
      <Head title='Arxiv' url='/articles' />
      <div className='d-flex justify-content-between align-items-center'>
        <h1>To&apos;plamlaringiz</h1>
        <Button
          onClick={writeArticleHandler}
          loading={createTutorialRes.isLoading}
          color='outline-dark'
          loader='Maqola yaratilmoqda...'
        >
          To&apos;plam yaratish
        </Button>
      </div>
      <TabsHeader tabs={USER_TUTORIALS_TAB_MENUS} />
      <TabBody tabs={USER_TUTORIALS_TABS} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
