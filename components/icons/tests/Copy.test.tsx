import { render, screen } from '@testing-library/react';

import { CopyIcon } from '../Copy';

describe('Copy icon', () => {
  it('renders the icon', () => {
    render(<CopyIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
