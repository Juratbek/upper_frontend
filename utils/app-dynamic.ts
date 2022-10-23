import dynamic, { DynamicOptions } from 'next/dynamic';
import { ComponentType } from 'react';

export const appDynamic = (path: string, options?: DynamicOptions): ComponentType =>
  dynamic(() => import(path), {
    ssr: false,
    ...options,
  });
