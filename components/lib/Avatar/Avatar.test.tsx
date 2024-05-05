import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Avatar } from './Avatar';

const url = 'https://somedomain.com/someimage.png';

vi.mock('hooks', () => ({
  useTheme: () => ({
    theme: 'light',
    themeColors: {
      avatar: {
        border: '',
      },
    },
  }),
}));

describe('components/lib/Avatar', () => {
  it('render', () => {
    render(<Avatar imgUrl={url} />);
    expect(screen.getByRole('img')).toBeVisible();
  });
});
