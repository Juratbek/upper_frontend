import { render, screen } from '@testing-library/react';

import { TriangleIcon } from '../Triangle';

describe('Triangle icon', () => {
  it('renders the icon', () => {
    render(<TriangleIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
