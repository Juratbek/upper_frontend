import { render, screen } from '@testing-library/react';

import { LogoIcon } from '../LogoIcon';

describe('Logo icon', () => {
  it('renders the icon', () => {
    render(<LogoIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
