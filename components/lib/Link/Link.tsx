import NextLink from 'next/link';
import { FC } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import { ILinkProps } from './Link.types';

export const Link: FC<ILinkProps> = ({ children, ...props }) => {
  return (
    <NextLink {...props} href={`${WEB_APP_ROOT_DIR}${props.href}`}>
      {children}
    </NextLink>
  );
};
