import { FC, forwardRef, ReactNode, useEffect, useRef } from 'react';

import { IToolProps } from '../tool.types';
import classes from './List.module.scss';
import { IListData } from './List.types';

const StyledList = forwardRef<HTMLOListElement, { style: IListData['style']; children: ReactNode }>(
  function Component({ style, children }, ref) {
    if (style === 'ordered') {
      return <ol ref={ref}>{children}</ol>;
    }
    return <ul ref={ref}>{children}</ul>;
  },
);

export const List: FC<IToolProps<IListData>> = ({ data, isEditable }) => {
  const { style, items } = data ?? { style: 'unordered', items: [''] };
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const { current } = ref;
    if (current && isEditable) {
      const firstItem = current.querySelector('li');
      firstItem?.focus();
    }
  }, []);

  return (
    <StyledList style={style} ref={ref}>
      {items?.map((item, index) => (
        <li
          className={classes.item}
          contentEditable={isEditable}
          dangerouslySetInnerHTML={{ __html: item }}
          key={index}
        />
      ))}
    </StyledList>
  );
};
