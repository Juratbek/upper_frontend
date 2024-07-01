import { render, screen } from '@testing-library/react';

import { ShareIcon } from '../Share';

describe('Share icon', () => {
  it('renders the icon', () => {
    render(<ShareIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
