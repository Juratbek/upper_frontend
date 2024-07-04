import { render, screen } from '@testing-library/react';

import { DislikeIcon } from '../Dislike';

describe('Dislike icon', () => {
  it('renders the icon', () => {
    render(<DislikeIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
