import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components';
import { IQuizData } from 'components/Editor';
import { Head } from 'components/lib';
import { useModal } from 'hooks';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { useIncrementViewCount } from 'store/clients/published-article';
import { IQuizSubmission, useSubmitQuiz } from 'store/clients/quiz';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle, IResponseError } from 'types';
import {
  addAmazonBucketUriToArticle,
  addAmazonUri,
  addUriToImageBlocks,
  convertToHeadProp,
} from 'utils';

import { IArticlePageMainProps } from './article.types';
import { ArticleActions, Author, QuizResultModal } from './components';
import { ErrorUI } from './components/Error/Error';
import { ArticleFooter } from './components/Footer/ArticleFooter';

export const ArticlePageMain: FC<IArticlePageMainProps> = ({ article, error, fullUrl }) => {
  const { blocks = [] } = article || {};
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [isQuizResultsModalOpen, , { close: closeQuizResultsModal, open: openQuizResultsModal }] =
    useModal();
  const dispatch = useAppDispatch();
  const { mutate: incrementViewCountRequest } = useIncrementViewCount();
  const { mutate: submitQuiz, ...submitQuizRes } = useSubmitQuiz();

  const quizSubmitHandler = useCallback(
    async (data: IQuizData) => {
      if (!article) return;
      try {
        await submitQuiz({ ...data, articleId: article?.id });
      } catch (e) {
      } finally {
        openQuizResultsModal();
      }
    },
    [article?.id],
  );

  // when selecting articles from sidebar, scroll position is reset
  useEffect(() => {
    const main = document.querySelector('#main');
    main?.scrollTo(0, 0);
  }, [article]);

  useEffect(() => {
    editorInstance?.render?.({ blocks: addUriToImageBlocks(blocks) });
  }, [blocks]);

  useEffect(() => {
    if (!article) return;
    article.author && dispatch(setArticleAuthor(article.author));
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
    <div className='container'>
      <Head {...convertToHeadProp(addAmazonBucketUriToArticle<IArticle>(article))} url={fullUrl} />
      <QuizResultModal
        isError={Boolean(submitQuizRes.error)}
        quizData={quizData}
        isOpen={isQuizResultsModalOpen}
        close={closeQuizResultsModal}
      />
      <Author {...addAmazonUri(article.author)} />
      <div className='editor-container'>
        <article>
          <Editor
            content={{ blocks: addUriToImageBlocks(blocks) }}
            isEditable={false}
            handleInstance={setEditorInstance}
            onQuizSubmit={quizSubmitHandler}
          />
        </article>
        <ArticleFooter article={article} />
        <ArticleActions editor={editorInstance} article={article} />
      </div>
    </div>
  );
};
