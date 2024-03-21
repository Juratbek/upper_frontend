import { fireEvent, render, screen } from '@testing-library/react';

import { Tooltip } from './Tooltip';

describe('components/lib/Tooltip', () => {
  it('renders tooltip on hover', () => {
    const tooltipText = 'Tooltip content';
    render(<Tooltip tooltip={tooltipText}>Content</Tooltip>);
    const text = screen.getByText('Content');
    const tooltip = screen.queryByText(tooltipText);
    expect(tooltip).toEqual(null);
    fireEvent.mouseOver(text);
    const visibleTooltip = screen.queryByText(tooltipText);
    expect(visibleTooltip).toBeVisible();
  });
});
