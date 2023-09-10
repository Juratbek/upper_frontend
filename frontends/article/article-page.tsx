import EditorJS from '@editorjs/editorjs';
import { ApiError, Blog, Button, Divider, Head, StorysetImage } from 'components';
import { IQuizData } from 'components/Editor';
import Blocks, { RenderFn } from 'editorjs-blocks-react-renderer';
import { ImageBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/image';
import { useModal, useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { IQuizSubmission, useIncrementViewCountMutation, useSubmitQuizMutation } from 'store/apis';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle, IResponseError } from 'types';
import {
  addAmazonBucketUriToArticle,
  addAmazonUri,
  addUriToImageBlocks,
  convertToHeadProp,
  dateInterval,
  formatToKMB,
  get,
} from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActionIcons, ArticleActions, QuizResultModal } from './components';

const HeartIcon = ICONS.heart;
const CalendarIcon = ICONS.calendar;
const EyeIcon = ICONS.eye;

export const Article: FC<IArticleProps> = ({
  article,
  error,
  fullUrl,
  showAuthor = false,
  ...props
}) => {
  const { viewCount = 0, publishedDate, updatedDate, blocks = [] } = article || {};
  const [likeCount, setLikeCount] = useState(article?.likeCount || 0);
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState<boolean>(false);
  const [isQuizResultsModalOpen, , { close: closeQuizResultsModal, open: openQuizResultsModal }] =
    useModal();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [incrementViewCountRequest] = useIncrementViewCountMutation();
  const [submitQuiz, submitQuizRes] = useSubmitQuizMutation();

  const likeHandler = (): void => {
    setLikeCount((prev) => prev + 1);
  };

  const dislikeHandler = (wasLikedBefore: boolean): void => {
    wasLikedBefore && setLikeCount((prev) => prev - 1);
  };

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
    setLikeCount(article.likeCount || 0);
    article.author && dispatch(setArticleAuthor(article.author));
    // const timeout = setTimeout(() => {
    //   if (article.token) {
    //     const { id, token } = article;
    //     incrementViewCountRequest({ id, token });
    //   }
    // }, 15 * 1000);
    // return () => clearTimeout(timeout);
    if (article.token) {
      const { id, token } = article;
      incrementViewCountRequest({ id, token });
    }
  }, [article?.id]);

  // const articleComponent = useMemo(
  //   () => (
  //     <Editor
  //       content={{ blocks: addUriToImageBlocks(blocks) }}
  //       isEditable={false}
  //       handleInstance={setEditorInstance}
  //       onQuizSubmit={quizSubmitHandler}
  //     />
  //   ),
  //   [blocks, quizSubmitHandler],
  // );

  const imageRenderer: RenderFn<ImageBlockData> = ({
    data,
    className,
    actionsClassNames,
    captionClass,
  }) => {
    return (
      <div className={className}>
        <div
          className={[
            data.stretched && actionsClassNames.stretched,
            data.withBorder && actionsClassNames.withBorder,
            data.withBackground && actionsClassNames.withBackground,
          ].join(' ')}
        >
          <img src={data.url || data.file?.url} />
        </div>
        {data.caption && <div className={captionClass}>{data.caption}</div>}
      </div>
    );
  };

  const alertRenderer: RenderFn<{ type: string; message: string }> = ({
    data,
    className,
    alertMessageClassName,
  }) => {
    return (
      <div className={`${className} ${className}-${data.type}`}>
        <div className={alertMessageClassName}>{data.message}</div>
      </div>
    );
  };

  const quoteRenderer: RenderFn<{ caption: string; text: string }> = ({
    data,
    className,
    quoteTextClassname,
    quoteCaptionClassname,
  }) => {
    return (
      <blockquote className={className}>
        <div className={quoteTextClassname}>{data.text}</div>
        <div className={quoteCaptionClassname}>{data.caption}</div>
      </blockquote>
    );
  };

  const delimiterRenderer: RenderFn = ({ className }) => {
    return <div className={className}></div>;
  };

  const articleComponent = useMemo(() => {
    console.log(blocks);
    return (
      <Blocks
        data={{ blocks: addUriToImageBlocks(blocks), time: 0, version: '2.27.2' }}
        renderers={{
          unsplash: imageRenderer,
          image: imageRenderer,
          alert: alertRenderer,
          quote: quoteRenderer,
          delimiter: delimiterRenderer,
        }}
        config={{
          unsplash: {
            className: 'inline-image',
            actionsClassNames: {
              stretched: 'inline-image__picture--stretched',
              withBorder: 'inline-image__picture--withBorder',
              withBackground: 'inline-image__picture--withBackground',
            },
            captionClass: 'inline-image__caption cdx-input',
          },
          image: {
            className: 'inline-image',
            actionsClassNames: {
              stretched: 'inline-image__picture--stretched',
              withBorder: 'inline-image__picture--withBorder',
              withBackground: 'inline-image__picture--withBackground',
            },
            captionClass: 'inline-image__caption cdx-input',
          },
          alert: {
            className: 'cdx-alert',
            alertMessageClassName: 'cdx-alert__message',
          },
          quote: {
            className: 'cdx-quote',
            quoteTextClassname: 'cdx-input cdx-quote__text',
            quoteCaptionClassname: 'cdx-input cdx-quote__caption',
          },
          delimiter: {
            className: 'ce-delimiter',
          },
        }}
      />
    );
  }, [blocks, quizSubmitHandler]);

  const dateContent = useMemo(() => {
    if (updatedDate) return <>{dateInterval(updatedDate)} yangilangan</>;
    if (publishedDate) return dateInterval(publishedDate);
    return <></>;
  }, [publishedDate, updatedDate]);

  const quizData =
    submitQuizRes.data ||
    (submitQuizRes.error as IResponseError<IQuizSubmission[]>)?.data.data ||
    [];

  if (!article) {
    if (error?.status === 500) return <ApiError className='container mt-2' error={error} />;
    if (error?.status === 404)
      return (
        <div className='text-center mt-3'>
          <StorysetImage width={400} height={400} src='/storyset/hidden.svg' storysetUri='data' />
          <h3>Maqola topilmadi</h3>
          <p className='text-gray'>Maqola o&apos;chirilgan yoki bloklangan bo&apos;lishi mumkin</p>
          <Link href={WEB_APP_ROOT_DIR}>
            <Button>Bosh sahifaga qaytish</Button>
          </Link>
        </div>
      );
    return <h2>{get(error, 'data.message')}</h2>;
  }

  return (
    <div className={`container ${props.className} editor-readonly`}>
      <Head {...convertToHeadProp(addAmazonBucketUriToArticle<IArticle>(article))} url={fullUrl} />
      <QuizResultModal
        isError={Boolean(submitQuizRes.error)}
        quizData={quizData}
        isOpen={isQuizResultsModalOpen}
        close={closeQuizResultsModal}
      />
      {showAuthor && article.author && (
        <>
          <Blog {...addAmazonUri(article.author)} isLink />
          {/* {Boolean(article.author.cardNumber) && (
            <>
              <div style={{ height: '1rem' }} />
              <Link href={`${WEB_APP_ROOT_DIR}/blogs/${article.author.id}/support`}>
                <a className='link'>
                  <Button className='w-100'>
                    <span className='sponsor-icon'>
                      <HeartIcon />
                    </span>
                    Blog faoliyatiga hissa qo&apos;shing
                  </Button>
                </a>
              </Link>
            </>
          )} */}
          <Divider className='mt-1' />
        </>
      )}
      <div className={`${styles.articleContainer} editor-container`}>
        <article className={`theme-${theme}`}>{articleComponent}</article>
        <Divider className='my-2' />
        <div className={styles.articleDetail}>
          <div className={styles.stats}>
            <time style={{ flex: 1 }} className='d-flex align-items-center'>
              <span className={styles.icon}>
                <CalendarIcon color='gray' />
              </span>
              {dateContent}
            </time>
            {viewCount > 0 && (
              <>
                <Divider type='vertical' className='mx-1' />
                <div className='d-flex align-items-center'>
                  <span className={`${styles.icon} ${styles.eye}`}>
                    <EyeIcon color='gray' />
                  </span>
                  <span className='d-flex align-items-center'>
                    {formatToKMB(viewCount)} marta o&apos;qilgan
                  </span>
                </div>
              </>
            )}
          </div>
          <div className={styles.reactions}>
            <ArticleActionIcons
              className={styles.sharePopup}
              onLike={likeHandler}
              onDislike={dislikeHandler}
              popupId='articleDetail'
              isSharePopupOpen={isSharePopupOpen}
              setIsSharePopupOpen={setIsSharePopupOpen}
              article={{ ...article, likeCount }}
            />
          </div>
        </div>
        <ArticleActions
          onLike={likeHandler}
          onDislike={dislikeHandler}
          editor={editorInstance}
          article={{ ...article, likeCount }}
        />
      </div>
    </div>
  );
};
