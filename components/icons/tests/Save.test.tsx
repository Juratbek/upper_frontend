import { render, screen } from '@testing-library/react';

import { SaveIcon } from '../Save';

describe('Save icon', () => {
  it('renders the icon', () => {
    render(<SaveIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
