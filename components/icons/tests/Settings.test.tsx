import { render, screen } from '@testing-library/react';

import { SettingsIcon } from '../Settings';

describe('Settings icon', () => {
  it('renders the icon', () => {
    render(<SettingsIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
