import { FC, useMemo } from 'react';

import { useEditorContext } from '../context';
import { EditorProvider } from '../context/EditorProvider';
import { InlineToolbar } from '../inline-toolbar/InlineToolbat';
import { useListeners } from '../listeners/useListeners';
import { Toolbar } from '../toolbar/Toolbar';
import classes from './Editor.module.scss';
import { IEditorProps } from './Editor.types';

export const EDITOR_BLOCKS_CONTAINER_ID = 'editor-blocks-container';

export const Editor: FC<IEditorProps> = (props) => (
  <EditorProvider {...props}>
    <Instance />
  </EditorProvider>
);

const Instance = () => {
  const { renderBlocks, isEditable } = useEditorContext();
  useListeners();

  const blocks = useMemo(renderBlocks, [renderBlocks]);

  return (
    <div className={classes['editor-root']} id='editor-root'>
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
