import EditorJs from '@editorjs/editorjs';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { FC, useEffect, useRef, useState } from 'react';
import { formatToKMB } from 'utils';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActions } from './article-actions';

const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const NextIcon = ICONS[ICON_TYPES.next];
const PrevIcon = ICONS[ICON_TYPES.prev];
const SaveIcon = ICONS[ICON_TYPES.save];
const ShareIcon = ICONS[ICON_TYPES.share];

export const Article: FC<IArticleProps> = (props) => {
  const { content, nextArticleId, prevArticleId, viewCount, publishedDate, updatedDate } = props;
  const [editor, setEditor] = useState<null | EditorJs>(null);
  const articleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content) {
      createEditor({
        holder: EDITOR_HOLDER__READ,
        data: content,
        isReadOnly: true,
      }).then((res) => setEditor(res));
    }
  }, [content]);

  // Caption cleanup
  useEffect(() => {
    editor?.isReady.then(() => {
      const captions = document.querySelectorAll('.embed-tool__caption');

      captions.forEach((caption) => {
        if (!caption.textContent) {
          caption.remove();
        }
      });
    });
  }, [editor]);

  return (
    <div className={styles.articleContainer} ref={articleContainer}>
      <div id={EDITOR_HOLDER__READ}></div>
      <div className={styles.articleDetail}>
        <div className='mb-1'>
          <span>{publishedDate} da chop etilgan</span>
          {updatedDate && <span className='ms-2'>{updatedDate} da yangilangan</span>}
        </div>
        <div className='d-flex justify-content-between'>
          <div className={styles.reactions}>
            {viewCount && <span>{formatToKMB(viewCount)} ko&apos;rilgan</span>}
            <div className={styles.reactionButtons}>
              <LikeIcon />
              <span>+14 k</span>
              <DislikeIcon />
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
      <ArticleActions containerRef={articleContainer} editor={editor} />
    </div>
  );
};
