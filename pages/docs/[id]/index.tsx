import EditorJS from '@editorjs/editorjs';
import { ApiErrorBoundary, Editor } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useLazyGetDocByIdQuery } from 'store/apis';
import { addUriToImageBlocks } from 'utils';

const DocPage: NextPage = () => {
  const [fetchDoc, fetchDocRes] = useLazyGetDocByIdQuery();
  const [editorInstance, setEditorInstance] = useState<EditorJS>();

  const {
    query: { id },
  } = useRouter();

  const fetchDocumentation = async (id: string): Promise<void> => {
    try {
      const documentation = await fetchDoc(id).unwrap();
      editorInstance?.render({ blocks: addUriToImageBlocks(documentation) });
    } catch (e) {}
  };

  useEffect(() => {
    if (!id) return;
    fetchDocumentation(id as string);
  }, [id]);

  return (
    <ApiErrorBoundary
      onError={(): ReactNode => (
        <div className='text-center'>
          <h2>Qo&apos;llanma topilamdi</h2>
          <p>Tez orada qo&apos;llanma joylanadi. Iltimos kuting...</p>
        </div>
      )}
      res={fetchDocRes}
      className='editor-container'
    >
      {fetchDocRes.data && (
        <Editor
          content={{ blocks: addUriToImageBlocks(fetchDocRes.data) }}
          isEditable={false}
          handleInstance={setEditorInstance}
        />
      )}
    </ApiErrorBoundary>
  );
};

export default DocPage;
