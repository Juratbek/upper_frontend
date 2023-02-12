import { useAppDispatch, useAppSelector } from 'store';
import { getTheme, setTheme as setStoreTheme } from 'store/states';

import { IUseTheme, TSetTheme } from './useTheme.types';

export const useTheme = (): IUseTheme => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);

  const setTheme: TSetTheme = (theme) => dispatch(setStoreTheme(theme));

  return {
    theme,
    setTheme,
  };
};
