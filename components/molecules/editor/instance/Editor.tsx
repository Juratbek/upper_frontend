import { FC, useContext } from 'react';

import { EditorContext } from '../context/EditorContext';
import { EditorProvider } from '../context/EditorProvider';
import { Toolbar } from '../toolbar/Toolbar';
import classes from './Editor.module.scss';
import { IEditorProps } from './Editor.types';

export const Editor: FC<IEditorProps> = (props) => (
  <EditorProvider {...props}>
    <Instance />
  </EditorProvider>
);

const Instance = () => {
  const { renderBlocks } = useContext(EditorContext);

  return (
    <div className={classes['editor-root']}>
      <Toolbar />
      {renderBlocks()}
    </div>
  );
};
