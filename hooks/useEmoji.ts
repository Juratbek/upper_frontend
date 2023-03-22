import EditorJs from '@editorjs/editorjs';
import { useCallback, useEffect } from 'react';

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
export const useEmoji = (editor: null | EditorJs): void => {
  const handleKeyPress = useCallback(
    (e: InputEvent): void => {
      const target = e.target as HTMLDivElement;
      console.log(getCaretCharacterOffsetWithin(target));
      if (e.data === ':') {
        // @ts-ignore
        target.addEventListener('input', queryListener);
      }
    },
    [editor],
  );

  const queryListener = useCallback((e: InputEvent): void => {
    debugger;
    console.log('I am tracking search query');
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
