import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ActionButtons } from './ActionButtons';

describe('ActionButtons', () => {
  const mockOnPlus = vi.fn();
  const mockOnSettings = vi.fn();
  const color = 'red';

  beforeEach(() => {
    mockOnPlus.mockClear();
    mockOnSettings.mockClear();
  });

  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <ActionButtons onPlus={mockOnPlus} onSettings={mockOnSettings} color={color} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onPlus when the Plus button is clicked', async () => {
    render(<ActionButtons onPlus={mockOnPlus} onSettings={mockOnSettings} color={color} />);

    const plusButton = screen.getByRole('button', { name: /plus/i });
    expect(plusButton).toBeInTheDocument();

    userEvent.click(plusButton);

    await waitFor(() => {
      expect(mockOnPlus).toHaveBeenCalled();
    });
  });

  it('calls onSettings when the Settings button is clicked', async () => {
    render(<ActionButtons onPlus={mockOnPlus} onSettings={mockOnSettings} color={color} />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();

    userEvent.click(settingsButton);

    await waitFor(() => {
      expect(mockOnSettings).toHaveBeenCalled();
    });
  });
});
