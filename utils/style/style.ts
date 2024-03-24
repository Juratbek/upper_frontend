import { CSSProperties } from 'react';

export const computeStyles = (
  ...styleObjects: Array<object | boolean | CSSProperties | undefined>
): object =>
  styleObjects.reduce<object>(
    (res, obj) => (typeof obj === 'object' ? { ...res, ...obj } : res),
    {},
  );
