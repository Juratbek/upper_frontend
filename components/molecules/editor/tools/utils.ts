import { KeyboardEvent } from 'react';

import { IEditorAPI } from '../context/EditorContext.types';
import { IBlockData, IBlockNode } from '../instance/Editor.types';

export const generateBlockNode = (element: HTMLDivElement, block: IBlockData): IBlockNode => {
  // just creating new object from params will not work
  // because element is provided using react ref and stores reference to the reference node not to the actual element
  return Object.assign(element, {
    type: block.type,
    id: block.id,
    data: block.data,
  } satisfies IBlockData);
};

export const textBlockKeydownHandler = (
  event: KeyboardEvent,
  api: IEditorAPI,
  element: HTMLDivElement,
  blockId: IBlockData['id'],
) => {
  const { code, metaKey: isMetaKey } = event;

  // if user pressed Enter with ctrl or command add new paragraph
  if (code === 'Enter' && isMetaKey) {
    api.addBlock('paragraph', blockId);
    return;
  }

  // if paragraph is empty when user presses Back key remove this paragraph
  if (code === 'Backspace' && element.innerText === '') {
    api.removeBlock(blockId);
    return;
  }

  if (code === 'ArrowUp') {
    api.focusPreviousText(blockId);
  }
};
