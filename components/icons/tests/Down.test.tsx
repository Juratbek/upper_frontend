import { render, screen } from '@testing-library/react';

import { DownIcon } from '../Down';

describe('Down icon', () => {
  it('renders the icon', () => {
    render(<DownIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
