import { render, screen } from '@testing-library/react';

import { HomeIcon } from '../Home';

describe('Home icon', () => {
  it('renders the icon', () => {
    render(<HomeIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
