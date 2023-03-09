import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface ILinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}
