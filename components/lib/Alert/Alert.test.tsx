import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Alert } from './Alert';

vi.mock('hooks', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

// vi.mock('utils', () => ({
//   getClassName: vi.fn(),
// }));

describe('components/lib/Alert', () => {
  it('renders child', () => {
    render(<Alert>Some text</Alert>);
    expect(screen.getByText('Some text')).toBeVisible();
  });
});
