import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Button } from './Button';

vi.mock('hooks', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

describe('components/lib/Button', () => {
  it('renders button element', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeVisible();
    expect(screen.getByText('Click me')).toBeVisible();
  });
  it('calls onClick event', () => {
    const mockFn = vi.fn();
    render(<Button onClick={mockFn}>Click me</Button>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
