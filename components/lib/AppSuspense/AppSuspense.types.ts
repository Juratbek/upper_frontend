import { HTMLAttributes, ReactNode } from 'react';

export interface IAppSuspenseProps extends HTMLAttributes<HTMLDivElement> {
  fallback?: ReactNode;
}
