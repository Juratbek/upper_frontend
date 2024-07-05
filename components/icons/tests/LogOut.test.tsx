import { render, screen } from '@testing-library/react';

import { LogOutIcon } from '../LogOut';

describe('LogOut icon', () => {
  it('renders the icon', () => {
    render(<LogOutIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
