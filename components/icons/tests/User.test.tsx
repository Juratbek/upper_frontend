import { render, screen } from '@testing-library/react';

import { UserIcon } from '../User';

describe('User icon', () => {
  it('renders the icon', () => {
    render(<UserIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
