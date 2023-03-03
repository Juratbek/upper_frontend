import EditorJS from '@editorjs/editorjs';
import { ApiError, Blog, Button, Divider, Editor, Head, StorysetImage } from 'components';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { useIncrementViewCountMutation } from 'store/apis';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle } from 'types';
import {
  addAmazonBucketUriToArticle,
  addAmazonUri,
  addUriToImageBlocks,
  convertToHeadProp,
  dateInterval,
  formatToKMB,
  get,
} from 'utils';
import { ICONS } from 'variables';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActionIcons, ArticleActions } from './components';

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
  const {
    viewCount = 0,
    publishedDate,
    updatedDate,
    blocks = [],
    likeCount = 0,
    dislikeCount = 0,
  } = article || {};
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState<boolean>(false);
  const [likeDislikeCount, setLikeDislikeCount] = useState<number>(likeCount);
  const dispatch = useAppDispatch();
  const [incrementViewCountRequest] = useIncrementViewCountMutation();

  useEffect(() => {
    if (editorInstance?.isReady) {
      const main = document.querySelector('#main');
      main?.scrollIntoView({ block: 'start' });
      main?.scrollTo(0, 0);
    }
  }, [editorInstance?.isReady]);

  useEffect(() => {
    editorInstance?.render?.({ blocks: addUriToImageBlocks(blocks) });
  }, [blocks]);

  useEffect(() => {
    if (!article) return;
    article.author && dispatch(setArticleAuthor(article.author));
    const timeout = setTimeout(() => {
      if (article.token) {
        const { id, token } = article;
        incrementViewCountRequest({ id, token });
      }
    }, 15 * 1000);
    return () => clearTimeout(timeout);
  }, [article?.id]);

  const articleComponent = useMemo(
    () => (
      <Editor
        content={{ blocks: addUriToImageBlocks(blocks) }}
        isEditable={false}
        handleInstance={setEditorInstance}
      />
    ),
    [blocks],
  );

  const dateContent = useMemo(() => {
    if (updatedDate) return <>{dateInterval(updatedDate)} yangilangan</>;
    if (publishedDate) return dateInterval(publishedDate);
    return <></>;
  }, [publishedDate, updatedDate]);

  if (!article) {
    if (error?.status === 500) return <ApiError className='container mt-2' error={error} />;
    if (error?.status === 404)
      return (
        <div className='text-center mt-3'>
          <StorysetImage width={400} height={400} src='/storyset/hidden.svg' storysetUri='data' />
          <h3>Maqola topilmadi</h3>
          <p className='text-gray'>Maqola o&apos;chirilgan yoki bloklangan bo&apos;lishi mumkin</p>
          <Link href='/'>
            <Button>Bosh sahifaga qaytish</Button>
          </Link>
        </div>
      );
    return <h2>{get(error, 'data.message')}</h2>;
  }

  return (
    <div className={`container ${props.className}`}>
      <Head {...convertToHeadProp(addAmazonBucketUriToArticle<IArticle>(article))} url={fullUrl} />
      {showAuthor && article.author && (
        <>
          <Blog {...addAmazonUri(article.author)} isLink />
          {Boolean(article.author.cardNumber) && (
            <>
              <div style={{ height: '1rem' }} />
              <Link href={`/blogs/${article.author.id}/support`}>
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
          )}
          <Divider className='mt-1' />
        </>
      )}
      <div className={`${styles.articleContainer} editor-container`}>
        <article>{articleComponent}</article>
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
              right={0}
              popupId='articleDetail'
              isSharePopupOpen={isSharePopupOpen}
              setIsSharePopupOpen={setIsSharePopupOpen}
              article={article}
              setLikeDislikeCount={setLikeDislikeCount}
              likeDislikeCount={likeDislikeCount}
            />
          </div>
        </div>
        <ArticleActions
          editor={editorInstance}
          article={article}
          setLikeDislikeCount={setLikeDislikeCount}
          likeDislikeCount={likeDislikeCount}
        />
      </div>
    </div>
  );
};
