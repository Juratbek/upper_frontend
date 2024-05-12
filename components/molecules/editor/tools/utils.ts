import { KeyboardEvent } from 'react';

import { IEditorAPI, IEditorContext } from '../context/EditorContext.types';
import { IBlockData, IBlockNode } from '../instance/Editor.types';
import { isEmpty } from '../utils/html';
import { Selection } from '../utils/selection';

export const generateBlockNode = (element: HTMLDivElement, block: IBlockData): IBlockNode => {
  // just creating new object from params will not work
  // because element is provided using react ref and stores reference to the reference node not to the actual element
  return Object.assign(element, {
    type: block.type,
    id: block.id,
    data: block.data,
  } satisfies IBlockData);
};

export const textBlockKeydownHandler = <T extends { text: string }>(
  event: KeyboardEvent,
  api: IEditorAPI,
  element: HTMLElement,
  blockId: IBlockData['id'],
  config?: { shouldMergeOnBackspace?: boolean },
) => {
  const { code } = event;

  // if user pressed Enter with ctrl or command add new paragraph
  if (code === 'Enter') {
    api.addBlock('paragraph', blockId);
    event.preventDefault();
    return;
  }

  // if paragraph is empty when user presses Back key remove this paragraph
  if (code === 'Backspace' && isEmpty(element)) {
    api.removeBlock(blockId);
    return;
  }

  if (code === 'Backspace' && config?.shouldMergeOnBackspace) {
    const selection = Selection.selection;
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const offset = range.startOffset;

    if (offset === 0) {
      api.mergeWithPrevBlock<T>(blockId, (prevBlock, currentBlock) => {
        prevBlock.data.text += ` ${currentBlock.data.text}`;

        // setTimeout(() => {
        //   const prevBlockElement = document.getElementById(prevBlock.id) as HTMLParagraphElement;

        //   const range = document.createRange();
        //   const selection = window.getSelection();

        //   if (!selection) return;

        //   range.setStart(prevBlockElement.childNodes[0], 12);
        //   range.collapse(true);

        //   selection.removeAllRanges();
        //   selection.addRange(range);
        //   prevBlockElement.focus();
        // }, 0);

        return prevBlock.data;
      });
      return;
    }
  }

  if (code === 'ArrowUp') {
    api.focusPreviousText(blockId);
  }
};

export function getCurrentBlock<T>({ data, hoveredBlock }: IEditorContext<T>) {
  return data.find((b) => hoveredBlock?.id === b.id);
}
