import dynamic, { DynamicOptions, Loader } from 'next/dynamic';

export const appDynamic = <T = Record<string, never>>(
  dynamicOptions: DynamicOptions<T> | Loader<T>,
  options?: DynamicOptions<T>,
): React.ComponentType<T> =>
  dynamic<T>(dynamicOptions, {
    ssr: false,
    ...options,
  });
