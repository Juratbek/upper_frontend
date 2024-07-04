import { render, screen } from '@testing-library/react';

import { LikeIcon } from '../Like';

describe('Like icon', () => {
  it('renders the icon', () => {
    render(<LikeIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
