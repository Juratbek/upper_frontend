import { render, screen } from '@testing-library/react';

import { Divider } from './Divider';

describe('components/lib/Divider', () => {
  it('renders', () => {
    render(<Divider />);
    const divider = screen.getByRole('divider');
    expect(divider).toBeVisible();
  });
});
