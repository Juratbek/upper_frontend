import { Button } from 'components/lib';
import { THEME_VARIANTS } from 'context';
import { useTheme } from 'hooks';
import { TSelectedThemeOption } from 'types';

import cls from './ThemePageContent.module.scss';

export const ThemePageContent = () => {
  const { selectedThemeOption, changeTheme } = useTheme();

  const changeThemeHandler = (option: TSelectedThemeOption) => () => changeTheme(option);

  return (
    <div>
      <h1>Sizga qulay ko&apos;rinishni tanlang</h1>
      {THEME_VARIANTS.map((theme) => (
        <Button
          onClick={changeThemeHandler(theme.value)}
          color='tertiary'
          key={theme.value}
          className={cls['theme-option']}
        >
          <input type='radio' checked={theme.value === selectedThemeOption} />
          <p>{theme.name}</p>
        </Button>
      ))}
    </div>
  );
};
