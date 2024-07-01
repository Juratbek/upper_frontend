import { render, screen } from '@testing-library/react';

import { MoonIcon } from '../Moon';

describe('Moon icon', () => {
  it('renders the icon', () => {
    render(<MoonIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
