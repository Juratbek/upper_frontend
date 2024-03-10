import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { BackButton } from './BackButton';

vi.mock('next/router', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

describe('components/lib/BackButton', () => {
  it('render', () => {
    render(<BackButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeVisible();
    const icon = screen.getByRole('svg');
    expect(icon).toBeVisible();
    expect(screen.getByText('Ortga')).toBeVisible();
  });
});
