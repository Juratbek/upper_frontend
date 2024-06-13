import { ApiErrorBoundary } from 'components';
import { PublishedArticle } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { useRouter } from 'next/router';
import { useArticleById } from 'store/clients/article';

export default function PublishArticlePage() {
  const { query } = useRouter();
  const id = +(query?.id as string);

  const articleByIdRes = useArticleById(id, { enabled: Boolean(id) });

  return (
    <GenericWrapper areNavigationAndSidebarEqual isSidebarHidden isNavigationHidden>
      <h2 className='mt-0'>Maqolangiz asosiy sahifada quidagicha ko&apos;rinishda bo&apos;ladi</h2>
      <ApiErrorBoundary res={articleByIdRes}>
        <PublishedArticle article={articleByIdRes.data!} />
      </ApiErrorBoundary>
    </GenericWrapper>
  );
}
