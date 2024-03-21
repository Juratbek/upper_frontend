import { Head } from 'components/lib';
import { TabsHeader } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { DraftArticles } from 'frontends/user-articles';
import { useAppRouter } from 'hooks';
import { ITabHeader } from 'types';
import { checkAuthInServer } from 'utils';

const tabs = [
  { id: 'draft', name: 'Qoralama' },
  { id: 'published', name: 'Nashr qilingan' },
];

export default function DraftArticlesPage(): JSX.Element {
  const { push } = useAppRouter();

  const tabChangeHandler = (tab: ITabHeader): Promise<boolean> => push(`/user/articles/${tab.id}`);

  return (
    <GenericWrapper classes={{ main: 'pt-l-2 pt-m-1' }} desktopNavigation={null}>
      <Head title='Arxiv' url='/draft' />
      <TabsHeader tabs={tabs} activeTab='draft' onChange={tabChangeHandler} />
      <DraftArticles />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
