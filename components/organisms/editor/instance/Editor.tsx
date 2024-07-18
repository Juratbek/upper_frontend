import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import { useEditorContext } from '../context';
import { EditorProvider } from '../context/EditorProvider';
import { InlineToolbar } from '../inline-toolbar/InlineToolbat';
import { useListeners } from '../listeners/useListeners';
import { Toolbar } from '../toolbar/Toolbar';
import classes from './Editor.module.scss';
import { IEditorProps } from './Editor.types';

export const EDITOR_BLOCKS_CONTAINER_ID = 'editor-blocks-container';

export const EDITOR_ROOT_ID = 'editor-root';

export const Editor: FC<IEditorProps> = (props) => (
  <EditorProvider {...props}>
    <Instance classes={props.classes} />
  </EditorProvider>
);

const Instance = (props: Pick<IEditorProps, 'classes'>) => {
  const { renderBlocks, isEditable } = useEditorContext();
  useListeners();

  const blocks = useMemo(renderBlocks, [renderBlocks]);

  return (
    <div className={getClassName(classes['editor-root'], props.classes?.root)} id={EDITOR_ROOT_ID}>
      {isEditable && (
        <>
          <Toolbar />
          <InlineToolbar />
        </>
      )}
      <div id={EDITOR_BLOCKS_CONTAINER_ID}>{blocks}</div>
    </div>
  );
};
