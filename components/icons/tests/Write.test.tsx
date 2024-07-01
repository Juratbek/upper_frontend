import { render, screen } from '@testing-library/react';

import { WriteIcon } from '../Write';

describe('Write icon', () => {
  it('renders the icon', () => {
    render(<WriteIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
