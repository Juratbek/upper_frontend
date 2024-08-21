import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryWrapper, ReduxWrapper } from 'tests';
import { vi } from 'vitest';

import { SubscriptionButton } from './SubscriptionButton';

const mocks = vi.hoisted(() => ({
  useAuth: vi.fn(),
  useSubscriptionStatus: vi.fn().mockReturnValue({ isPending: true }),
  useSubscribe: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
  openUnsubscribeModal: vi.fn().mockReturnValue({ type: 'OPEN_UNSUBSCRIBE_MODAL' }),
}));

vi.mock('hooks', async (importOriginal) => {
  const original = await importOriginal<typeof import('hooks')>();
  return {
    ...original,
    useAuth: mocks.useAuth,
  };
});

vi.mock('store/states', () => ({ openUnsubscribeModal: mocks.openUnsubscribeModal }));

vi.mock('store/clients/subscription', async (importOriginal) => {
  const original = await importOriginal<typeof import('store/clients/subscription')>();

  return {
    ...original,
    useSubscriptionStatus: mocks.useSubscriptionStatus,
    useSubscribe: mocks.useSubscribe,
  };
});

describe('SubscriptionButton', () => {
  it('snapshot', () => {
    mocks.useAuth.mockReturnValue({ status: 'loading' });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('snapshot for authorized and not subscribed users', () => {
    mocks.useAuth.mockReturnValue({ status: 'authenticated' });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: false });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('snapshot for unauthorized users', () => {
    mocks.useAuth.mockReturnValue({ status: 'unauthenticated' });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('snapshot for authorized and subscribed users', () => {
    mocks.useAuth.mockReturnValue({ status: 'authenticated' });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: true });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('opens login page on subscribe if user is not authenticated', async () => {
    const mockOpenLoginPage = vi.fn();
    mocks.useAuth.mockReturnValue({ status: 'unauthenticated', openLoginPage: mockOpenLoginPage });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: false });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    const subscribeButton = screen.getByRole('button', { name: "Obuna bo'lish" });
    userEvent.click(subscribeButton);

    await waitFor(() => {
      expect(mockOpenLoginPage).toHaveBeenCalledTimes(1);
    });
  });

  it('calls subscribe on subscription button click if user is authenticated', async () => {
    mocks.useAuth.mockReturnValue({ status: 'authenticated' });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: false });
    const mockMutate = vi.fn();
    mocks.useSubscribe.mockReturnValue({ mutate: mockMutate });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    const subscribeButton = screen.getByRole('button', { name: "Obuna bo'lish" });
    userEvent.click(subscribeButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });
  });

  it('renders subscribed button if user is subscribed', async () => {
    mocks.useAuth.mockReturnValue({ status: 'authenticated' });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: true });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('opens unsubscribe modal on Subscribed button click', async () => {
    mocks.useAuth.mockReturnValue({ status: 'authenticated' });
    mocks.useSubscriptionStatus.mockReturnValue({ isPending: false, data: true });

    render(
      <ReduxWrapper>
        <QueryWrapper>
          <SubscriptionButton blogId={12} />
        </QueryWrapper>
      </ReduxWrapper>,
    );

    const subscribedButton = screen.getByRole('button', { name: "Obuna bo'lingan" });
    userEvent.click(subscribedButton);

    await waitFor(() => {
      expect(mocks.openUnsubscribeModal).toHaveBeenCalledWith(12);
    });
  });
});
