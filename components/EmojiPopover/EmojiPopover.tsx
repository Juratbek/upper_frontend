import { ClientOnlyPortal } from 'components';
import { useTheme } from 'hooks';
import {
  CSSProperties,
  FC,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { FixedSizeGrid } from 'react-window';
import { getClassName } from 'utils';
import { EMOJI_CATEGORIES, PORTAL_SELECTOR } from 'variables';

import { emojis } from './emoji';
import styles from './EmojiPopover.module.scss';

interface IEmojiPopoverProps {
  emojiQuery: string;
  onEmojiClick: (emoji: string) => void;
  targetTextCoords: DOMRect;
  cleanUp: VoidFunction;
}

const COLUMN_COUNT = 10;
const PADDING = 16;
const CELL_SIZE = 32;
const GRID_CONTAINER_CLASS = 'gridContainer';

export const EmojiPopover: FC<IEmojiPopoverProps> = ({
  emojiQuery,
  onEmojiClick,
  targetTextCoords,
  cleanUp,
}) => {
  const { theme, themeColors } = useTheme();
  const [category, setCategory] = useState<string>(EMOJI_CATEGORIES[0].name);
  const gridContainerClassName = useMemo(
    () => getClassName(styles.gridContainer, styles[theme]),
    [theme],
  );

  useLayoutEffect(() => {
    if (document.querySelector(PORTAL_SELECTOR)) return;

    const mainAppDiv = document.querySelector('.app');
    if (mainAppDiv) {
      const modalDiv = document.createElement('div');
      modalDiv.setAttribute('id', PORTAL_SELECTOR.slice(1));
      mainAppDiv.appendChild(modalDiv);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (!document.querySelector(PORTAL_SELECTOR)?.contains(e.target as Node)) {
        cleanUp();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
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
    const queryKey = category === 'All' ? emojiQuery.split(/\s+/).join('_') : '';

    const matchedEmojis = emojis
      .filter(
        (emoji) =>
          emoji.aliases.some((al) => al.includes(queryKey)) ||
          emoji.tags.some((tag) => tag.includes(queryKey)),
      )
      .filter((emoji) => category === 'All' || emoji.category === category);

    return matchedEmojis.map((emoji) => ({
      key: emoji.description,
      emoji: emoji.emoji,
      title: emoji.description,
    }));
  }, [emojiQuery, category]);

  useEffect(() => {
    document.querySelector('.' + GRID_CONTAINER_CLASS)?.scrollTo(0, 0);
  }, [category]);

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
        title={matchedEmojis[emojiIndex].title}
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

  const onCategoryClick = (c: string): void => {
    setCategory(c);
  };

  return (
    <ClientOnlyPortal selector={PORTAL_SELECTOR}>
      <div ref={positionModal} className={styles.popoverContainer}>
        {matchedEmojis.length > 0 ? (
          <>
            <FixedSizeGrid
              columnWidth={CELL_SIZE}
              rowHeight={CELL_SIZE}
              columnCount={COLUMN_COUNT}
              rowCount={rowCount}
              height={165}
              width={COLUMN_COUNT * CELL_SIZE + PADDING * 2}
              className={gridContainerClassName + ' ' + GRID_CONTAINER_CLASS}
              innerElementType={innerElementType}
            >
              {Cell}
            </FixedSizeGrid>
            <div className={styles.groupsContainer + ' ' + gridContainerClassName}>
              {EMOJI_CATEGORIES.map((c) => (
                <span
                  key={c.name}
                  className={getClassName(styles.emojiItem, c.name === category && styles.selected)}
                  title={c.name}
                  onClick={(): void => onCategoryClick(c.name)}
                >
                  {c.emoji}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className={gridContainerClassName}>
            <p style={{ color: themeColors.font }} className='mx-2'>
              Stikerlar topilmadi
            </p>
          </div>
        )}
      </div>
    </ClientOnlyPortal>
  );
};
