import NextLink from 'next/link';
import { FC } from 'react';

import { ILinkProps } from './Link.types';

export const Link: FC<ILinkProps> = ({ children, className, ...props }) => {
  return (
    <NextLink {...props}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};
