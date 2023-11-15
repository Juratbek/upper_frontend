import { Head } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { PublishedArticles, UserArticlesNavigation } from 'frontends/user-articles';
import { checkAuthInServer } from 'utils';

export default function ArticlesPage(): JSX.Element {
  return (
    <GenericWrapper navigation={<UserArticlesNavigation />}>
      <Head title='Arxiv' url='/articles' />
      <PublishedArticles />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
