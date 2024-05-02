import { ReactNode } from 'react';

export interface IInlineTool {
  icon: string;
  callback?: VoidFunction;
  renderPopover?: ({ close }: { close: VoidFunction }) => ReactNode;
}
