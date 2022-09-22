import { HTMLAttributes } from 'react';
import { TArticleStatus } from 'types';

export interface IArticleStatusProps extends HTMLAttributes<HTMLDivElement> {
  status: TArticleStatus;
}
