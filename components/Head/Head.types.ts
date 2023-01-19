import { ReactNode } from 'react';

type TOgType = 'article' | 'blog';

export interface IHeadProps {
  title: string;
  imgUrl?: string;
  url: string;
  description?: string;
  type?: TOgType;
  author?: string;
  publishedDate?: string;
  children?: ReactNode;
}
