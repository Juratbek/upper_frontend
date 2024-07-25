import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Item, Popover } from './Popover';

describe('Popover', () => {
  it('renders correctly with children and style', () => {
    const style = { backgroundColor: 'red' };
    render(
      <Popover open={true} style={style}>
        <span>Popover Content</span>
      </Popover>,
    );

    const popover = screen.getByText('Popover Content').closest('div');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveClass('popover');
    expect(popover).toHaveClass('open');
  });

  it('does not have open class when open prop is false', () => {
    render(
      <Popover open={false}>
        <span>Popover Content</span>
      </Popover>,
    );

    const popover = screen.getByText('Popover Content').closest('div');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveClass('popover');
    expect(popover).not.toHaveClass('open');
  });
});

describe('Item', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders correctly with icon, children, and suffix', () => {
    render(
      <Item
        icon='<svg></svg>'
        active={true}
        shouldBeConfirmed='danger'
        suffix={<span>Suffix</span>}
        onClick={mockOnClick}
      >
        Item Content
      </Item>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'active');
    expect(button).toContainHTML('<span class="icon"><svg></svg></span>');
    expect(button).toContainHTML('<div class="text">Item Content</div>');
    expect(button).toContainHTML('<span class="suffix"><span>Suffix</span></span>');
  });

  it('calls onClick when clicked', async () => {
    render(
      <Item icon='<svg></svg>' shouldBeConfirmed={false} onClick={mockOnClick}>
        Item Content
      </Item>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('requires confirmation if shouldBeConfirmed is true', async () => {
    render(
      <Item icon='<svg></svg>' shouldBeConfirmed='danger' onClick={mockOnClick}>
        Item Content
      </Item>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();

    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('does not require confirmation if shouldBeConfirmed is false', async () => {
    render(
      <Item icon='<svg></svg>' shouldBeConfirmed={false} onClick={mockOnClick}>
        Item Content
      </Item>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });
});
