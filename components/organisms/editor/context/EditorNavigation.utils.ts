import { IBlockData } from '../instance/Editor.types';
import { INavigationCallbacks, TFocusPreviousBlock } from './EditorContext.types';

export function getEditorNavigationCallbacks({
  data,
}: {
  data: IBlockData[];
}): INavigationCallbacks {
  const focusPreviousBlock: TFocusPreviousBlock = (blockId) => {
    const currentBlockIndex = data.findIndex((block) => block.id === blockId);
    const prevBlock = data[currentBlockIndex - 1];

    const prevBlockElement = document.getElementById(prevBlock.id);
    const contentEditableElements = prevBlockElement?.querySelectorAll('[contenteditable="true"]');

    if (contentEditableElements?.length) {
      const lastFocusableElement = contentEditableElements.item(
        contentEditableElements.length - 1,
      ) as HTMLElement;
      // lastFocusableElement.focus();

      focusAtEnd(lastFocusableElement);
    }
  };

  return { focusPreviousBlock };
}
function focusAtEnd(paragraphElement: HTMLElement): void {
  // Ensure the element is focusable
  paragraphElement.setAttribute('tabindex', '-1');
  paragraphElement.focus();

  // Create a new text node at the end of the paragraph
  const textNode = document.createTextNode('');
  paragraphElement.appendChild(textNode);

  // Create a range
  const range = document.createRange();
  range.setStart(textNode, 0);
  range.collapse(true); // Collapse the range to the end of the text node

  // Remove any existing selections
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Remove the temporary text node
  paragraphElement.removeChild(textNode);
}
