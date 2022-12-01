import { HTMLAttributes, ReactNode } from 'react';
import { Override } from 'utils';

export interface IOption {
  label: string;
  value: string | number;
  [name: string]: ReactNode;
}

export type TMultiSelectProps = Override<
  HTMLAttributes<HTMLDivElement>,
  {
    options?: IOption[];
    defaultValues?: IOption[];
    disabled?: boolean;
    onChange?: (options: IOption[]) => void;
    onInputDebounce?: (value: string) => void;
    inputPlacegolder?: string;
    renderItem?: (option: IOption) => JSX.Element;
    max?: number;
    loading?: boolean;
  }
>;
