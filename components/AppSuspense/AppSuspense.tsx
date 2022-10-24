import { FC, Suspense } from 'react';

import { IAppSuspenseProps } from './AppSuspense.types';

export const AppSuspense: FC<IAppSuspenseProps> = ({ children, fallback = 'Yuklanmoqda...' }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
