import { HTMLAttributes, ReactNode } from 'react';

export interface IClickableProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
