import { render, screen } from '@testing-library/react';

import { EyeSlashIcon } from '../EyeSlash';

describe('EyeSlash icon', () => {
  it('renders the icon', () => {
    render(<EyeSlashIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
