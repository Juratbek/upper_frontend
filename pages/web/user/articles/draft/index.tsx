import { Head } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { UserArticlesNavigation } from 'frontends/user-articles';
import { DraftArticles } from 'frontends/user-articles';
import { checkAuthInServer } from 'utils';

export default function DraftArticlesPage(): JSX.Element {
  return (
    <GenericWrapper navigation={<UserArticlesNavigation />}>
      <Head title='Arxiv' url='/articles' />
      <DraftArticles />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
