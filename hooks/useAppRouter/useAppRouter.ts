import { NextRouter, useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

export const useAppRouter = (): NextRouter => {
  const router = useRouter();

  const push = useCallback(
    (href: string) => router.push(`${WEB_APP_ROOT_DIR}${href}`),
    [router.push],
  );

  return useMemo(() => ({ ...router, push }), [router, push]);
};
