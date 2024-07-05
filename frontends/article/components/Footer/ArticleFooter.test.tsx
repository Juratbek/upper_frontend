import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'store';
import { vi } from 'vitest';

import { ArticleFooter } from './ArticleFooter';

const qc = new QueryClient();

const Component = (
  <QueryClientProvider client={qc}>
    <Provider store={store}>
      <ArticleFooter sharePopoverId='share-popover-id' />
    </Provider>
  </QueryClientProvider>
);

const { toggleCommentsModalMock } = vi.hoisted(() => ({
  toggleCommentsModalMock: vi.fn().mockReturnValue({ type: 'TOGGLE_COMMENTS_MODAL' }),
}));

vi.mock('store/states', async (importOriginal) => {
  const actual = await importOriginal<typeof import('store/states')>();
  return {
    ...actual,
    toggleCommentsModal: toggleCommentsModalMock,
  };
});

describe('ArticleFooter', () => {
  it('initial render snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('opens share popover on share icon click', async () => {
    render(Component);
    const popover = screen.queryByRole('dialog', { hidden: true });
    expect(popover).not.toBeVisible();

    const shareIcon = screen.getByTestId('share-icon');
    userEvent.click(shareIcon);
    waitFor(() => {
      const popover = screen.getByRole('dialog');
      expect(popover).toBeVisible();
    });
  });

  it('opens comments modal on comment icon click', async () => {
    render(Component);

    const commentIcon = screen.getByTestId('comment-icon');
    userEvent.click(commentIcon);

    await waitFor(() => {
      expect(toggleCommentsModalMock).toHaveBeenCalledTimes(1);
    });
  });
});
