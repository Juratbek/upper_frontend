import { render, screen } from '@testing-library/react';

import { SearchIcon } from '../Search';

describe('Search icon', () => {
  it('renders the icon', () => {
    render(<SearchIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
