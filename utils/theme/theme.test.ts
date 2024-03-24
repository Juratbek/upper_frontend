import { TTheme } from 'types';
import { vi } from 'vitest';

import { getDeviceTheme, setServerSideTheme } from './theme';

const mockMql = {
  matches: true,
  addEventListener: vi.fn(),
  onchange: vi.fn(),
  dispatchEvent: vi.fn(),
  media: '',
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
};

describe('getDeviceTheme', () => {
  it('returns dark if user prefers dark theme', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMql);
    expect(getDeviceTheme()).toEqual('dark' satisfies TTheme);
  });

  it("returns light if user doesn't prefer dark theme", () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ ...mockMql, matches: false });
    expect(getDeviceTheme()).toEqual('light' satisfies TTheme);
  });
});

describe('setServerSideTheme', () => {
  it('sets theme in server side using fetch api', () => {
    const spy = vi.spyOn(global, 'fetch');
    const origin = 'https://upper.uz';
    const theme = 'light' satisfies TTheme;
    setServerSideTheme(origin, theme);
    expect(spy).toHaveBeenCalledWith(`${origin}/api/theme?theme=${theme}`);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
