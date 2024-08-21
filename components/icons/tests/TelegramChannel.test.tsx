import { render, screen } from '@testing-library/react';

import { TelegramChannelIcon } from '../TelegramChannel';

describe('TelegramChannel icon', () => {
  it('renders the icon', () => {
    render(<TelegramChannelIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
