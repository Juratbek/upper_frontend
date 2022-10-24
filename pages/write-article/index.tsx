import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useBeforeUnload } from 'hooks';
import { useAppDispatch } from 'store';
import { setEditor } from 'store/states';
import { checkAuthInServer } from 'utils';

export default function WriteArticlePage(): JSX.Element {
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
    <div className='editor-container'>
      <Editor content={{ blocks: [] }} handleInstance={getInstance} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
