import NextLink from 'next/link';
import { forwardRef } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import { ILinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>(function Component(
  { children, ...props },
  ref,
) {
  return (
    <NextLink {...props} href={`${WEB_APP_ROOT_DIR}${props.href}`} ref={ref}>
      {children}
    </NextLink>
  );
});
