import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryWrapper, ReduxWrapper } from 'tests';
import { vi } from 'vitest';

import { UnsubscribeModal } from './UnsubscribeModal';

const mocks = vi.hoisted(() => ({
  closeUnsubscribeModal: vi.fn().mockReturnValue({ type: 'CLOSE_MODAL' }),
  useUnsubscribe: vi.fn().mockReturnValue({ mutate: vi.fn() }),
}));

vi.mock('store/states', async (importOriginal) => {
  const original = await importOriginal<typeof import('store/states')>();

  return {
    ...original,
    closeUnsubscribeModal: mocks.closeUnsubscribeModal,
  };
});

vi.mock('store/clients/subscription', () => ({
  useUnsubscribe: mocks.useUnsubscribe,
}));

const Component = (
  <ReduxWrapper>
    <QueryWrapper>
      <UnsubscribeModal />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('Unsubscribe modal', () => {
  it('snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('closes the modal on cancel click', async () => {
    render(Component);

    const cancelButton = screen.getByRole('button', { name: "yo'q" });
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(mocks.closeUnsubscribeModal).toHaveBeenCalledTimes(1);
    });
  });

  it('unsubscribes and closes the modal on unsubscribe', async () => {
    const mockUnsubscribe = vi.fn();
    mocks.useUnsubscribe.mockReturnValue({ mutate: mockUnsubscribe });
    render(Component);

    const unsubscribeButton = screen.getByRole('button', { name: 'Bekor qilish' });
    userEvent.click(unsubscribeButton);

    await waitFor(() => {
      expect(mocks.closeUnsubscribeModal).toHaveBeenCalled();
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  it('shows spinner if unsubscribe is loading', () => {
    mocks.useUnsubscribe.mockReturnValue({ mutate: vi.fn(), isPending: true });
    render(Component);

    expect(document.body).toMatchSnapshot();
  });
});
