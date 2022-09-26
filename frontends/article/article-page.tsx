import EditorJS from '@editorjs/editorjs';
import { Divider, Editor } from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { useLazyCheckIfLikedDislikedQuery, useLikeDislikeMutation } from 'store/apis';
import { openLoginModal } from 'store/states';
import { toDateString } from 'utils';
import { ICON_TYPES, ICONS } from 'variables/icons';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActions } from './components';

const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];

const toUzbDateString = (date: Date | string): string => toDateString(date, { month: 'short' });

export const Article: FC<IArticleProps> = (props) => {
  const { viewCount, publishedDate, updatedDate, blocks, id, likeCount, dislikeCount } = props;
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [likeDislikeCount, setLikeDislikeCount] = useState<number>(likeCount - dislikeCount);
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {
    isAuthenticated && checkIfLikedDislikedQuery(id);
  }, [isAuthenticated]);

  useEffect(() => {
    editorInstance?.render({ blocks });
  }, [blocks]);

  const article = useMemo(
    () => <Editor content={{ blocks }} isEditable={false} handleInstance={setEditorInstance} />,
    [blocks],
  );

  return (
    <div className={`${styles.articleContainer} editor-container`}>
      {article}
      <Divider className='my-2' />
      <div className={styles.articleDetail}>
        <div>
          {publishedDate && (
            <span className='me-2'>{toUzbDateString(publishedDate)} da chop etilgan</span>
          )}
          {updatedDate && <span>{toUzbDateString(updatedDate)} da yangilangan</span>}
        </div>
        <div className='d-flex justify-content-between'>
          <div className={styles.reactions}>
            {viewCount > 0 && <span className='me-1'>{viewCount} martta ko&apos;rilgan</span>}
            <div className={styles.reactionButtons}>
              <span
                className={`pointer icon ${isLikedOrDisliked === 1 && 'icon--active'}`}
                onClick={(): void => likeDislike(1)}
              >
                <LikeIcon />
              </span>
              <span className='mx-2'>{likeDislikeCount}</span>
              <span
                className={`pointer icon ${isLikedOrDisliked === -1 && 'icon--active'}`}
                onClick={(): void => likeDislike(-1)}
              >
                <DislikeIcon />
              </span>
            </div>
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
