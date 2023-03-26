import EditorJs from '@editorjs/editorjs';
import { useCallback, useEffect, useRef } from 'react';

function getCaretCoordinates(element: HTMLElement, position: number): DOMRect {
  const range = document.createRange();

  let totalOffset = 0;
  let textNode = null;

  // Find the text node that contains the position
  const findTextNode = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = (node.textContent as string).length;
      if (totalOffset <= position && totalOffset + len >= position) {
        textNode = node;
      }
      totalOffset += len;
    } else {
      for (let i = 0, len = node.childNodes.length; i < len; ++i) {
        findTextNode(node.childNodes[i]);
      }
    }
  };

  findTextNode(element);

  // Set the range to the caret position
  // @ts-ignore
  range.setStart(textNode, position - (totalOffset - textNode.textContent.length));
  // @ts-ignore
  range.setEnd(textNode, position - (totalOffset - textNode.textContent.length));

  // Get the bounding rectangle of the range
  return range.getBoundingClientRect();
}

function getCaretCharacterOffsetWithin(element: HTMLElement): number {
  let caretOffset = 0;
  const sel = window.getSelection() as Selection;
  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  return caretOffset;
}

function replaceRange(start: number, end: number, el: HTMLElement): void {
  const range = document.createRange();
  const sel = window.getSelection() as Selection;

  let totalOffset = 0;
  let startTextNode: Node | null = null;
  let endTextNode: Node | null = null;

  const findTextNodes = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = (node.textContent as string).length;
      if (totalOffset <= start && totalOffset + len >= start) {
        startTextNode = node;
      }
      if (totalOffset <= end && totalOffset + len >= end) {
        endTextNode = node;
      }
      totalOffset += len;
    } else {
      for (let i = 0, len = node.childNodes.length; i < len; ++i) {
        findTextNodes(node.childNodes[i]);
      }
    }
  };

  findTextNodes(el);

  // Extract the range from the text nodes
  // @ts-ignore
  range.setStart(startTextNode, start - (totalOffset - startTextNode.textContent.length));
  // @ts-ignore
  range.setEnd(endTextNode, end - totalOffset + endTextNode.textContent.length);

  // Create and insert the new element
  const newElement = document.createElement('span');
  newElement.setAttribute('contenteditable', 'false');
  newElement.textContent = '😀';
  range.deleteContents();
  range.insertNode(newElement);
  range.setStartAfter(newElement);
  range.setEndAfter(newElement);
  // Reset the selection to include the new element
  // range.selectNodeContents(newElement);
  sel.removeAllRanges();
  sel.addRange(range);
}
export const useEmoji = (editor: null | EditorJs): void => {
  const positionsList = useRef<number[]>([]);
  const caretCoords = useRef<DOMRect | null>(null);

  const handleKeyPress = useCallback(
    (e: InputEvent): void => {
      const target = e.target as HTMLDivElement;
      if (e.data === ':') {
        const caretPosition = getCaretCharacterOffsetWithin(target);
        positionsList.current = [caretPosition];
        caretCoords.current = getCaretCoordinates(target, caretPosition);
        // @ts-ignore
        target.addEventListener('input', queryListener);
      }
    },
    [editor],
  );

  const queryListener = useCallback((e: InputEvent): void => {
    const target = e.target as HTMLDivElement;
    const currentCaretPosition = getCaretCharacterOffsetWithin(target);
    const lastPosition = positionsList.current[positionsList.current.length - 1];
    if (
      (currentCaretPosition >= lastPosition || lastPosition - 1 === currentCaretPosition) &&
      positionsList.current[0] - 1 !== currentCaretPosition
    ) {
      positionsList.current.push(currentCaretPosition);
      if (e.data === 'z') {
        replaceRange(positionsList.current[0] - 1, getCaretCharacterOffsetWithin(target), target);
        // @ts-ignore
        target.removeEventListener('input', queryListener);
      }
    } else {
      // @ts-ignore
      target.removeEventListener('input', queryListener);
    }
    console.log(positionsList.current);
    console.log(currentCaretPosition);
    console.log(caretCoords.current);
  }, []);

  useEffect(() => {
    if (editor) {
      const editorContainer = document.querySelector('#editorjs');
      if (!editorContainer) return;
      // @ts-ignore
      editorContainer.addEventListener('input', handleKeyPress);
    }
  }, [editor]);
};
