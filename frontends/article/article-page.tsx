import { Head } from 'components/lib';
import { Editor } from 'components/organisms';
import { CommentsModal } from 'components/organisms';
import { FC } from 'react';
import { useIncrementViewCount } from 'store/clients/published-article';
import { IArticle } from 'types';
import { addAmazonBucketUriToArticle, convertToHeadProp } from 'utils';
import { addBucketUrlToBlocks } from 'utils/published-article';

import { IArticlePageMainProps } from './article.types';
import { Author } from './components';
import { ErrorUI } from './components/Error/Error';
import { ArticleFooter } from './components/Footer/ArticleFooter';
import { Suggestions } from './components/Suggestions/Suggestions';

export const ArticlePageMain: FC<IArticlePageMainProps> = ({ article, error, fullUrl, title }) => {
  const { blocks = [], id } = article ?? {};
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
        <Editor key={id} content={{ blocks: addBucketUrlToBlocks(blocks) }} isEditable={false} />
      </article>
      <ArticleFooter sharePopoverId='share-btn-in-article-page' />
      {article.author && <Suggestions blogId={article.author.id} />}
      <CommentsModal />
    </>
  );
};
