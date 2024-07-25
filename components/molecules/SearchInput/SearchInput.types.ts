import { HTMLProps } from 'react';

export interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  inputContainerClassName?: string;
  onClosePopover?: () => void;
}
