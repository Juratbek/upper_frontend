import { memo, useCallback, useRef } from 'react';

import { generateBlockNode } from '../tools/utils';
import { IBlockProps } from './Block.types';

export const Block = memo(function Component({ children, onMouseEnter, ...props }: IBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const mouseEnterHandler = useCallback(() => {
    if (!blockRef.current) return;

    const node = generateBlockNode(blockRef.current, props);

    if (blockRef.current) onMouseEnter(node);
  }, [props]);
  // console.log('render blocks');

  return (
    <div ref={blockRef} onMouseEnter={mouseEnterHandler}>
      <div>{children}</div>
    </div>
  );
});
