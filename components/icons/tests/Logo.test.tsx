import { render, screen } from '@testing-library/react';

import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders the icon', () => {
    render(<Logo />);
    const logo = screen.getByTestId('logo-svg');
    expect(logo).toMatchSnapshot();
  });
});
