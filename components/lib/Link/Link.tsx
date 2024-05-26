import NextLink from 'next/link';
import { forwardRef } from 'react';
import { getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import cls from './Link.module.scss';
import { ILinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>(function Component(
  { children, ...props },
  ref,
) {
  return (
    <NextLink
      {...props}
      href={`${WEB_APP_ROOT_DIR}${props.href}`}
      ref={ref}
      className={getClassName(props.className, cls.link)}
    >
      {children}
    </NextLink>
  );
});
