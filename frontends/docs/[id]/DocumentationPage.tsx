import EditorJS from '@editorjs/editorjs';
import { ApiErrorBoundary, Button, Editor, Head } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useLazyGetDocByIdQuery } from 'store/apis';
import { addUriToImageBlocks } from 'utils';

import { DOCS_SIDEBAR_LINKS } from '../sidebar';
import styles from './documentation.module.scss';

const getDocUrl = (parent: string, urls: string[], link: string): string => {
  return parent + [...urls, link].join('_');
};

export const DocumentationPage: FC = () => {
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

  const buttons = useMemo(() => {
    if (!id) return;
    const idUrls = (id as string).split('_');
    let links = DOCS_SIDEBAR_LINKS;

    for (let i = 0; i < idUrls.length - 1; i++) {
      const link = links.find((link) => link.url === idUrls[i]);
      links = link?.children || [];
    }

    const currentDocUrl = idUrls[idUrls.length - 1];
    const currentDocIndex = links.findIndex((link) => link.url === currentDocUrl);
    const prevDoc = links[currentDocIndex - 1];
    const nextDoc = links[currentDocIndex + 1];
    const urlsWithoutCurrentDocId = idUrls.slice(0, idUrls.length - 1);

    return (
      <div className='editor-container d-flex justify-content-between my-2'>
        {prevDoc ? (
          <Link href={getDocUrl('/docs/', urlsWithoutCurrentDocId, prevDoc.url)}>
            <a>
              <Button color='outline-dark'>
                <span className='px-4' style={{ marginLeft: '-15px' }}>
                  &laquo;&nbsp;{prevDoc.name}
                </span>
              </Button>
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextDoc ? (
          <Link href={getDocUrl('/docs/', urlsWithoutCurrentDocId, nextDoc.url)}>
            <a>
              <Button color='outline-dark'>
                <span className={styles['documentation-button']}>{nextDoc.name}&nbsp;&raquo;</span>
              </Button>
            </a>
          </Link>
        ) : (
          <div />
        )}
      </div>
    );
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchDocumentation(id as string);
  }, [id]);

  return (
    <div>
      <Head title="Qo'llanma" url='/documentation' />
      <ApiErrorBoundary
        onError={(): ReactNode => (
          <div className='text-center'>
            <h2>Qo&apos;llanma topilmadi</h2>
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
      {buttons}
    </div>
  );
};
