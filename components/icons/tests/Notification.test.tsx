import { render, screen } from '@testing-library/react';

import { NotificationIcon } from '../Notification';

describe('Notification icon', () => {
  it('renders the icon', () => {
    render(<NotificationIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
