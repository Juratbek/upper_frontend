import { render, screen } from '@testing-library/react';

import { NextIcon } from '../Next';

describe('Next icon', () => {
  it('renders the icon', () => {
    render(<NextIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
