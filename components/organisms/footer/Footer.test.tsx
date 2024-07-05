import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the Footer component', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');

    expect(footer).toMatchSnapshot();
  });
});
