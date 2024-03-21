import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Clickable } from './Clickable';

describe('components/lib/Clickable', () => {
  it('renders button element', () => {
    render(<Clickable>I am clickable</Clickable>);
    const btn = screen.getByRole('button');
    expect(btn).toBeVisible();
    expect(screen.getByText('I am clickable')).toBeVisible();
  });
  it('calls onClick event', () => {
    const mockFn = vi.fn();
    render(<Clickable onClick={mockFn}>Click me</Clickable>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
