import { render, screen } from '@testing-library/react';

import { DoneIcon } from '../Done';

describe('Done icon', () => {
  it('renders the icon', () => {
    render(<DoneIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
