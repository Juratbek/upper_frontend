import { ReactNode } from 'react';

export interface IPopoverCallbacks {
  close: VoidFunction;
  closeToolbar: VoidFunction;
}

export interface IInlineTool {
  icon: string;
  callback?: VoidFunction;
  renderPopover?: (callbacks: IPopoverCallbacks) => ReactNode;
}
