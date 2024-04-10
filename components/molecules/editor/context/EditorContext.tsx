import { createContext } from 'react';

import { EDITOR_TOOLS } from '../tools/mapper';
import { IEditorContext } from './EditorContext.types';

export const EditorContext = createContext<IEditorContext>({
  data: [],
  renderBlocks: () => null,
  tools: EDITOR_TOOLS,
  addBlock: () => {
    console.error(
      'addBlock function is not implemented. This error might occur if you are using EditorContext outside the provider',
    );
  },
});
