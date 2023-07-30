import EditorJs from '@editorjs/editorjs';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { EXCLUDED_PLUGINS_FROM_EMOJI } from 'variables';

import { EDITOR_HOLDER } from '../Editor';
import { EmojiPopover } from '../EmojiPopover';
import {
  getCaretCharacterOffsetWithin,
  getCaretCoordinates,
  replaceRange,
} from './EmojiSelect.utils';

interface IEmojiSelectProps {
  editor: null | EditorJs;
}
export const EmojiSelect: FC<IEmojiSelectProps> = ({ editor }) => {
  const positionsList = useRef<number[]>([]);
  const caretCoords = useRef<DOMRect | null>(null);
  const textTarget = useRef<HTMLElement>();
  const [emojiQuery, setEmojiQuery] = useState<string | null>(null);
  const [modal, setModal] = useState<HTMLElement>();

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

  useEffect(() => {
    if (editor) {
      const editorContainer = document.querySelector('#' + EDITOR_HOLDER);
      if (!editorContainer) return;
      // @ts-ignore
      editorContainer.addEventListener('input', handleKeyPress);
    }
  }, [editor]);

  useEffect(() => {
    if (!modal) return;
    const handleOutsideClick = (e: MouseEvent): void => {
      if (!modal.contains(e.target as Node)) {
        cleanUp();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [modal]);

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
          onModalMount={(e): void => setModal(e)}
        />
      )}
    </>
  );
};
