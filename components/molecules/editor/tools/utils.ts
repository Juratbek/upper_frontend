import { KeyboardEvent } from 'react';

import { IBlockData, IBlockNode } from '../instance/Editor.types';
import { IEditorAPI } from './tool.types';

export const generateBlockNode = (element: HTMLDivElement, block: IBlockData): IBlockNode => {
  return {
    ...element,
    type: block.type,
    id: block.id,
    data: block.data,
  };
};

export const textBlockKeydownHandler = (
  event: KeyboardEvent,
  api: IEditorAPI,
  element: HTMLDivElement,
  block: IBlockData,
) => {
  const { code, metaKey: isMetaKey } = event;

  // if user pressed Enter with ctrl or command add new paragraph
  if (code === 'Enter' && isMetaKey) {
    const node = generateBlockNode(element, block);

    api.addBlock('paragraph', node);
    return;
  }

  // if paragraph is empty when user presses Back key remove this paragraph
  if (code === 'Backspace' && element.innerText === '') {
    api.removeBlock(block.id);
    return;
  }

  if (code === 'ArrowUp') {
    api.focusPreviousText(block.id);
  }
};
