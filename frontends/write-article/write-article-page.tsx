import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useBeforeUnload, useTheme } from 'hooks';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { setEditor } from 'store/states';

export const WriteArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  useBeforeUnload();

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        dispatch(setEditor(editor));
      })
      .catch((e) => console.error('err', e));
  };

  return (
    <div className={`editor-container codex-editor__editor container pb-4`}>
      <Editor autoFocus content={{ blocks: [] }} handleInstance={getInstance} />
    </div>
  );
};
