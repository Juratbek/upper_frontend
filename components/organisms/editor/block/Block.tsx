import { memo, useCallback, useRef } from 'react';

import { generateBlockNode } from '../tools/utils';
import cls from './Block.module.scss';
import { IBlockProps } from './Block.types';

export const Block = memo(function Component({ children, onMouseEnter, ...props }: IBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const mouseEnterHandler = useCallback(() => {
    if (!blockRef.current) return;

    const node = generateBlockNode(blockRef.current, props);

    if (blockRef.current) onMouseEnter?.(node);
  }, [props]);

  const clickHandler = useCallback(
    () => props.onClick?.({ data: props.data, id: props.id, type: props.type }),
    [props],
  );

  const focusHandler = useCallback(
    () => props.onFocus?.({ data: props.data, id: props.id, type: props.type }),
    [props],
  );

  return (
    <div
      className={cls.block}
      ref={blockRef}
      onMouseEnter={mouseEnterHandler}
      onClick={clickHandler}
      onFocus={focusHandler}
    >
      {children}
    </div>
  );
});
