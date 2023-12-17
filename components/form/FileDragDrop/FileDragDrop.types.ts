import { HTMLAttributes } from 'react';
import { Override } from 'utils';

export type TFileDragDropProps = Override<
  HTMLAttributes<HTMLInputElement>,
  {
    defaultValue: File | string;
    selectedFileRenderer?: (file: File | string) => JSX.Element;
    onChange?: (file: File) => void;
    placeholder?: string;
  }
>;
