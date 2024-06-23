import { Head } from 'components/lib';
import { Editor } from 'components/molecules';
import { CommentsModal } from 'components/organisms';
import { FC } from 'react';
import { useIncrementViewCount } from 'store/clients/published-article';
import { IArticle } from 'types';
import { addAmazonBucketUriToArticle, addUriToImageBlocks, convertToHeadProp } from 'utils';

import { IArticlePageMainProps } from './article.types';
import { Author } from './components';
import { ErrorUI } from './components/Error/Error';
import { ArticleFooter } from './components/Footer/ArticleFooter';

export const ArticlePageMain: FC<IArticlePageMainProps> = ({ article, error, fullUrl, title }) => {
  const { blocks = [] } = article ?? {};
  useIncrementViewCount(article);

  if (!article) {
    return <ErrorUI error={error} />;
  }

  return (
    <>
      <Head
        {...convertToHeadProp(addAmazonBucketUriToArticle<IArticle>(article))}
        title={title}
        url={fullUrl}
      />
      <Author {...article.author} />
      <article>
        <Editor content={{ blocks: addUriToImageBlocks(blocks) }} isEditable={false} />
      </article>
      <ArticleFooter sharePopoverId='share-btn-in-article-page' />
      <CommentsModal />
    </>
  );
};
