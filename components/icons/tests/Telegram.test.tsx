import { render, screen } from '@testing-library/react';

import { TelegramIcon } from '../Telegram';

describe('Telegram icon', () => {
  it('renders the icon', () => {
    render(<TelegramIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
