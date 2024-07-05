import { render, screen } from '@testing-library/react';

import { DeleteIcon } from '../Delete';

describe('Delete icon', () => {
  it('renders the icon', () => {
    render(<DeleteIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
