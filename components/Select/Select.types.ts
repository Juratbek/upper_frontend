import { HTMLAttributes } from 'react';

export interface IOption {
  label: string;
  value: string | number;
}

export interface ISelectProps extends HTMLAttributes<HTMLDivElement> {
  options?: IOption[];
}
