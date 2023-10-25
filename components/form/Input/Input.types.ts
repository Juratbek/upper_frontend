import { InputHTMLAttributes } from 'react';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  rootClassName?: string;
};
