import EditorJS from '@editorjs/editorjs';
import { Author, Divider, Editor } from 'components';
import { ApiError, Blog, Button, Head, StorysetImage } from 'components';
import { useAuth, useTheme } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import {
  useIncrementViewCountMutation,
  useLazyCheckIfLikedDislikedQuery,
  useLikeDislikeMutation,
} from 'store/apis';
import { openLoginModal, toggleCommentsSidebar } from 'store/states';
import { setArticleAuthor } from 'store/states/readArticle';
import { IArticle } from 'types';
import {
  addAmazonBucketUriToArticle,
  addAmazonUri,
  addUriToImageBlocks,
  convertToHeadProp,
  formatToKMB,
  get,
  toDateString,
} from 'utils';
import { ICONS, UPPER_BLUE_COLOR } from 'variables';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActions } from './components';

const LikeIcon = ICONS.like;
const DislikeIcon = ICONS.dislike;
const CommentIcon = ICONS.comment;
const HeartIcon = ICONS.heart;
const CalendarIcon = ICONS.calendar;
const EyeIcon = ICONS.eye;

const toUzbDateString = (date: Date | string): string => toDateString(date, { month: 'short' });

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
    id,
    likeCount = 0,
    dislikeCount = 0,
    author,
  } = article || {};
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [likeDislikeCount, setLikeDislikeCount] = useState<number>(likeCount - dislikeCount);
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();
  const dispatch = useAppDispatch();
  const [incrementViewCountRequest] = useIncrementViewCountMutation();
  const [likeDislikeArticle, likeDislikeRes] = useLikeDislikeMutation();
  const [checkIfLikedDislikedQuery, { data: isLikedOrDisliked }] =
    useLazyCheckIfLikedDislikedQuery();

  const likeDislike = (value: -1 | 1): void => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    if (likeDislikeRes.isLoading || value === isLikedOrDisliked || !id) return;
    likeDislikeArticle({ id, value }).then(() => {
      setLikeDislikeCount((prev) => prev + value - (isLikedOrDisliked || 0));
    });
  };

  const commentIconClickHandler = (): void => {
    dispatch(toggleCommentsSidebar());
  };

  useEffect(() => {
    if (editorInstance?.isReady) {
      const main = document.querySelector('#main');
      main?.scrollIntoView({ block: 'start' });
      main?.scrollTo(0, 0);
    }
  }, [editorInstance?.isReady]);

  useEffect(() => {
    if (isAuthenticated && id) {
      checkIfLikedDislikedQuery(id);
      setLikeDislikeCount(likeCount - dislikeCount);
    }
  }, [isAuthenticated, id]);

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
    if (updatedDate) return <span>{toUzbDateString(updatedDate)} da yangilangan</span>;
    if (publishedDate) return <span>{toUzbDateString(publishedDate)}</span>;
    return <></>;
  }, [publishedDate, updatedDate]);

  const likeIcon = useMemo((): JSX.Element => {
    if (isLikedOrDisliked === 0) {
      return (
        <div style={{ transform: 'rotate(180deg)', display: 'flex' }}>
          <Image width={30} height={30} src='/icons/dislike.webp' />
        </div>
      );
    }
    return <LikeIcon color={isLikedOrDisliked === 1 ? UPPER_BLUE_COLOR : themeColors.icon} />;
  }, [isLikedOrDisliked, themeColors]);

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

  const renderDate = (): JSX.Element | string => {
    if (updatedDate) return <>{toDateString(updatedDate)} yangilangan</>;
    if (publishedDate) return toDateString(publishedDate);
    return <></>;
  };

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
              {renderDate()}
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
            <div className={styles.reactionButtons}>
              <span
                data-action='open-comments'
                className='pointer me-2'
                onClick={commentIconClickHandler}
              >
                <CommentIcon color={themeColors.icon} />
              </span>
              <span
                className={`pointer icon me-2 ${isLikedOrDisliked === 1 && 'icon--active'}`}
                onClick={(): void => likeDislike(1)}
              >
                {likeIcon}
              </span>
              {Boolean(likeDislikeCount) && <span className='me-2'>{likeDislikeCount}</span>}
              <span
                className={`pointer icon ${isLikedOrDisliked === -1 && 'icon--active'}`}
                onClick={(): void => likeDislike(-1)}
              >
                <DislikeIcon
                  color={isLikedOrDisliked === -1 ? UPPER_BLUE_COLOR : themeColors.icon}
                />
              </span>
            </div>
          </div>
        </div>
        <ArticleActions
          editor={editorInstance}
          likeDislike={likeDislike}
          isLikedOrDisliked={isLikedOrDisliked}
          likeDislikeCount={likeDislikeCount}
        />
      </div>
    </div>
  );
};
