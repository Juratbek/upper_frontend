import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useAppDispatch } from 'store';
import { setEditor } from 'store/states';

export default function WriteArticlePage(): JSX.Element {
  const dispatch = useAppDispatch();

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        dispatch(setEditor(editor));
      })
      .catch((e) => console.error('err', e));
  };

  return (
    <Editor
      editable={true}
      content={{
        blocks: [],
      }}
      handleInstance={getInstance}
    />
  );
}
