import EditorJs, { OutputData } from '@editorjs/editorjs';
import { Actions, ArticleActions } from 'components';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { useEffect, useRef, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './article.module.scss';

interface IArticleProps {
  articleData: OutputData;
}

const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const NextIcon = ICONS[ICON_TYPES.next];
const PrevIcon = ICONS[ICON_TYPES.prev];
const SaveIcon = ICONS[ICON_TYPES.save];
const ShareIcon = ICONS[ICON_TYPES.share];

export const Article: React.FC<IArticleProps> = ({ articleData }: IArticleProps) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);
  const articleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (articleData) {
      createEditor({
        holder: EDITOR_HOLDER__READ,
        data: articleData,
        isReadOnly: true,
      }).then((res) => setEditor(res));
    }
  }, [articleData]);

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
        <div className={styles.reactions}>
          <span>20 k. ko&apos;rilgan</span>
          <div className={styles.reactionButtons}>
            <LikeIcon />
            <span>+14 k</span>
            <DislikeIcon />
          </div>
        </div>

        <div className={styles.navigation}>
          <div className={styles.navIcon}>
            <PrevIcon />
          </div>
          <span>Oldingi</span>
          <ShareIcon />
          <span>Bo&apos;lishish</span>
          <SaveIcon />
          <span>Saqlash</span>
          <span>Keyingi</span>
          <div className={styles.navIcon}>
            <NextIcon />
          </div>
          <Actions actions={[]} />
        </div>
      </div>
      <ArticleActions containerRef={articleContainer} editor={editor} />
    </div>
  );
};
