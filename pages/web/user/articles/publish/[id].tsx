import { Button, Divider } from 'components/lib';
import { ApiErrorBoundary, LabelsSelector, PublishedArticle } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { useAppRouter } from 'hooks';
import { useState } from 'react';
import { usePreviewArticle, usePublish } from 'store/clients/article';
import { IArticle } from 'types';
import { addAmazonBucketUrl } from 'utils/published-article';

export default function PublishArticlePage() {
  const { query } = useAppRouter();
  const id = +(query?.id as string);
  const articleByIdRes = usePreviewArticle(id);
  const article = articleByIdRes.data;

  return (
    <GenericWrapper areNavigationAndSidebarEqual isSidebarHidden isNavigationHidden>
      <h2 className='mt-0'>Maqolangiz asosiy sahifada quidagicha ko&apos;rinishda bo&apos;ladi</h2>
      <ApiErrorBoundary res={articleByIdRes}>
        {article && (
          <>
            <PublishedArticle preview article={addAmazonBucketUrl(article)} />
            <Divider />
            <Suggestions article={article} />
            <Publish article={article} />
          </>
        )}
      </ApiErrorBoundary>
    </GenericWrapper>
  );
}

const Suggestions = ({ article }: { article: IArticle }) => {
  if (!article.imgUrl) return <h3>Maqolangizga rasm qo&apos;shishingizni tavsiya qilamiz</h3>;

  return null;
};

const Publish = ({ article }: { article: IArticle }) => {
  const { push } = useAppRouter();
  const [selectedLabels, setSelectedLabels] = useState<string[]>(article.tags ?? []);
  const { mutate: publish, isPending: isBeingPublished } = usePublish(article.id, {
    onSuccess: ({ publishedArticleId }) =>
      push(`/user/articles/publish/success?published-article-id=${publishedArticleId}`),
  });

  const publishHandler = () => publish({ tags: selectedLabels });

  return (
    <>
      <h2>Maqolangiz uchun teglarni tanlang</h2>
      <LabelsSelector
        max={5}
        defaultValues={article.tags}
        onChange={setSelectedLabels}
        inputPlaceholder='Qidirish uchun yozing'
      />
      {selectedLabels.length > 0 && (
        <Button className='w-100 mt-2' onClick={publishHandler} loading={isBeingPublished}>
          Nashr uchun tasdiqlash
        </Button>
      )}
    </>
  );
};
