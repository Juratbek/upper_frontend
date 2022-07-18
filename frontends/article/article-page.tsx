import EditorJs, { OutputData } from '@editorjs/editorjs';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { useEffect, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import { DislikeIcon, ShareIcon } from '../../assets';
import styles from './article.module.scss';

const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const dislike = ICONS[ICON_TYPES.dislike];
const share = ICONS[ICON_TYPES.share];

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
        <LikeIcon />
        +14k
        <DislikeIcon />
        <ShareIcon />
      </div>
    </div>
  );
};
