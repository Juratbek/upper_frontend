import { render, screen } from '@testing-library/react';

import { PlusIcon } from '../Plus';

describe('Plus icon', () => {
  it('renders the icon', () => {
    render(<PlusIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
