import { fireEvent, render, screen } from '@testing-library/react';
import { IRegisterResponse } from 'hooks';
import { ReduxWrapper } from 'tests';
import { vi } from 'vitest';

const mockOpenLoginPage = vi.fn();
const mockAuthenticate = vi.fn();

const mockRegisterResponse: IRegisterResponse = {
  id: 12,
  refreshToken: 'refresh_token',
  token: 'this_is_a_token',
};

describe('components/molecules/AuthButton', () => {
  beforeEach(() => {
    vi.doMock('hooks', async (importOriginal) => {
      const mod = await importOriginal<typeof import('hooks')>();
      return {
        ...mod,
        useAuth: () => ({
          openLoginPage: mockOpenLoginPage,
          authenticate: mockAuthenticate,
        }),
        useTheme: () => ({
          theme: {},
        }),
        useUrlParams: () => jest.fn(),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('render', async () => {
    const { AuthButton } = await import('./AuthButton');
    render(
      <ReduxWrapper>
        <AuthButton>Login</AuthButton>
      </ReduxWrapper>,
    );
    const btn = screen.getByRole('button', { name: 'Login' });
    expect(btn).toBeVisible();
  });

  it('adds listener into window', async () => {
    const spy = vi.spyOn(window, 'addEventListener');
    const { AuthButton } = await import('./AuthButton');
    render(
      <ReduxWrapper>
        <AuthButton>Login</AuthButton>
      </ReduxWrapper>,
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('message', expect.any(Function));
  });

  it('calls login callback on login click', async () => {
    const { AuthButton } = await import('./AuthButton');
    render(
      <ReduxWrapper>
        <AuthButton>Login</AuthButton>
      </ReduxWrapper>,
    );
    const btn = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(btn);
    expect(mockOpenLoginPage).toHaveBeenCalledTimes(1);
  });

  it('calls authenticate on message', async () => {
    const { AuthButton } = await import('./AuthButton');
    render(
      <ReduxWrapper>
        <AuthButton>Login</AuthButton>
      </ReduxWrapper>,
    );
    const messageEvent = new MessageEvent<IRegisterResponse>('message', {
      data: mockRegisterResponse,
      origin: 'access.upper.uz',
    });
    fireEvent(window, messageEvent);
    expect(mockAuthenticate).toHaveBeenCalledWith(mockRegisterResponse);
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
  });

  it("doesn't call authenticate on message with not trusted origin", async () => {
    const { AuthButton } = await import('./AuthButton');
    render(
      <ReduxWrapper>
        <AuthButton>Login</AuthButton>
      </ReduxWrapper>,
    );
    const messageEvent = new MessageEvent<IRegisterResponse>('message', {
      data: mockRegisterResponse,
      origin: 'another.domain.com',
    });
    fireEvent(window, messageEvent);
    expect(mockAuthenticate).not.toHaveBeenCalled();
  });
});
