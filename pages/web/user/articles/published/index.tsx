import { Head } from 'components/lib';
import { TabsHeader } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { PublishedArticles } from 'frontends/user-articles';
import { useAppRouter } from 'hooks';
import { ITabHeader } from 'types';
import { checkAuthInServer } from 'utils';

const tabs = [
  { id: 'draft', name: 'Qoralama' },
  { id: 'published', name: 'Nashr qilingan' },
];

export default function ArticlesPage(): JSX.Element {
  const { push } = useAppRouter();

  const tabChangeHandler = (tab: ITabHeader): Promise<boolean> => push(`/user/articles/${tab.id}`);

  return (
    <GenericWrapper navigation={null}>
      <Head title='Arxiv' url='/published' />
      <TabsHeader tabs={tabs} activeTab='published' onChange={tabChangeHandler} />
      <PublishedArticles />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
