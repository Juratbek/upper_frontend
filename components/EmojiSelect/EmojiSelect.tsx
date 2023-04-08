import EditorJs from '@editorjs/editorjs';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { EXCLUDED_PLUGINS_FROM_EMOJI } from 'variables';

import { EDITOR_HOLDER } from '../Editor';
import { EmojiPopover } from '../EmojiPopover';

function getCaretCoordinates(element: HTMLElement, position: number): DOMRect {
  const range = document.createRange();

  let totalOffset = 0;
  let textNode: Node | null = null;

  // Find the text node that contains the position
  const findTextNode = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = (node.textContent as string).length;
      if (totalOffset <= position && totalOffset + len >= position && !textNode) {
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

function replaceRange(start: number, end: number, el: HTMLElement, newText: string): void {
  const range = document.createRange();
  const sel = window.getSelection() as Selection;

  let totalOffset = 0;
  let startTextNode: Node | null = null;
  let endTextNode: Node | null = null;

  const findTextNodes = function (node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const textContentLength = (node.textContent as string).length;
      if (totalOffset <= start && totalOffset + textContentLength >= start) {
        startTextNode = node;
      }
      if (totalOffset <= end && totalOffset + textContentLength >= end) {
        endTextNode = node;
      }
      totalOffset += textContentLength;
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

  // Workaround for length error in editorjs
  const newElement: Node = document.createTextNode(newText);

  const parentElement = (
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer
  ) as HTMLElement;

  range.deleteContents();
  range.insertNode(newElement);
  range.setStartAfter(newElement);
  range.setEndAfter(newElement);
  // Reset the selection to include the new element
  // range.selectNodeContents(newElement);
  sel.removeAllRanges();
  sel.addRange(range);

  parentElement.normalize();
}

interface IEmojiSelectProps {
  editor: null | EditorJs;
}
export const EmojiSelect: FC<IEmojiSelectProps> = ({ editor }) => {
  const positionsList = useRef<number[]>([]);
  const caretCoords = useRef<DOMRect | null>(null);
  const textTarget = useRef<HTMLElement>();
  const [emojiQuery, setEmojiQuery] = useState<string | null>(null);

  const checkIfPluginExcluded = (el: HTMLElement): boolean => {
    let isElementBlackListed = false;
    EXCLUDED_PLUGINS_FROM_EMOJI.forEach((pluginSelector) => {
      if (el.classList.contains(pluginSelector)) {
        isElementBlackListed = true;
      }
    });
    return isElementBlackListed;
  };

  const handleKeyPress = useCallback(
    (e: InputEvent): void => {
      const target = e.target as HTMLDivElement;

      if (checkIfPluginExcluded(target)) return;
      if (e.data === ':') {
        const caretPosition = getCaretCharacterOffsetWithin(target);
        positionsList.current = [caretPosition];
        caretCoords.current = getCaretCoordinates(target, caretPosition);
        textTarget.current = target;
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
      setEmojiQuery(
        (target.textContent as string).slice(
          positionsList.current[0],
          getCaretCharacterOffsetWithin(target),
        ),
      );
    } else cleanUp();
  }, []);

  const cleanUp = (): void => {
    // @ts-ignore
    textTarget.current?.removeEventListener('input', queryListener);
    positionsList.current = [];
    caretCoords.current = null;
    textTarget.current = undefined;
    setEmojiQuery(null);
  };

  useEffect(() => {
    if (editor) {
      const editorContainer = document.querySelector('#' + EDITOR_HOLDER);
      if (!editorContainer) return;
      // @ts-ignore
      editorContainer.addEventListener('input', handleKeyPress);
    }
  }, [editor]);

  const onEmojiClick = (emoji: string): void => {
    if (textTarget.current) {
      replaceRange(
        positionsList.current[0] - 1,
        positionsList.current[positionsList.current.length - 1],
        textTarget.current,
        emoji,
      );
    }
    cleanUp();
  };

  return (
    <>
      {textTarget.current && caretCoords.current && typeof emojiQuery === 'string' && (
        <EmojiPopover
          emojiQuery={emojiQuery}
          onEmojiClick={onEmojiClick}
          targetTextCoords={caretCoords.current}
        />
      )}
    </>
  );
};
