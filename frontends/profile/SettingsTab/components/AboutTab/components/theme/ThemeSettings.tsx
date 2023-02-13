import { ISelectOption, Select } from 'components';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { TSelectedThemeOption } from 'types';
import { getDeviceTheme } from 'utils';
import { THEME_OPTIONS } from 'variables';

export const ThemeSettings: FC = () => {
  const { setTheme, setSelectedThemeOption, selectedThemeOption } = useTheme();
  const defaultTheme = THEME_OPTIONS.find((t) => t.value === selectedThemeOption);

  const themeChangeHandler = (option: ISelectOption): void => {
    const value = option.value as TSelectedThemeOption;
    setSelectedThemeOption(value);
    if (value === 'device-theme') {
      const deviceTheme = getDeviceTheme();
      setTheme(deviceTheme);
      return;
    }
    setTheme(value);
  };

  return (
    <div style={{ minHeight: 200 }}>
      <h2>Tema</h2>
      <div className='form-element'>
        <label htmlFor='' className='form-label'>
          Temani tanlang
        </label>
        <Select options={THEME_OPTIONS} defaultValue={defaultTheme} onChange={themeChangeHandler} />
      </div>
    </div>
  );
};
