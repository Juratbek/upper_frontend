import { forwardRef, ReactNode } from 'react';

import { IListData } from '../List.types';

export const StyledList = forwardRef<
  HTMLOListElement,
  { style: IListData['style']; children: ReactNode }
>(function Component({ style, children }, ref) {
  if (style === 'ordered') {
    return <ol ref={ref}>{children}</ol>;
  }
  return <ul ref={ref}>{children}</ul>;
});
