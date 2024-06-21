import { IButtonProps } from 'components/lib';
import { Override } from 'utils';

export type TWithPopoverProps = Override<
  IButtonProps,
  {
    popover: JSX.Element;
  }
>;
