import { createContext } from 'react';

import { EDITOR_TOOLS } from '../tools/mapper';
import { IEditorContext } from './EditorContext.types';

const notImplementedFunction = () => {
  console.error(
    'This function is not implemented. This error might occur if you are using EditorContext outside the provider',
  );
};

export const EditorContext = createContext<IEditorContext>({
  data: [],
  renderBlocks: () => null,
  tools: EDITOR_TOOLS,
  focusPreviousText: notImplementedFunction,
  moveBlockDown: notImplementedFunction,
  moveBlockUp: notImplementedFunction,
  removeBlock: notImplementedFunction,
  addBlock: notImplementedFunction,
  setBlock: notImplementedFunction,
  isEditable: true,
});
