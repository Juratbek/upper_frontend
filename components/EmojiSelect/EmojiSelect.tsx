import { useCallback, useRef, useState } from 'react';

import { EmojiPopover } from '../EmojiPopover';
import { getCaretCharacterOffsetWithin, replaceRange } from './EmojiSelect.utils';

export const EmojiSelect = () => {
  const positionsList = useRef<number[]>([]);
  const caretCoords = useRef<DOMRect | null>(null);
  const textTarget = useRef<HTMLElement>();
  const [emojiQuery, setEmojiQuery] = useState<string | null>(null);

  const checkCaretPosition = (currentCaretPosition: number, lastPosition: number): boolean => {
    return (
      (currentCaretPosition >= lastPosition || lastPosition - 1 === currentCaretPosition) &&
      positionsList.current[0] - 1 !== currentCaretPosition
    );
  };

  const queryListener = useCallback((e: InputEvent): void => {
    const target = e.target as HTMLDivElement;
    const currentCaretPosition = getCaretCharacterOffsetWithin(target);
    const lastPosition = positionsList.current[positionsList.current.length - 1];
    if (checkCaretPosition(currentCaretPosition, lastPosition) && e.data !== ' ') {
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
          cleanUp={cleanUp}
        />
      )}
    </>
  );
};
