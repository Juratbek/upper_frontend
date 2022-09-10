import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { formatToKMB } from 'utils';
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

export const Article: FC<IArticleProps> = (props) => {
  const { content, nextArticleId, prevArticleId, viewCount, publishedDate, updatedDate } = props;
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const { status: authStatus } = useSession();
  const isAuthenticated = authStatus === 'authenticated';

  const doLike = (): void => {
    // isAuthenticated ?
  };

  const doDislike = (): void => {
    //
  };

  return (
    <div className={styles.articleContainer}>
      <Editor content={content} editable={false} handleInstance={setEditorInstance} />
      <div className={styles.articleDetail}>
        <div className='mb-1'>
          <span>{publishedDate} da chop etilgan</span>
          {updatedDate && <span className='ms-2'>{updatedDate} da yangilangan</span>}
        </div>
        <div className='d-flex justify-content-between'>
          <div className={styles.reactions}>
            {viewCount && <span>{formatToKMB(viewCount)} ko&apos;rilgan</span>}
            <div className={styles.reactionButtons}>
              <span onClick={doLike}>
                <LikeIcon />
              </span>
              <span>+14 k</span>
              <span onClick={doDislike}>
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
