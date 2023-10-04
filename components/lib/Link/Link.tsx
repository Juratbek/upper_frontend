import NextLink from 'next/link';
import { FC } from 'react';

import { ILinkProps } from './Link.types';

export const Link: FC<ILinkProps> = ({ children, ...props }) => {
  return <NextLink {...props}>{children}</NextLink>;
};
