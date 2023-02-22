import EditorJS from '@editorjs/editorjs';
import { Divider, Editor } from 'components';
import { FC, useEffect, useMemo, useState } from 'react';
import { addUriToImageBlocks, toDateString } from 'utils';

import styles from './article.module.scss';
import { IArticleProps } from './article.types';
import { ArticleActionIcons, ArticleActions } from './components';

const toUzbDateString = (date: Date | string): string => toDateString(date, { month: 'short' });

export const Article: FC<IArticleProps> = (article) => {
  const {
    viewCount = 0,
    publishedDate,
    updatedDate,
    blocks = [],
    likeCount = 0,
    dislikeCount = 0,
  } = article || {};
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState<boolean>(false);
  const [likeDislikeCount, setLikeDislikeCount] = useState<number>(likeCount - dislikeCount);

  useEffect(() => {
    if (editorInstance?.isReady) {
      const main = document.querySelector('#main');
      main?.scrollIntoView({ block: 'start' });
      main?.scrollTo(0, 0);
    }
  }, [editorInstance?.isReady]);

  useEffect(() => {
    editorInstance?.render?.({ blocks: addUriToImageBlocks(blocks) });
  }, [blocks]);

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

  return (
    <div className={`${styles.articleContainer} editor-container`}>
      <article>{articleComponent}</article>
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
          <ArticleActionIcons
            right={0}
            popupId='articleDetail'
            isSharePopupOpen={isSharePopupOpen}
            setIsSharePopupOpen={setIsSharePopupOpen}
            article={article}
            setLikeDislikeCount={setLikeDislikeCount}
            likeDislikeCount={likeDislikeCount}
          />
        </div>
      </div>
      <ArticleActions
        editor={editorInstance}
        article={article}
        setLikeDislikeCount={setLikeDislikeCount}
        likeDislikeCount={likeDislikeCount}
      />
    </div>
  );
};
