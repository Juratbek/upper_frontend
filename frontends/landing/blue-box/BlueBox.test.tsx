import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReduxWrapper } from 'tests';
import { vi } from 'vitest';

import { BlueBox } from './BlueBox';

const mocks = vi.hoisted(() => ({
  openLoginPage: vi.fn(),
}));

vi.mock('hooks', async (importOriginal) => {
  const original = await importOriginal<typeof import('hooks')>();

  return {
    ...original,
    useAuth: () => ({ openLoginPage: mocks.openLoginPage }),
  };
});

const Component = (
  <ReduxWrapper>
    <BlueBox />
  </ReduxWrapper>
);

describe('BlueBox', () => {
  it('snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('opens login page on login button click', async () => {
    render(Component);

    const loginButton = screen.getByRole('button', { name: 'Boshladik' });
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(mocks.openLoginPage).toHaveBeenCalledTimes(1);
    });
  });
});
