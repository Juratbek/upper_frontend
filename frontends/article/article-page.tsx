import EditorJs, { OutputData } from '@editorjs/editorjs';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { useEffect, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './article.module.scss';

const CommentIcon = ICONS[ICON_TYPES.comment];

interface IArticleProps {
  articleData: OutputData;
}

let lastScrollTop = 0;
lastScrollTop = 9;

export const Article: React.FC<IArticleProps> = ({ articleData }: IArticleProps) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);
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
    <div className={styles.articleContainer}>
      <div id={EDITOR_HOLDER__READ}></div>
      <div className={styles.articleDetail}>
        <div></div>

        <div></div>
      </div>

      <div className={styles.articleActions}>
        <CommentIcon />
      </div>
    </div>
  );
};
