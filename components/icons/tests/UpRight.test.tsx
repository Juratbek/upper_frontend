import { render, screen } from '@testing-library/react';

import { UpRightIcon } from '../UpRight';

describe('UpRight icon', () => {
  it('renders the icon', () => {
    render(<UpRightIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
