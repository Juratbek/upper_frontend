import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('components/lib/Badge', () => {
  it('render', () => {
    render(<Badge>+9</Badge>);
    expect(screen.getByRole('badge')).toBeVisible();
  });
});
