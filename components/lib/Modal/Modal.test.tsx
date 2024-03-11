import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Modal } from './Modal';

vi.mock('hooks', () => ({
  useTheme: () => ({
    themeColors: { modal: {} },
  }),
}));

describe('components/lib/Modal', () => {
  it('render', () => {
    render(
      <Modal close={vi.fn()} isOpen>
        Modal content
      </Modal>,
    );
    const bgButton = screen.getByRole('button');
    expect(bgButton).toBeVisible();
    expect(screen.getByText('Modal content')).toBeVisible();
  });
  it('closes modal on bg click', () => {
    const mockFn = vi.fn();
    render(
      <Modal close={mockFn} isOpen>
        Modal content
      </Modal>,
    );
    const bgButton = screen.getByRole('button');
    fireEvent.click(bgButton);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it('shows nothing if isOpen false', () => {
    render(
      <Modal close={vi.fn()} isOpen={false}>
        Modal content
      </Modal>,
    );
    const root = screen.getByTestId(/modal-root/i);
    expect(root).not.toHaveClass('modal--open');
  });
  it('renders modal footer', () => {
    render(
      <Modal close={vi.fn()} isOpen footer={<button>footer</button>}>
        Modal content
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'footer' })).toBeVisible();
  });
});
