import { render, screen } from '@testing-library/react';

import { CommentIcon } from '../Comment';

describe('Comment icon', () => {
  it('renders the icon', () => {
    render(<CommentIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
