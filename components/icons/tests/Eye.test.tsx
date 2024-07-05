import { render, screen } from '@testing-library/react';

import { EyeIcon } from '../Eye';

describe('Eye icon', () => {
  it('renders the icon', () => {
    render(<EyeIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
