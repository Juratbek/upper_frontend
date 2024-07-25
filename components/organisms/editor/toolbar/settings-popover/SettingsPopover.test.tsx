import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { useEditorContext } from '../../context';
import { SettingsPopover } from './SettingsPopover';
import { useSettings } from './SettingsPopover.hooks';

// Mocking the necessary hooks
vi.mock('../../context', () => ({
  useEditorContext: vi.fn(),
}));

vi.mock('./SettingsPopover.hooks', () => ({
  useSettings: vi.fn(),
}));

const mockContext = {
  tools: {
    paragraph: {
      settings: [
        {
          text: 'Bold',
          icon: '<svg></svg>',
          onClick: vi.fn(),
        },
      ],
    },
  },
  hoveredBlock: {
    type: 'paragraph',
  },
};

const mockButtons = [
  {
    text: 'Italic',
    icon: '<svg></svg>',
    onClick: vi.fn(),
  },
];

describe('SettingsPopover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useEditorContext as vi.Mock).mockReturnValue(mockContext);
    (useSettings as vi.Mock).mockReturnValue(mockButtons);
  });

  it('renders correctly when open', () => {
    render(<SettingsPopover open={true} close={vi.fn()} />);

    const popover = screen.getByRole('dialog');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveClass('popover', 'open');
  });

  it('renders the tool settings and additional buttons', () => {
    render(<SettingsPopover open={true} close={vi.fn()} />);

    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
  });

  it('calls item onClick and close when item is clicked', async () => {
    const mockClose = vi.fn();
    render(<SettingsPopover open={true} close={mockClose} />);

    const boldButton = screen.getByText('Bold');
    userEvent.click(boldButton);

    await waitFor(() => {
      expect(mockContext.tools.paragraph.settings[0].onClick).toHaveBeenCalledWith(mockContext);
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('renders correctly when not open', () => {
    render(<SettingsPopover open={false} close={vi.fn()} />);

    const popover = screen.queryByRole('dialog');
    expect(popover).not.toHaveStyle({ display: 'none' });
  });
});
