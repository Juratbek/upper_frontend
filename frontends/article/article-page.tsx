import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { useAppDispatch } from 'store';
import { useLikeDislikeMutation } from 'store/apis';
import { openLoginModal } from 'store/states';
import { formatToKMB, toDateString } from 'utils';
import { ICON_TYPES, ICONS } from 'variables/icons';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActions } from './components';

const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const NextIcon = ICONS[ICON_TYPES.next];
const PrevIcon = ICONS[ICON_TYPES.prev];
const SaveIcon = ICONS[ICON_TYPES.save];
const ShareIcon = ICONS[ICON_TYPES.share];

const toUzbDateString = (date: Date | string): string => toDateString(date, { month: 'short' });

export const Article: FC<IArticleProps> = (props) => {
  const {
    nextArticleId,
    prevArticleId,
    viewCount,
    publishedDate,
    updatedDate,
    blocks,
    id,
    likeCount,
  } = props;
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const { status: authStatus } = useSession();
  const dispatch = useAppDispatch();
  const [likeDislikeArticle] = useLikeDislikeMutation();
  const isAuthenticated = authStatus === 'authenticated';

  const react = (value: -1 | 1): void => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    likeDislikeArticle({ id, value });
  };

  return (
    <div className={styles.articleContainer}>
      <Editor content={{ blocks }} editable={false} handleInstance={setEditorInstance} />
      <div className={styles.articleDetail}>
        <div className='mb-1'>
          {publishedDate && <span>{toUzbDateString(publishedDate)} da chop etilgan</span>}
          {updatedDate && (
            <span className='ms-2'>{toUzbDateString(updatedDate)} da yangilangan</span>
          )}
        </div>
        <div className='d-flex justify-content-between'>
          <div className={styles.reactions}>
            {viewCount && <span>{formatToKMB(viewCount)} ko&apos;rilgan</span>}
            <div className={styles.reactionButtons}>
              <span className='pointer' onClick={(): void => react(1)}>
                <LikeIcon />
              </span>
              <span>{likeCount}</span>
              <span className='pointer' onClick={(): void => react(-1)}>
                <DislikeIcon />
              </span>
            </div>
          </div>

          <div className={styles.navigation}>
            {prevArticleId && (
              <>
                <div className={styles.navIcon}>
                  <PrevIcon />
                </div>
                <span>Oldingi</span>
              </>
            )}
            <ShareIcon />
            <span>Bo&apos;lishish</span>
            <SaveIcon />
            <span>Saqlash</span>
            {nextArticleId && (
              <>
                <span>Keyingi</span>
                <div className={styles.navIcon}>
                  <NextIcon />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ArticleActions editor={editorInstance} />
    </div>
  );
};
