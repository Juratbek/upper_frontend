import { HTMLAttributes } from 'react';
import { Override } from 'utils';

export interface IOption {
  label: string;
  value: string | number;
}

export type TSelectProps = Override<
  HTMLAttributes<HTMLDivElement>,
  {
    options?: IOption[];
    defaultValues?: IOption[];
    disabled?: boolean;
    onChange?: (options: IOption[]) => void;
  }
>;
