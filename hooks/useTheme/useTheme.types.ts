import { TSetSelectedThemeOption } from 'context';
import { ITheme, TSelectedThemeOption, TTheme } from 'types';

export interface IUseTheme {
  theme: TTheme;
  selectedThemeOption: TSelectedThemeOption;
  themeColors: ITheme;
  changeTheme: TSetSelectedThemeOption;
}
