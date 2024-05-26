import { useCallback, useEffect } from 'react';

import { useEditorContext } from '../../context';
import { getEditorBlocksContainer } from '../../utils';
import { Selection } from '../../utils/selection';

export const useNavigationListener = () => {
  const { focusPreviousBlock, focusedBlock } = useEditorContext();

  const downHandler = useCallback(() => {
    const { isFirstLine, leftOffsetPx } = getCursorPosition();
    if (!isFirstLine || !focusedBlock) return;

    focusPreviousBlock(focusedBlock.id, { leftOffsetPx });
  }, [focusPreviousBlock, focusedBlock]);

  const keyboardListener = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'ArrowDown') {
        downHandler();
        return;
      }
      if (key === 'ArrowUp') {
        downHandler();
        return;
      }
    },
    [downHandler],
  );

  useEffect(() => {
    const blocksContainer = getEditorBlocksContainer();
    if (!blocksContainer) {
      console.error(
        'editor blocks container is not defined, navigation listener is not registered',
      );
      return;
    }

    blocksContainer.addEventListener('keydown', keyboardListener);

    return () => blocksContainer.removeEventListener('keydown', keyboardListener);
  }, [keyboardListener]);
};

// export function getCharactersForEachLine(parentElementWidth: number) {
//   const parentElementConditionalWidth = 720;
//   const conditionalCharactersForEachLine = 90;

//   return Math.floor(
//     (parentElementWidth * conditionalCharactersForEachLine) / parentElementConditionalWidth,
//   );
// }

interface ICursorPosition {
  line: number;
  leftOffsetPx?: number;
  isFirstLine: boolean;
  isLastLine: boolean;
}

export function getLinesCount(element: HTMLElement) {
  const lineHeightPx = getLineHeight(element);
  const lineHeight = +lineHeightPx.replace('px', '');

  const totalLinesCount = Math.ceil(element.clientHeight / lineHeight);
  return totalLinesCount;
}

function getCursorPosition(): ICursorPosition {
  const res: ICursorPosition = { line: 0, isFirstLine: false, isLastLine: false };

  const selection = Selection.selection;
  const range = Selection.range;
  const rect = Selection.rect;
  const parentElement = Selection.findParentTag('p');

  if (!range || !selection || !rect || !parentElement) {
    console.error('Selection is not defined');
    return res;
  }

  const parentElementRect = parentElement.getBoundingClientRect();
  const leftOffsetPx = rect.x - parentElementRect.x;
  const topOffsetPx = rect.y - parentElementRect.y;

  const lineHeightPx = getLineHeight(parentElement);
  const lineHeight = +lineHeightPx.replace('px', '');

  const totalLinesCount = getLinesCount(parentElement);
  const currentLine = Math.ceil(topOffsetPx / lineHeight);

  if (currentLine > 1 && currentLine !== totalLinesCount)
    return { line: currentLine, isFirstLine: false, isLastLine: false };

  return {
    line: currentLine,
    leftOffsetPx: leftOffsetPx,
    isFirstLine: currentLine === 1,
    isLastLine: currentLine === totalLinesCount,
  };
}

function getLineHeight(element: HTMLElement): string {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.lineHeight;
}
