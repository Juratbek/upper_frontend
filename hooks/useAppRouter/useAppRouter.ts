import { WEB_APP_ROOT_DIR } from 'constants/common';
import { NextRouter, useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export const useAppRouter = (): NextRouter => {
  const router = useRouter();

  const push = useCallback(
    (href: string) => router.push(`${WEB_APP_ROOT_DIR}${href}`),
    [router.push],
  );

  return useMemo(() => ({ ...router, push }), [router, push]);
};
