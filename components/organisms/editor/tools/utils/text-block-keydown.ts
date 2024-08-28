import { KeyboardEvent } from 'react';

import { IEditorAPI } from '../../context';
import { IBlockData, TInitialBlockData } from '../../instance/Editor.types';
import { isEmpty } from '../../utils/html';
import { Selection } from '../../utils/selection';
import { IParagraphData } from '../paragraph';

const textNodeNames = 'h1, h2, h3, h4, h5, h6, p';

export const textBlockKeydownHandler = <T extends { text: string }>(
  event: KeyboardEvent,
  api: IEditorAPI,
  element: HTMLElement,
  block: Pick<IBlockData, 'id' | 'type'>,
  config?: { shouldMergeOnBackspace?: boolean },
) => {
  const { code } = event;
  const { id: blockId } = block;

  // if user pressed Enter add new paragraph
  if (code === 'Enter') {
    handleEnter(event, api, element, block);
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
    const range = Selection.range;
    if (!range) return;
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

function handleEnter(
  event: KeyboardEvent,
  api: IEditorAPI,
  element: HTMLElement,
  block: Pick<IBlockData, 'id' | 'type'>,
) {
  const { id: blockId, type: blockType } = block;

  const selection = Selection.selection;
  if (!selection) return;

  const range = selection.getRangeAt(0);
  const cursorPosition = range.startOffset;

  // Clone the range so we can modify it without affecting the current selection
  const cloneRange = range.cloneRange();

  // Create a new range that starts from the cursor position to the end of the paragraph
  cloneRange.setStart(range.startContainer, cursorPosition);
  cloneRange.setEndAfter(element.lastChild!);

  // Extract the contents of the range into a DocumentFragment
  const fragment = cloneRange.extractContents();

  // Convert the fragment to HTML
  const temp = document.createElement('div');
  temp.appendChild(fragment);
  const afterCursorHtml = temp.innerHTML;
  const beforeCursorHtml = element.innerHTML;

  // if there is no text after the cursor -> only add a paragraph
  if (!temp.innerText.trim()) {
    api.addBlock('paragraph', blockId);
    event.preventDefault();
    return;
  }

  // update current block state
  api.setBlock<IParagraphData>({
    id: blockId,
    type: blockType,
    data: { text: beforeCursorHtml },
  });

  // update block content (block will not be rendered when text content is updated)
  const currentBlockElement = document.getElementById(blockId)!;
  const textElement = currentBlockElement.querySelector(textNodeNames)!;
  textElement.innerHTML = beforeCursorHtml;

  // add a new block
  api.addBlock('paragraph', blockId, { text: afterCursorHtml }).then((newBlock) => {
    const newBlockElement = document.getElementById(newBlock.id);
    const paragraph = newBlockElement?.querySelector('p');
    paragraph?.focus();
  });

  event.preventDefault();
}

function getLastTextElement(element: HTMLElement) {
  const textElements = element?.querySelectorAll(textNodeNames) as NodeListOf<
    HTMLParagraphElement | HTMLHeadingElement
  >;

  if (!textElements || textElements.length < 1) return null;

  return textElements[textElements.length - 1];
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

  const lastTextElement = getLastTextElement(prevBlockElement!);
  if (!lastTextElement) return;
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
