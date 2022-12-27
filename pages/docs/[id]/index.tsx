import EditorJS from '@editorjs/editorjs';
import { ApiErrorBoundary, Editor } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    <ApiErrorBoundary res={fetchDocRes} className='editor-container'>
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
