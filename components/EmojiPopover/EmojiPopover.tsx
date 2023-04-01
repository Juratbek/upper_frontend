import { ClientOnlyPortal } from 'components';
import { CSSProperties, FC, forwardRef, useMemo } from 'react';
import { FixedSizeGrid } from 'react-window';
import { PORTAL_SELECTOR } from 'variables';

import { emojis } from './emoji';
import styles from './EmojiPopover.module.scss';

interface IEmojiPopoverProps {
  emojiQuery: string;
  onEmojiClick: (emoji: string) => void;
  targetTextCoords: DOMRect;
}

const COLUMN_COUNT = 8;
const PADDING = 16;
const CELL_SIZE = 30;

export const EmojiPopover: FC<IEmojiPopoverProps> = ({
  emojiQuery,
  onEmojiClick,
  targetTextCoords,
}) => {
  const emojiListKeys = useMemo<string[]>(() => {
    return Object.keys(emojis);
  }, []);

  const positionModal = (popoverEl: HTMLDivElement): void => {
    if (!popoverEl) return;
    const buffer = 8;
    const spaceAbove = targetTextCoords.top;
    const spaceBelow = window.innerHeight - targetTextCoords.bottom;

    if (spaceBelow > popoverEl.offsetHeight + buffer) {
      // position below the target
      popoverEl.style.top = targetTextCoords.bottom + buffer + 'px';
    } else if (spaceAbove > popoverEl.offsetHeight + buffer) {
      // position above the target
      popoverEl.style.top = targetTextCoords.top - popoverEl.offsetHeight - buffer + 'px';
    } else {
      popoverEl.style.top = targetTextCoords.bottom - buffer + 'px';
    }
    popoverEl.style.left = targetTextCoords.left + 'px';
  };
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
    const emojiIndex = COLUMN_COUNT * rowIndex + columnIndex;
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
    <ClientOnlyPortal selector={PORTAL_SELECTOR}>
      <div ref={positionModal} className={styles.popoverContainer}>
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
    </ClientOnlyPortal>
  );
};
