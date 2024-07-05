import { render, screen } from '@testing-library/react';

import { FacebookIcon } from '../Facebook';

describe('Facebook icon', () => {
  it('renders the icon', () => {
    render(<FacebookIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
