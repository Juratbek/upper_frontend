import { KeyboardEvent } from 'react';

import { IEditorAPI, IEditorContext } from '../context/EditorContext.types';
import { IBlockData, IBlockNode, TInitialBlockData } from '../instance/Editor.types';
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
    api
      .removeBlock(blockId)
      .then(({ prevBlocks }) => focusPreviousBlock(prevBlocks, blockId, event));
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

        return prevBlock.data;
      });
      return;
    }
  }
};

export function getCurrentBlock<T>({ data, hoveredBlock }: IEditorContext<T>) {
  return data.find((b) => hoveredBlock?.id === b.id);
}

function focusPreviousBlock(
  prevBlocks: IBlockData<TInitialBlockData>[],
  blockId: IBlockData['id'],
  event: KeyboardEvent,
) {
  const prevBlock = prevBlocks.find((_, index) => {
    const nextBlock = prevBlocks[index + 1];
    // if next block is the deleted block -> current block is previous block
    if (nextBlock?.id === blockId) return true;

    return false;
  });

  if (!prevBlock) return;

  const prevBlockElement = document.getElementById(prevBlock?.id);
  const textElements = prevBlockElement?.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p',
  ) as NodeListOf<HTMLParagraphElement | HTMLHeadingElement>;

  if (!textElements || textElements.length < 1) return;

  const lastTextElement = textElements[textElements.length - 1];
  lastTextElement.focus();

  // Create a range (a span of content) and a selection (current user selection)
  const range = document.createRange();
  const selection = window.getSelection();

  if (!selection) return;

  // Move the range to the end of the content inside the element
  range.selectNodeContents(lastTextElement);
  range.collapse(false);

  // Remove any current selections
  selection.removeAllRanges();

  // Add the new range to the selection
  selection.addRange(range);

  event.preventDefault();
}
