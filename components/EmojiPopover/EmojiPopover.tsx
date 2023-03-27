import { CSSProperties, FC, forwardRef, useLayoutEffect, useMemo, useRef } from 'react';
import { FixedSizeGrid } from 'react-window';

import { emojis } from './emoji';
import styles from './EmojiPopover.module.scss';

interface IEmojiPopoverProps {
  emojiQuery: string;
  onEmojiClick: (emoji: string) => void;
  targetTextCoords: DOMRect;
  targetTextContainer: HTMLElement;
}

const COLUMN_COUNT = 8;
const PADDING = 16;
const CELL_SIZE = 30;

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

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
    isScrolling?: boolean | undefined;
  }): JSX.Element | null => {
    const emojiIndex = COLUMN_COUNT * rowIndex + columnIndex + 1;
    if (!matchedEmojis[emojiIndex]) return null;
    return (
      <span
        key={columnIndex + rowIndex}
        className={styles.emojiItem}
        style={{
          ...style,
          left: `${parseFloat(style.left as string) + PADDING}px`,
          top: `${parseFloat(style.top as string) + PADDING}px`,
        }}
        title={matchedEmojis[emojiIndex].key}
        onClick={(): void => onEmojiClick(matchedEmojis[emojiIndex].emoji)}
      >
        {matchedEmojis[emojiIndex].emoji}
      </span>
    );
  };

  const rowCount = Math.ceil(matchedEmojis.length / COLUMN_COUNT);

  const innerElementType = forwardRef<HTMLDivElement, { style: CSSProperties }>(
    ({ style, ...rest }, ref) => (
      <div
        ref={ref}
        style={{
          ...style,
          height: `${parseFloat(style.height as string) + PADDING * 2}px`,
        }}
        {...rest}
      />
    ),
  );
  innerElementType.displayName = 'innerElementType';

  return (
    <div ref={popoverEl} className={styles.popoverContainer}>
      <FixedSizeGrid
        columnWidth={CELL_SIZE}
        rowHeight={CELL_SIZE}
        columnCount={COLUMN_COUNT}
        rowCount={rowCount}
        height={165}
        width={COLUMN_COUNT * CELL_SIZE + PADDING * 2}
        className={styles.gridContainer}
        innerElementType={innerElementType}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};
