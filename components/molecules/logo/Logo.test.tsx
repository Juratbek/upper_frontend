import { render, screen } from '@testing-library/react';

import { Logo } from './Logo';

describe('components/molecules/Logo', () => {
  it('render', () => {
    render(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', '/web');

    const logoSvg = screen.getByTestId('logo-svg');
    expect(logoSvg).toBeVisible();
  });
});
