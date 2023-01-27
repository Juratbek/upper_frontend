import { HTMLAttributes } from 'react';
import { Override } from 'utils';

export type TFileDragDropProps = Override<
  HTMLAttributes<HTMLInputElement>,
  {
    selectedFileRenderer?: (file: File) => JSX.Element;
    onChange?: (file: File) => void;
  }
>;
