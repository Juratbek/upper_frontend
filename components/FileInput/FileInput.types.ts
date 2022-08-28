import { HTMLAttributes } from 'react';
import { Override } from 'utils';

export type TFileInputProps = Override<
  HTMLAttributes<HTMLInputElement>,
  {
    onChange?: (file: File) => void;
  }
>;
