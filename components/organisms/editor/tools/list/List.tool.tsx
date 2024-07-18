import { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import classes from './List.module.scss';
import { IListData } from './List.types';
import { handleListItemKeydown } from './List.utils';
import { StyledList } from './styled-list/StyledList';

const debounce = debouncer<string>();

export const List = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IListData>) {
    const { style, items } = data ?? { style: 'unordered', items: [''] };
    const ref = useRef<HTMLOListElement>(null);

    useEffect(() => {
      const { current } = ref;
      if (current && isEditable) {
        const firstItem = current.querySelector('li');
        firstItem?.focus();
      }
    }, []);

    const focusLastItem = useCallback(() => {
      const listItems = ref.current?.querySelectorAll('li');
      if (!listItems) return;
      const lastItem = listItems[listItems.length - 1];
      lastItem.focus();
    }, []);

    const keydownHandler = useCallback(
      (event: KeyboardEvent<HTMLLIElement>) => {
        handleListItemKeydown(event, data, api, id, type, focusLastItem);
      },
      [api, id, type, items, style],
    );

    const listItemInputHandler = useCallback(
      (event: ChangeEvent<HTMLLIElement>, index: number) => {
        debounce(event.target.innerHTML, (value) => {
          const updatedItems = [...items];
          updatedItems[index] = value;
          api.setBlock<IListData>({ id, type, data: { items: updatedItems, style } });
        });
      },
      [items, style],
    );

    return (
      <StyledList style={style} ref={ref}>
        {items?.map((item, index) => (
          <li
            onKeyDown={keydownHandler}
            className={classes.item}
            contentEditable={isEditable}
            dangerouslySetInnerHTML={{ __html: item }}
            onInput={(event: ChangeEvent<HTMLLIElement>) => listItemInputHandler(event, index)}
            key={index}
          />
        ))}
      </StyledList>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.style !== currentData.style) return false;

    if (prevData.items?.length !== currentData.items?.length) return false;

    return true;
  },
);
