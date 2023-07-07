import { HTMLAttributes } from 'react';
import { Override } from 'utils';

export type TChangeableTextProps = Override<
  HTMLAttributes<HTMLParagraphElement>,
  {
    value: string;
    onSubmit?: (value: string) => void;
    defaultFocused?: boolean;
    className?: string;
    loading?: boolean;
    placeholder?: string;
  }
>;
