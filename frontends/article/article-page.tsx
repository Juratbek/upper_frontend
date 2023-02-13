import EditorJS from '@editorjs/editorjs';
import { Divider, Editor } from 'components';
import { useAuth, useTheme } from 'hooks';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { useLazyCheckIfLikedDislikedQuery, useLikeDislikeMutation } from 'store/apis';
import { openLoginModal, toggleCommentsSidebar } from 'store/states';
import { addUriToImageBlocks, toDateString } from 'utils';
import { UPPER_BLUE_COLOR } from 'variables';
import { ICONS } from 'variables/icons';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActions } from './components';

const LikeIcon = ICONS.like;
const DislikeIcon = ICONS.dislike;
const CommentIcon = ICONS.comment;

const toUzbDateString = (date: Date | string): string => toDateString(date, { month: 'short' });

export const Article: FC<IArticleProps> = (props) => {
  const { viewCount, publishedDate, updatedDate, blocks, id, likeCount, dislikeCount } = props;
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [likeDislikeCount, setLikeDislikeCount] = useState<number>(likeCount - dislikeCount);
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();
  const dispatch = useAppDispatch();
  const [likeDislikeArticle, likeDislikeRes] = useLikeDislikeMutation();
  const [checkIfLikedDislikedQuery, { data: isLikedOrDisliked }] =
    useLazyCheckIfLikedDislikedQuery();

  const likeDislike = (value: -1 | 1): void => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    if (likeDislikeRes.isLoading || value === isLikedOrDisliked) return;
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
    if (isAuthenticated) {
      checkIfLikedDislikedQuery(id);
      setLikeDislikeCount(likeCount - dislikeCount);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    editorInstance?.render({ blocks: addUriToImageBlocks(blocks) });
  }, [blocks]);

  const article = useMemo(
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

  return (
    <div className={`${styles.articleContainer} editor-container`}>
      <article>{article}</article>
      <Divider className='my-2' />
      <div className={styles.articleDetail}>
        <div className='d-flex'>
          {viewCount > 0 && (
            <>
              <span>{viewCount} marta ko&apos;rilgan</span>
              <Divider type='vertical' className='mx-1' />
            </>
          )}
          {dateContent}
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
              <DislikeIcon color={isLikedOrDisliked === -1 ? UPPER_BLUE_COLOR : themeColors.icon} />
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
  );
};
