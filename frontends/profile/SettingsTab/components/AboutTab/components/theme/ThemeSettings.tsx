import { ISelectOption, Select } from 'components';
import { useTheme } from 'hooks';
import { USER_THEME } from 'hooks/useTheme/useTheme.constants';
import { FC, useMemo } from 'react';
import { TTheme } from 'types';
import { THEMES } from 'variables';

export const ThemeSettings: FC = () => {
  const { setTheme } = useTheme();
  const theme = useMemo(() => {
    try {
      const theme = localStorage.getItem(USER_THEME) as TTheme;
      if (!theme) return THEMES[0];
      return THEMES.find((t) => t.value === theme);
    } catch (e) {
      return THEMES[0];
    }
  }, []);

  const themeChangeHandler = (option: ISelectOption): unknown => setTheme(option.value as TTheme);

  return (
    <div style={{ minHeight: 200 }}>
      <h2>Tema</h2>
      <div className='form-element'>
        <label htmlFor='' className='form-label'>
          Temani tanlang
        </label>
        <Select options={THEMES} defaultValue={theme} onChange={themeChangeHandler} />
      </div>
    </div>
  );
};
