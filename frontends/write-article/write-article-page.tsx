import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useBeforeUnload, useTheme } from 'hooks';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { setEditor } from 'store/states';

export const WriteArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useBeforeUnload();

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        dispatch(setEditor(editor));
      })
      .catch((e) => console.error('err', e));
  };

  return (
    <div className={`editor-container${theme === 'dark' && '__selected'} container pb-4`}>
      <Editor autoFocus content={{ blocks: [] }} handleInstance={getInstance} />
    </div>
  );
};
