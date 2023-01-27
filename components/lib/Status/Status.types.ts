import { ReactNode } from 'react';
import { TArticleStatus } from 'types';

type TStatus = 'PUBLISHED' | 'SAVED';

export interface IStatusProps {
  className?: string;
  status: TStatus;
  children?: ReactNode;
}

export const STATUS_LABELS: Record<TArticleStatus, string> = {
  PUBLISHED: 'Nashr qilingan',
  SAVED: 'Saqlangan',
};
