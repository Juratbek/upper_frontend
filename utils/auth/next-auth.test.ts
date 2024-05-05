import { vi } from 'vitest';

import { nextAuthSignIn, nextAuthSignOut } from './next-auth';

const origin = 'https://upper.uz';
const token = 'some_token';

describe('utils/nextAuthSignIn', () => {
  it('calls fetch api', () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    const origin = 'https://upper.uz';
    const token = 'some_token';
    nextAuthSignIn(origin, token);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${origin}/api/sign-in?token=${token}`);
  });
  it('calls fetch api', () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    nextAuthSignIn(origin, token);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${origin}/api/sign-in?token=${token}`);
  });

  it('returns rejected promise if params are not valid', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    nextAuthSignIn(origin, '').catch((error) => {
      expect(mockFetch).not.toHaveBeenCalled();
      expect(error).toEqual('Token or origin is not provided');
    });

    nextAuthSignIn('', token).catch((error) => {
      expect(mockFetch).not.toHaveBeenCalled();
      expect(error).toEqual('Token or origin is not provided');
    });
  });
});

describe('utils/nextAuthSignOut', () => {
  it('calls fetch api', () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    nextAuthSignOut(origin);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${origin}/api/sign-out`);
  });
});
