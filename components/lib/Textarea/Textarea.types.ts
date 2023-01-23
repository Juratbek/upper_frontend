import { HTMLAttributes } from 'react';

type TColor = 'transparent' | 'dark';
export interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  color?: TColor;
}
