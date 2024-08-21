import { render, screen } from '@testing-library/react';

import { SendIcon } from '../Send';

describe('Send icon', () => {
  it('renders the icon', () => {
    render(<SendIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
