import { memo, useCallback, useRef } from 'react';

import { IBlockNode } from '../instance/Editor.types';
import { IBlockProps } from './Block.types';

export const Block = memo(function Component({ children, onMouseEnter, ...props }: IBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const mouseEnterHandler = useCallback(() => {
    if (!blockRef.current) return;

    const node = {
      ...blockRef.current,
      ...props,
    } satisfies IBlockNode;

    if (blockRef.current) onMouseEnter(node);
  }, [props]);

  return (
    <div ref={blockRef} onMouseEnter={mouseEnterHandler}>
      <div>{children}</div>
    </div>
  );
});
