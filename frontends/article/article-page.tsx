import { OutputData } from '@editorjs/editorjs';
import { createEditor, EDITOR_HOLDER__READ } from 'frontends/EditorJs';
import { useEffect } from 'react';

interface IArticleProps {
  articleData: OutputData;
}

export const Article: React.FC<IArticleProps> = ({ articleData }: IArticleProps) => {
  useEffect(() => {
    if (articleData) {
      createEditor({
        holder: EDITOR_HOLDER__READ,
        data: articleData,
        isReadOnly: true,
      });
    }
  }, [articleData]);

  return (
    <>
      <div id={EDITOR_HOLDER__READ}></div>
    </>
  );
};
