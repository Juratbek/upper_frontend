import { render, screen } from '@testing-library/react';

import { LinkedInIcon } from '../LinkedIn';

describe('LinkedIn icon', () => {
  it('renders the icon', () => {
    render(<LinkedInIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
