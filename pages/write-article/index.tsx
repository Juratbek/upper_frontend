import EditorJS from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useAppDispatch } from 'store';
import { setEditor } from 'store/states';

import { imagesData } from '../../assets/imagesData';

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
    <div className='editor-container'>
      <Editor
        editable={false}
        content={imagesData}
        handleInstance={getInstance}
        changeHandler={async (api): Promise<void> => {
          const data = await api.saver.save();
          console.log(data);
        }}
      />
    </div>
  );
}
