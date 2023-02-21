import { ReactNode } from 'react';

export interface IHeadProps {
  title: string;
  imgUrl?: string;
  url: string;
  description?: string;
  author?: string;
  publishedDate?: string;
  children?: ReactNode;
}
