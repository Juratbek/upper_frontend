import { renderHook } from '@testing-library/react';
import { TSelectedThemeOption, TTheme } from 'types';

import { useTheme } from './useTheme';

describe('hooks/useTheme', () => {
  it('render', () => {
    const {
      result: { current },
    } = renderHook(useTheme);
    expect(current.selectedThemeOption).toEqual('device-theme' satisfies TSelectedThemeOption);
    expect(current.theme).toEqual('light' satisfies TTheme);
    expect(current.themeColors).toBeInstanceOf(Object);
  });
});
