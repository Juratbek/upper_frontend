import { BackButton, Head } from 'components/lib';
import { Editor } from 'components/molecules';
import { CommentsModal } from 'components/organisms';
import { FC, useEffect } from 'react';
import { useIncrementViewCount } from 'store/clients/published-article';
import { IArticle } from 'types';
import { addAmazonBucketUriToArticle, addUriToImageBlocks, convertToHeadProp } from 'utils';

import { IArticlePageMainProps } from './article.types';
import classes from './article-page.module.scss';
import { Author } from './components';
import { ErrorUI } from './components/Error/Error';
import { ArticleFooter } from './components/Footer/ArticleFooter';

export const ArticlePageMain: FC<IArticlePageMainProps> = ({ article, error, fullUrl, title }) => {
  const { blocks = [] } = article ?? {};
  const { mutate: incrementViewCountRequest } = useIncrementViewCount();

  useEffect(() => {
    if (!article) return;
    if (article.token) {
      const { id, token } = article;
      incrementViewCountRequest({ id, token });
    }
  }, [article?.id]);

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
      <div className={classes['back-btn-container']}>
        <BackButton />
      </div>
      <Author {...article.author} />
      <div className='editor-container pb-2'>
        <article>
          <Editor content={{ blocks: addUriToImageBlocks(blocks) }} isEditable={false} />
        </article>
        <ArticleFooter sharePopoverId='share-btn-in-article-page' />
        <CommentsModal />
      </div>
    </>
  );
};
