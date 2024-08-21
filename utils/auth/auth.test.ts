import { REFRESH_TOKEN, TOKEN } from 'constants/auth';
import { ITokens } from 'hooks';
import { vi } from 'vitest';

import { removeLocalStorageTokens, setLocalStorageTokens } from './auth';

const tokens: ITokens = {
  refreshToken: 'refresh_token',
  token: 'token',
};

describe('utils/auth', () => {
  it('setLocalStorageTokens', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    setLocalStorageTokens(tokens);

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith(TOKEN, tokens.token);
    expect(setItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN, tokens.refreshToken);
  });

  it('removeLocalStorageTokens', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    removeLocalStorageTokens();

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith(TOKEN);
    expect(setItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN);
  });
});
