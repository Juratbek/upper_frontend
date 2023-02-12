import { TRootState } from 'store/store';
import { TTheme } from 'types/theme';

export const getTheme = (store: TRootState): TTheme => store.theme.theme;
