import { Head, TabBody, TabsHeader } from 'components';
import { GenericWrapper } from 'components/wrappers';
import { ARTICLES_TAB_MENUS, ARTICLES_TABS } from 'frontends/user-articles';
import { checkAuthInServer } from 'utils';

export default function ArticlesPage(): JSX.Element {
  return (
    <GenericWrapper>
      <Head title='Arxiv' url='/articles' />
      <TabsHeader tabs={ARTICLES_TAB_MENUS} />
      <TabBody tabs={ARTICLES_TABS} />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
