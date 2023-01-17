import EditorJS from '@editorjs/editorjs';
import { Editor, MultiSelect } from 'components';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store';
import { useLazyGetBlogArticleByIdQuery } from 'store/apis';
import { getTutorialSections } from 'store/states';

export const TutorialPage: FC = () => {
  const sections = useAppSelector(getTutorialSections);
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>();
  const [fetchArticleById] = useLazyGetBlogArticleByIdQuery();
  const {
    query: { articleId, sectionId },
  } = useRouter();
  useBeforeUnload();

  const currentTutorialArticle = useMemo(() => {
    if (sectionId && articleId) {
      const section = sections.find((section) => section.id === sectionId);
      return section?.articles.find((article) => article.id === articleId);
    }
  }, [articleId, sectionId, sections]);

  useEffect(() => {
    if (currentTutorialArticle?.articleId) {
      fetchArticleById(currentTutorialArticle.articleId);
    }
  }, [currentTutorialArticle?.articleId]);

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        setEditorInstance(editor);
      })
      .catch((e) => console.error('err', e));
  };

  const searchArticles = (value: string): void => {
    console.log('🚀 ~ file: TutorialPage.tsx:41 ~ searchArticles ~ value', value);
  };

  const article = useMemo(() => {
    if (!currentTutorialArticle) {
      return <div>not selected</div>;
    }

    if (currentTutorialArticle.articleId) {
      return (
        <div className='editor-container container pb-4'>
          <Editor isEditable={false} content={{ blocks: [] }} handleInstance={getInstance} />
        </div>
      );
    }

    return (
      <div className='container mt-3'>
        <h2>Biriktirish uchun maqola tanlang</h2>
        <MultiSelect
          multiple={false}
          placeholder='Qidirish uchun yozing'
          onInputDebounce={searchArticles}
        />
      </div>
    );
  }, [currentTutorialArticle?.articleId]);

  return article;
};
