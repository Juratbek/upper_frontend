import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { WEB_APP_ROOT_DIR } from 'variables';
import { vi } from 'vitest';

import { checkAuthInServer } from './checkAuthInServer';

const resolvedUrl = '/profile';

vi.mock('cookies-next', () => ({
  getCookie: vi.fn(),
}));

describe('checkAuthInServer', () => {
  afterEach(() => vi.resetAllMocks());

  it('returns token in props if token is present in cookies', async () => {
    const token = 'some-token';
    vi.mocked(getCookie).mockReturnValue(token);

    const result = await checkAuthInServer({
      req: {},
      res: {},
      resolvedUrl,
    } as GetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        token,
      },
    });
  });

  it('returns object with redirect property', async () => {
    vi.mocked(getCookie).mockReturnValue(undefined);

    const res = await checkAuthInServer({
      req: {},
      res: {},
      resolvedUrl,
    } as GetServerSidePropsContext);

    expect(res).toEqual({
      redirect: {
        destination: `${WEB_APP_ROOT_DIR}/login?redirect=${resolvedUrl}&message=${"Iltimos profilingizga kiring yoki ro'yxatdan o'ting"}`,
        permanent: false,
      },
    });
  });
});
