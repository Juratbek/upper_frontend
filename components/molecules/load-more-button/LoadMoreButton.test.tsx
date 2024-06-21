import 'tests/mocks/router';

import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { LoadMoreButton } from './LoadMoreButton';

describe('components/molecules/LoadMoreButton', () => {
  it('render', () => {
    render(<LoadMoreButton onClick={vi.fn()} />);
    const btn = screen.getByRole('button', { name: 'Yana yuklash' });
    expect(btn).toBeVisible();
  });

  it('renders loading state', () => {
    render(<LoadMoreButton loading onClick={vi.fn()} />);
    const btn = screen.getByRole('spinner');
    expect(btn).toBeVisible();
  });

  it('disabled on loading', () => {
    const mockFn = vi.fn();
    render(<LoadMoreButton loading onClick={mockFn} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('calls mock fn on click', () => {
    const mockFn = vi.fn();
    render(<LoadMoreButton onClick={mockFn} />);
    const btn = screen.getByRole('button', { name: 'Yana yuklash' });
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
