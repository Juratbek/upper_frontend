import { ApiErrorBoundary, Editor } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLazyGetDocByIdQuery } from 'store/apis';
import { addUriToImageBlocks } from 'utils';

const DocPage: NextPage = () => {
  const [fetchDoc, fetchDocRes] = useLazyGetDocByIdQuery();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (!id) return;
    fetchDoc(id as string);
  }, [id]);

  return (
    <ApiErrorBoundary res={fetchDocRes} className='editor-container'>
      {fetchDocRes.data && (
        <Editor content={{ blocks: addUriToImageBlocks(fetchDocRes.data) }} isEditable={false} />
      )}
    </ApiErrorBoundary>
  );
};

export default DocPage;
