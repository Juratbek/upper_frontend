import { act, renderHook } from '@testing-library/react';
import { IUseNextAuthProps } from 'hooks/useNextAuth/useNextAuth.types';
import { ReduxWrapper } from 'tests';
import { TAuthStatus } from 'types';
import { ACCESS_UPPER_UZ, REFRESH_TOKEN, TOKEN } from 'variables';
import { vi } from 'vitest';

import { useAuth } from './useAuth';
import { IRegisterResponse } from './useAuth.types';

const mockAuthData: IRegisterResponse = {
  id: 12,
  refreshToken: 'refresh_token',
  token: 'some_token',
};

const { mockSignIn, mockSignOut } = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
  mockDispatch: vi.fn(),
}));

vi.mock('hooks', () => ({
  useNextAuth: (): IUseNextAuthProps => ({
    signIn: mockSignIn,
    signOut: mockSignOut,
  }),
}));

describe('hooks/useAuth', () => {
  it('renders default state', () => {
    const {
      result: { current },
    } = renderHook(useAuth, { wrapper: ReduxWrapper });
    expect(current.status).toEqual('loading' satisfies TAuthStatus);
    expect(current.isAuthenticated).toEqual(null);
    expect(current.isLoading).toEqual(true);
    expect(current.authenticate).toBeDefined();
    expect(current.unauthenticate).toBeDefined();
    expect(current.getRefreshToken).toBeDefined();
  });

  it('authenticate', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });

    act(() => {
      result.current.authenticate(mockAuthData);

      expect(setItemSpy).toHaveBeenCalledWith(TOKEN, mockAuthData.token);
      expect(setItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN, mockAuthData.refreshToken);
      expect(mockSignIn).toHaveBeenCalledWith(mockAuthData.token);
    });
    const { current } = result;
    expect(current.status).toEqual('authenticated' satisfies TAuthStatus);
    expect(current.isAuthenticated).toEqual(true);
    expect(current.isLoading).toEqual(false);
  });

  it('unauthenticate', () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });

    act(() => {
      result.current.unauthenticate();
    });

    expect(removeItemSpy).toHaveBeenCalledWith(TOKEN);
    expect(removeItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN);
    expect(mockSignOut).toHaveBeenCalledWith();

    const { current } = result;
    expect(current.status).toEqual('unauthenticated' satisfies TAuthStatus);
    expect(current.isAuthenticated).toEqual(false);
    expect(current.isLoading).toEqual(false);
  });

  it('openLoginPage', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => window);
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });
    result.current.openLoginPage();
    expect(openSpy).toHaveBeenCalledWith(ACCESS_UPPER_UZ, '_blank');
    expect(openSpy).toHaveBeenCalledTimes(1);
  });

  it('openLoginPage with title', () => {
    const openSpy = vi.spyOn(window, 'open');
    const title = "Maqola yozish uchun ro'yxatdan o'ting";
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });
    result.current.openLoginPage(title);
    expect(openSpy).toHaveBeenCalledWith(`${ACCESS_UPPER_UZ}?title=${title}`, '_blank');
    expect(openSpy).toHaveBeenCalledTimes(1);
  });

  it('getToken and getRefreshToken', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });

    result.current.getToken();
    expect(getItemSpy).toHaveBeenCalledWith(TOKEN);

    result.current.getRefreshToken();
    expect(getItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN);
  });

  it('authenticateTokens', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });
    act(() => result.current.authenticateTokens(mockAuthData));

    expect(setItemSpy).toHaveBeenCalledWith(TOKEN, mockAuthData.token);
    expect(setItemSpy).toHaveBeenCalledWith(REFRESH_TOKEN, mockAuthData.refreshToken);
    expect(mockSignIn).toHaveBeenCalledWith(mockAuthData.token);

    const { current } = result;
    expect(current.status).toEqual('authenticated' satisfies TAuthStatus);
    expect(current.isAuthenticated).toEqual(true);
    expect(current.isLoading).toEqual(false);
  });

  it('syncTokens', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: () => mockAuthData,
      headers: { get: () => 'application/json' },
    });
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('refresh_token');
    const { result } = renderHook(useAuth, { wrapper: ReduxWrapper });
    await act(result.current.syncTokens);

    const { current } = result;
    expect(current.status).toEqual('authenticated' satisfies TAuthStatus);
    expect(current.isAuthenticated).toEqual(true);
    expect(current.isLoading).toEqual(false);
  });
});
