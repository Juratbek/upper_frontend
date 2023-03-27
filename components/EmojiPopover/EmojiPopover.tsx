import { FC, useLayoutEffect, useMemo, useRef } from 'react';

import { emojis } from './emoji';
import styles from './EmojiPopover.module.scss';

interface IEmojiPopoverProps {
  emojiQuery: string;
  onEmojiClick: (emoji: string) => void;
  targetTextCoords: DOMRect;
  targetTextContainer: HTMLElement;
}

export const EmojiPopover: FC<IEmojiPopoverProps> = ({
  emojiQuery,
  onEmojiClick,
  targetTextCoords,
  targetTextContainer,
}) => {
  const popoverEl = useRef<HTMLDivElement>(null);
  const emojiListKeys = useMemo<string[]>(() => {
    return Object.keys(emojis);
  }, []);

  useLayoutEffect(() => {
    if (popoverEl.current) {
      const editorContainer = document.querySelector('.editor-container') as HTMLElement;
      const editorContainerRect = editorContainer.getBoundingClientRect();
      const top =
        targetTextCoords.top - editorContainerRect.top + targetTextContainer.offsetHeight / 2 + 10;
      const left = targetTextCoords.left - editorContainerRect.left;
      // set the popover modal position
      popoverEl.current.style.top = top + 'px';
      popoverEl.current.style.left = left + 'px';
    }
  }, []);

  const matchedEmojis = useMemo(() => {
    const queryKey = emojiQuery.split(/\s+/).join('_');

    const matchedEmojiKeys = emojiListKeys.filter((emojiKey) => emojiKey.includes(queryKey));

    return matchedEmojiKeys.map((emojiKey) => ({
      key: emojiKey,
      emoji: emojis[emojiKey],
    }));
  }, [emojiQuery]);

  return (
    <div className={styles.emojiContainer} ref={popoverEl}>
      {matchedEmojis.map((em, i) => (
        <span
          key={i}
          className={styles.emojiItem}
          title={em.key}
          onClick={(): void => onEmojiClick(em.emoji)}
          ref={
            i === 0
              ? (e): void => {
                  e?.focus();
                }
              : undefined
          }
        >
          {em.emoji}
        </span>
      ))}
    </div>
  );
};
