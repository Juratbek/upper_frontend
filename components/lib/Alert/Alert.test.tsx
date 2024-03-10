import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Alert } from './Alert';

vi.mock('hooks', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

describe('components/lib/Alert', () => {
  it('renders child', () => {
    render(<Alert>Some text</Alert>);
    expect(screen.getByText('Some text')).toBeVisible();
  });
  it('hides with show property', async () => {
    render(<Alert show={false}>Some text</Alert>);
    const text = screen.queryByText('Some text');
    expect(text).toEqual(null);
  });
  it('changes className using color property', async () => {
    render(<Alert color='red'>Some text</Alert>);
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('alert--red');
  });
});
