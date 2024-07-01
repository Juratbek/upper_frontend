import { render, screen } from '@testing-library/react';

import { PrevIcon } from '../Prev';

describe('Prev icon', () => {
  it('renders the icon', () => {
    render(<PrevIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
