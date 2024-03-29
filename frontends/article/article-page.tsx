import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components';
import { IQuizData } from 'components/Editor';
import { BackButton, Head } from 'components/lib';
import { CommentsModal } from 'components/organisms';
import { useModal } from 'hooks';
import { FC, useCallback, useEffect, useState } from 'react';
import { useIncrementViewCount } from 'store/clients/published-article';
import { IQuizSubmission, useSubmitQuiz } from 'store/clients/quiz';
import { IArticle, IResponseError } from 'types';
import { addAmazonBucketUriToArticle, addUriToImageBlocks, convertToHeadProp } from 'utils';

import { IArticlePageMainProps } from './article.types';
import classes from './article-page.module.scss';
import { Author, QuizResultModal } from './components';
import { ErrorUI } from './components/Error/Error';
import { ArticleFooter } from './components/Footer/ArticleFooter';

export const ArticlePageMain: FC<IArticlePageMainProps> = ({ article, error, fullUrl, title }) => {
  const { blocks = [] } = article ?? {};
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [isQuizResultsModalOpen, , { close: closeQuizResultsModal, open: openQuizResultsModal }] =
    useModal();
  const { mutate: incrementViewCountRequest } = useIncrementViewCount();
  const { mutate: submitQuiz, ...submitQuizRes } = useSubmitQuiz();

  const quizSubmitHandler = useCallback(
    async (data: IQuizData) => {
      if (!article) return;
      try {
        submitQuiz({ ...data, articleId: article?.id });
      } catch (e) {
      } finally {
        openQuizResultsModal();
      }
    },
    [article?.id],
  );

  useEffect(() => {
    editorInstance?.render?.({ blocks: addUriToImageBlocks(blocks) });
  }, [blocks]);

  useEffect(() => {
    if (!article) return;
    if (article.token) {
      const { id, token } = article;
      incrementViewCountRequest({ id, token });
    }
  }, [article?.id]);

  const quizData =
    submitQuizRes.data ??
    (submitQuizRes.error as IResponseError<IQuizSubmission[]>)?.data.data ??
    [];

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
      <QuizResultModal
        isError={Boolean(submitQuizRes.error)}
        quizData={quizData}
        isOpen={isQuizResultsModalOpen}
        close={closeQuizResultsModal}
      />
      <div className={classes['back-btn-container']}>
        <BackButton />
      </div>
      <Author {...article.author} />
      <div className='editor-container pb-2'>
        <article>
          <Editor
            content={{ blocks: addUriToImageBlocks(blocks) }}
            isEditable={false}
            handleInstance={setEditorInstance}
            onQuizSubmit={quizSubmitHandler}
          />
        </article>
        {editorInstance?.isReady && <ArticleFooter sharePopoverId='share-btn-in-article-page' />}
        <CommentsModal />
      </div>
    </>
  );
};
