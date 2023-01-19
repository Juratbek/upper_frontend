import { ReactNode } from 'react';

type TStatus = 'PUBLISHED' | 'SAVED';

export interface IStatusProps {
  className?: string;
  status: TStatus;
  children?: ReactNode;
}
