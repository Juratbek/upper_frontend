import EditorJs, { OutputData } from '@editorjs/editorjs';
import {
  DislikeIcon,
  DotsIcon,
  LikeIcon,
  NextIcon,
  PrevIcon,
  SaveArticleIcon,
  ShareIcon,
} from 'assets';
import { ArticleActions } from 'components';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { useEffect, useRef, useState } from 'react';

import styles from './article.module.scss';

interface IArticleProps {
  articleData: OutputData;
}

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
          <SaveArticleIcon />
          <span>Saqlash</span>
          <span>Keyingi</span>
          <div className={styles.navIcon}>
            <NextIcon />
          </div>
          <DotsIcon />
        </div>
      </div>
      <ArticleActions containerRef={articleContainer} editor={editor} />
    </div>
  );
};
